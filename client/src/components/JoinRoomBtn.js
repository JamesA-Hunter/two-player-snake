import React from "react";

function GenerateRoomBtn(props) {

    const joinRoom = () => { //asks server if room exists
        fetch("http://localhost:3001/api/getRoom/" + props.inputCode)
        .then(response => response.json())
        .then(data => {
            props.doesExist({roomExists: data})
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
        <input onChange={evt => props.changeInput(evt.target.value)} type="text"></input>
        <button onClick={joinRoom}>Go</button>
        </>
    );
}

export default GenerateRoomBtn;