import React from "react";
import GenerateRoomBtn from "../components/GenerateRoomBtn";
import JoinRoomBtn from "../components/JoinRoomBtn";

function Home(props) {


    return (
    <>
    <h1>home</h1>
    <GenerateRoomBtn handler={props.changeCode}/>
    <JoinRoomBtn {...props}/>
    <h1>{props.code}</h1>
    <h1>{props.roomExists === false ? "Room does not exist" : ""}</h1>
    </>
    );
}

export default Home;