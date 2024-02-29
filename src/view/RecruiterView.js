import { useState } from "react"
import Application from "../components/Application/Application"
import Header from '../components/TopBar/Topbar'
import { useNavigate } from 'react-router-dom';

function RecruiterView(props){
    const navigate = useNavigate();
    const[applications, setApplications] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    
    
    async function getApplications(){
        try{
           const data = await props.viewModel.listOfApplications()
           if(data.error){
            setErrorMessage(data.error)
            return null;
           }
           setErrorMessage("")
           setApplications(data)
        }catch{
            console.log("Something went wrong")
        }
    }
    
    function changeRoleID(id){
        props.viewModel.setRoleID(id)
        navigate("/");
    }

    function mapApplications(application, index){
        return <Application key={index} {...application} />;
    }
    return <div>
        <Header {...props} changeRoleID={changeRoleID}/>
        <div style={{display: 'flex', justifyContent:'space-evenly', margin:'3px', marginBottom:'6px', borderWidth:'1px', borderStyle: 'solid'}}>
        <span>Last name</span>
        <span>First name</span>
        <span>Status</span>
        </div>
        {applications.map(mapApplications)}
            <button onClick={getApplications}>Load all applications</button>
        <div style={{ color: 'red' }}>{errorMessage}</div>
        </div>
}
export default RecruiterView;
//<Application application={application}></Application>