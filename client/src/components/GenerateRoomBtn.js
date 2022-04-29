import React from "react";

function GenerateRoomBtn(props) {

    const generateRoom = () => {
        fetch("http://localhost:3001/api/createRoom")
        .then(response => response.json())
        .then(data => {props.handler({generatedCode: data})})
    }

    return (
        <>
        <button onClick={generateRoom} className="rounded-full bg-blue-300 hover:bg-blue-600 px-2 my-2">Generate Room</button>
        </>
    );

}

export default GenerateRoomBtn;