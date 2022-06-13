
export default function VotingBar(props) {

    const vote = () => {
        props.vote(props.index)
    }
    // let className = 'voting-bar-title ' + props.optionClassName
    return (<div className='voting-bar'>
        <h3>{props.option.option}</h3>
        <button className={props.optionClassName} key={props.optionClassName} onClick={vote}>Vote {props.option.option}</button>
    </div>)
}