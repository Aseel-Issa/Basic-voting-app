import PollBar from './PollBar'
import {useNavigate} from 'react-router-dom'

export default function HomePage(props) {

    let navigate = useNavigate()

    const navigateToCreatePollPage = () => {
        navigate('/new')
    }

        return (<div id='homePage'>

            <div className='headerBtnDiv'>
                <button className='headerBtn' onClick={navigateToCreatePollPage}>Create your own poll</button>
            </div>
            <div className='content'>
                <div className='display-content'>
                    <div id='top' className='display-column'>
                        <div className='title'><h2>Top 3 polls</h2>
                        {props.topPolls.map(element => {
                            return <PollBar poll={element} key={element._id}></PollBar>
                        })}
                        </div>
                    </div>
                    <div id='recent' className='display-column'>
                        <div className='title'><h2>Recent polls</h2>
                        {props.recentPolls.map(element => {
                            return <PollBar poll={element} key={element._id}></PollBar>
                        })}</div>
                    </div>
                </div>
            </div>
        </div>)
    
}