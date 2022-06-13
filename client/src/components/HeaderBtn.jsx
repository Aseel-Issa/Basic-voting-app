import { useNavigate } from 'react-router-dom'

export default function HeaderBtn(){

    let navigate = useNavigate()
    const navigateToHomePage = () => {
        navigate('/')
    }

    return (
        <div className='headerBtnDiv'>
            <button className='headerBtn' onClick={navigateToHomePage}>Back to home</button>
        </div>)
}