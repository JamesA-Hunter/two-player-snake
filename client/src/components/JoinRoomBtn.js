import React from "react";
import { useNavigate } from "react-router-dom";

function GenerateRoomBtn(props) {
    let navigate = useNavigate();

    const joinRoom = () => { //asks server if room exists

        if(props.inputCode == ""){
            props.doesExist({roomExists: false})
        }
        else{
        fetch("http://localhost:3001/api/getRoom/" + props.inputCode)
        .then(response => response.json())
        .then(data => {
            props.doesExist({roomExists: data})
            redirect({roomExists: data})
        })
        }
    }

    const redirect = (exists) => {

        console.log(exists.roomExists)
        if(exists.roomExists == true){
            navigate("Room", {state:{code: props.inputCode}})
            props.changeInput("")
            props.doesExist(false)
        }
    }

    /*
    createSocket(exists) {
        if(exists == true) {
            const socket = io("http://localhost:3001", {
                reconnectionDelayMax: 10000
            });

            socket.connect();
        }
    }
    */

    return (
        <>
        <label>join room</label>
        <input onChange={evt => props.changeInput(evt.target.value)} type="text"></input>
        <button onClick={joinRoom}>Go</button>
        </>
    );
}

export default GenerateRoomBtn;