import { Pie } from 'react-chartjs-2';

export default function PieChart(props){

    let labels = []
    let votes = []
    // let content = ''
    let definedBackgroundColors = [ "#F7464A",
    "#46BFBD",
    "#FDB45C",
    "#949FB1"]
    let usedColors = []
    let i=0;
    for(const option of props.options){
        // content+= option.option+ ': ' + option.votes+ ' votes '
        labels.push(option.option)
        votes.push(option.votes)
        usedColors.push(definedBackgroundColors[i])
        i++
    }
    const chartData = {
        labels: labels,
        datasets: [
            {data: votes,
                backgroundColor: usedColors}
        ]
    }

    return (
        <Pie data={chartData} options={{ responsive: false, maintainAspectRatio:false}} />
    )
}