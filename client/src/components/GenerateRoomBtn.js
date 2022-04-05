import React from "react";

function GenerateRoomBtn(props) {

    const generateRoom = () => {
        fetch("http://localhost:3001/api/createRoom")
        .then(response => response.json())
        .then(data => {props.handler({generatedCode: data})})
    }

    return (
        <>
        <button onClick={generateRoom}>Generate Room</button>
        </>
    );

}

export default GenerateRoomBtn;