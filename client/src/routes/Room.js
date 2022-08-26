import React, { Component, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import SettingsForm from "../components/SettingsForm";

function Room (props) {
    
    const [message, setmessage] = useState(" ");
    const [playerNo, setPlayerNo] = useState(" ");
    const [settings, setSettings] = useState([]);
    const location = useLocation(); //location.state.code
    const socket = useRef()

    //connect to room using the code passed from home
    useEffect(() => {    
        socket.current = io("http://localhost:3001", {
            reconnectionDelayMax: 10000
        });
        socket.current.connect()

        //server repsonse
        socket.current.on("msg", (msg) => {
            console.log(msg)
            changePlayerNo(msg)
        })

        //send room code and userid to server
        socket.current.on("connect", () => {
            console.log(socket.current.id)
            socket.current.emit("code", location.state.code)
        })

        //server response when a player disconnects and changes player name
        socket.current.on("playerDisconnect", (msg) => {
            changePlayerNo(msg)
            changeMessage("a player has disconnected you are now player: " + msg)
        })

        //cleanup function
        return () => {
            socket.current.off("msg");
            socket.current.off("connect");
            socket.current.off("playerDisconnect");
            socket.current.disconnect();
         }

    }, [location.state.code])

    function changeMessage(msg) {
        setmessage(msg);
    }

    function changePlayerNo(num) {
        setPlayerNo(num)
    }

    function setSettingsForm(settings){
        setSettings(settings)
        console.log(settings)
    }

    return(
        <>
        <h1>Room</h1>
        <h1>{location.state.code}</h1>
        <h1>{playerNo}</h1>
        <p>{message}</p>
        <SettingsForm setSettingsForm={setSettingsForm} playerNo={playerNo}></SettingsForm>
        </>
    )
}

export default Room;