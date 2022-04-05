import React, { useState } from "react";
import GenerateRoomBtn from "../components/GenerateRoomBtn";
import JoinRoomBtn from "../components/JoinRoomBtn";

function Home() {
    const [code, setCode] = useState("000000");
    const [inputCode, setInputCode] = useState();
    const [roomExists, setExists] = useState(true);
    
    function changeCode(theCode) {
        setCode(theCode.generatedCode)
    }

    function changeInput(theInput) {
        setInputCode(theInput)
    }

    function doesExist(doesExist){
        setExists(doesExist.roomExists)
    }

    return (
    <>
    <h1>home</h1>
    <GenerateRoomBtn handler={changeCode}/>
    <JoinRoomBtn exists={doesExist} code={inputCode} handler={changeInput}/>
    <h1>{code}</h1>
    <h1>{roomExists.toString()}</h1>
    </>
    );
}

export default Home;