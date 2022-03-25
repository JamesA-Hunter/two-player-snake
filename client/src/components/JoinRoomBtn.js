import React, { Component} from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

class GenerateRoomBtn extends Component {
    constructor(props){
        super(props);
        this.state = {
            roomExists: null,
            code: ""
        }

        this.joinRoom = this.joinRoom.bind(this);
        this.updateRoomID = this.updateRoomID.bind(this);
    }

    joinRoom() { //asks server if room exists
        fetch("http://localhost:3001/api/getRoom/" + this.state.code)
        .then(response => response.json())
        .then(data => {
            this.setState({roomExists: data})
            this.createSocket(data)
        })

    }

    createSocket(exists) {
        if(exists == true) {
            const socket = io("http://localhost:3001", {
                reconnectionDelayMax: 10000
            });

            socket.connect();
        }
    }

    updateRoomID(code) { //take value from input
        this.setState({code: code})
    }


    render() {

        return (
        <>
        <label>join room</label>
        <input onChange={evt => this.updateRoomID(evt.target.value)} type="text"></input>
        <button onClick={this.joinRoom}>Go</button>
        <Alert exists={this.state.roomExists} code={this.state.code} />
        </>
        );
    }
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