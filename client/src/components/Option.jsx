import React, { useState } from 'react'


export default function Option(props) {

    // console.log(props)
    let [value, setValue] = useState('')

    const handleChange = (e) => { setValue(e.target.value) 
        props.setOption({num: props.num, value: e.target.value})
    }

    let required = props.num > 2 ? <div><label>Option {props.num}:</label></div> : <div><label>Option {props.num}: <text style={{ 'color': 'red' }}>*</text></label></div>

    return (<div className='options'> {required}
        <input value={value} onChange={handleChange}></input>
    </div>)
}