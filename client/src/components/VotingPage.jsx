import { useParams } from "react-router";
import VotingBar from './VotingBar'
import HeaderBtn from './HeaderBtn'
import { useState } from 'react'
import PieChart from './PieChart'
import axios from 'axios'



export default function VotingPage(props) {

    console.log(props)

    const [didVote, setDidVote] = useState(false)

    const { _id } = useParams();
    console.log(_id)

    let poll
    for(let i=0; i<props.pollsList.length; i++){
        if(props.pollsList[i]._id == _id){
            poll = props.pollsList[i]
        }
    }

    const vote = async (index) => {
        // some code here
        let pollTemp = {...poll}
        pollTemp.options[index].votes +=1
        pollTemp.totalVotes +=1
        try{
            await axios.put('http://localhost:3001/Poll', pollTemp)
            props.updatePoll(poll)
            setDidVote(true)
        }catch(error){
            alert('something went wrong, please try again later.')
        }
       
    }


    let pageContent
    if (!didVote) {
        let i = 1;
        let results = poll.options.map(o => {
            let className = 'option' + i
            i++
            return <VotingBar option={o} optionClassName={className} vote={vote} index={i-2}></VotingBar>
        });
        pageContent = (
            <div className='content'>
                <div className='poll-title'><h2>{poll.question}</h2></div>
                <div className='display-voting-bars'>
                    {results}
                </div>
            </div>)
    } else {
        let results = poll.options.map(o => {
            return <tr>
                <td>{o.option}</td>
                <td>{o.votes} votes</td>
            </tr>
        });
        pageContent = (<div>
            <HeaderBtn></HeaderBtn>
            <div className='content'>
                <div className='poll-title'><h2>{poll.question}</h2></div>
                <div className='display-voting-results'>
                    <div id='results-chart'>
                    <PieChart options={poll.options}></PieChart>
                    </div>
                    <div id='all-votes'>
                        <table>
                            {results}
                        </table>
                        {/* list of options */}
                    </div>

                </div>
            </div>

        </div>)
    }
    // console.log(poll)
    return pageContent
}