// import React, { Component } from 'react'
import Option from './Option'
import Poll from '../classes/Poll'
import Vote from '../classes/Vote'
import axios from 'axios'
import { useState } from 'react'
import HeaderBtn from './HeaderBtn'

export default function CreatePollPage(props) {

    const [option1, setOption1] = useState('')
    const [option2, setOption2] = useState('')
    const [option3, setOption3] = useState('')
    const [option4, setOption4] = useState('')
    const [question, setQuestion] = useState('')


    const handleQuestionChange = (e) => {
        setQuestion(e.target.value)
    }

    const submit = async () => {
        if (question.length < 10) {
            console.log('Question must be at least of 10 characters!')
            return
        }
        if (option1.length == 0 || option2.length == 0) {
            console.log('The first two options are mandatory!')
            return
        }

        let options = [option1, option2, option3, option4]
        options = options.filter((o) => { return o.length != 0 }).map((o) => { return new Vote(o, 0) })

        let poll = new Poll(question, options, Date.now(), 0)
        console.log(poll)

        let result = await axios.post('http://localhost:3001/Poll', poll)
        console.log(result)

        let message
        result.data.errorMessage ? message = result.data.errorMessage : message = 'The poll was successfully saved into database'
        alert(message)
    }

    const setOption = (data) => {

        switch (data.num) {
            case '1': setOption1(data.value)
                break;
            case '2': setOption2(data.value)
                break;
            case '3': setOption3(data.value)
                break;
            case '4': setOption4(data.value)
                break;
            default: break;
        }

    }
    // console.log(props.location);
    // https://surajsharma.net/blog/current-url-in-react
    return (<div>
        
        <HeaderBtn></HeaderBtn>

        <div className='content'>
            <div className='creationForm'>
                <div className='left'>
                    <div><label>your question: <text style={{ 'color': 'red' }}>*</text></label></div>
                    <div><textarea value={question} onChange={handleQuestionChange}></textarea></div>
                    <button id='submit' onClick={submit}>Submit Poll</button>
                </div>
                <div className='right'>
                    <Option num='1' setOption={setOption}></Option>
                    <Option num='2' setOption={setOption}></Option>
                    <Option num='3' setOption={setOption}></Option>
                    <Option num='4' setOption={setOption}></Option>
                </div>
            </div>
            <div className='note'>* indicates a required field</div>

        </div>
    </div>)
}