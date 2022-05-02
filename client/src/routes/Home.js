import React from "react";
import GenerateRoomBtn from "../components/GenerateRoomBtn";
import JoinRoomBtn from "../components/JoinRoomBtn";

function Home(props) {


    //breaks at 630px
    return (
    <>
    <div className="flex flex-col items-center justify-center mx-[20%] mt-4 bg-slate-400 rounded-lg shadow-md">
    <div className="w-[100%] px-0 ">
    <h1 className="bg-purple-400 rounded-t-lg text-center">Home</h1>
    </div>
    <JoinRoomBtn {...props}/>
    <h1>{props.roomExists === false ? "Room does not exist" : ""}</h1>
    <GenerateRoomBtn handler={props.changeCode}/>
    <p>{props.code === "000000" ? "" : props.code}</p>
    </div>
    </>
    );
}

export default Home;