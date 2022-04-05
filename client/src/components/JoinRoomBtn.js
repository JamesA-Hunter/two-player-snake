import React from "react";
import { io } from "socket.io-client";

function GenerateRoomBtn(props) {


    const joinRoom = () => { //asks server if room exists
        fetch("http://localhost:3001/api/getRoom/" + props.code)
        .then(response => response.json())
        .then(data => {
            props.exists({roomExists: data})
            //this.createSocket(data)
        })

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
        <input onChange={evt => props.handler(evt.target.value)} type="text"></input>
        <button onClick={joinRoom}>Go</button>
        <Alert exists={props.exists}/>
        </>
    );
}

//if room isnt found notify user
function Alert(props) {

    if(props.exists == false){
    return <p>This room does not exist</p>;
    }
    else {
    return <p></p>;
    }
}

export default GenerateRoomBtn;