import 'chart.js/auto';
import { NavLink } from 'react-router-dom'
import PieChart from './PieChart'

export default function PollBar(props){

    const path = '/polls/'+props.poll._id

    let time
    let type
    let creationDate = new Date(props.poll.creationDate)
    let currentDate = new Date()
    let diffInDays = (currentDate-creationDate)/ (1000 * 3600 * 24);
    
    if(Math.floor(diffInDays/360) > 0){
        time = Math.floor(diffInDays/360)
        type = 'Years'
    }else if(Math.floor(diffInDays/30) > 0){
        time = Math.floor(diffInDays/30)
        type = 'Months'
    }else{
        time = Math.floor(diffInDays)
        type = 'Days'
    }

    let content = ''
    for(const option of props.poll.options){
        content+= option.option+ ': ' + option.votes+ ' votes '
    }
    return(
        <div className = 'poll-bar'>
            <div className= 'chart'>
            {/* <Pie data={chartData} options={{ responsive: false, maintainAspectRatio:false}} /> */}
            <PieChart options={props.poll.options}></PieChart>
            </div>
            <div className= 'poll-data'>
            <div><NavLink to={path} activeClassName="is-active" >{props.poll.question}</NavLink></div>
            <div className='poll-votes'>{content}</div>
            <div className='timestamp'>({time} {type} ago)</div>
            </div>
        </div>
    )
}