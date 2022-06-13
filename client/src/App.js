import './App.css';
import { Component } from 'react'
import CreatePollPage from './components/CreatePollPage'
import axios from 'axios'
import HomePage from './components/HomePage';
import io from 'socket.io-client';
import { BrowserRouter as Router, Route, Link as RouterLink, HashRouter, Routes } from 'react-router-dom'
import VotingPage from './components/VotingPage'


class App extends Component {

  constructor() {
    super()
    this.state = {
      recentPolls: [],
      topPolls: [],
      socket: io(':3001')
    }
    this.state.socket.on("create-new-poll", (poll) => {

      console.log('reached create-new-poll')
      let newList = [...this.state.recentPolls]
      newList.unshift(poll)
      this.setState({ recentPolls: newList })
    });

    this.state.socket.on("update-new-poll", (poll) => {

      console.log(poll)
      let newList = [...this.state.recentPolls]
      console.log('reached update-new-poll')
      for (let i = 0; i < this.state.recentPolls.length; i++) {
        if (this.state.recentPolls[i]._id == poll._id) {
          newList[i] = {...poll}
        }
      }
      this.setState({ recentPolls: newList })
      // update the top 3 polls list again in case of getting a poll rising 
      axios.get('http://localhost:3001/Polls/Top').then((res) => {
        this.setState({ topPolls: res.data })
        console.log(res.data)
      })
    });
  }

  // Didn't use async await so both requests can be fired at the same time in order to improve performance
  componentDidMount() {
    this.state.socket.on('stablish-connection', data => {
      console.log(data)
    });

    axios.get('http://localhost:3001/Polls').then((res) => {
      this.setState({ recentPolls: res.data })
    })

    axios.get('http://localhost:3001/Polls/Top').then((res) => {
      this.setState({ topPolls: res.data })
      console.log(res.data)
    })

  }

  componentWillUnmount() {
    this.state.socket.disconnect(true);
  }

  // Ideally the poll should exist in the app, but in case of not existant return an empty object
  searchOnPollById = (_id) => {
    // console.log(this.state)
    let results = this.state.recentPolls.filter((p) => { return p._id == _id })
    let poll = results.length > 0 ? results[0] : {}
    return poll
    // for(let i=0; i<this.state.recentPolls.length; i++){
    //   if(this.state.recentPolls[i]._id == _id){
    //     // return this.state.recentPolls[i]
    //     return i
    //   }
    // }

  }

  // update poll in both lists
  updatePoll = (poll) => {
    let newList = [...this.state.recentPolls]
    // let indexOfRecentPollsList ;
    for (let i = 0; i < newList.length; i++) {
      if (newList[i]._id == poll._id) {
        newList[i] = { ...poll }
        // indexOfRecentPollsList = i
      }
    }
    this.setState({ recentPolls: newList })

    let newList2 = [...this.state.topPolls]
    for (let i = 0; i < newList2.length; i++) {
      if (newList2[i]._id == poll._id) {
        newList2[i] = { ...poll }
      }
    }
    this.setState({ topPolls: newList2 })

    // console.log('indexOfRecentPollsList: ' + indexOfRecentPollsList)
    // return indexOfRecentPollsList
  }

  render() {
    return (<div className='container'>
      <Router>
        <div className='Header'><h1>Voting DOJO</h1></div>
        {/* {this.state.topPolls.length > 0 ? <HomePage recentPolls={this.state.recentPolls} topPolls={this.state.topPolls}></HomePage> : null} */}
        {/* <CreatePollPage></CreatePollPage> */}
        <Routes>
          <Route path="/new" exact element={<CreatePollPage />} />
          <Route path="/" exact element={<HomePage recentPolls={this.state.recentPolls} topPolls={this.state.topPolls}></HomePage>} />
          <Route path="/polls/:_id" exact element={<VotingPage searchOnPollById={this.searchOnPollById} updatePoll={this.updatePoll} pollsList={this.state.recentPolls}/>} />
        </Routes>
      </Router>
    </div>)
  }
}

export default App;
