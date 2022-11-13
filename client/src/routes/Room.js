import React, { Component, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import SettingsForm from "../components/SettingsForm";

function Room (props) {
    
    const [message, setmessage] = useState(" ");
    const [playerNo, setPlayerNo] = useState(" ");
    const [settings, setSettings] = useState([]);
    const location = useLocation(); //location.state.code
    const socket = useRef();

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
            if(msg == 4){
                changeMessage(4)
            }
            if(msg == 3){
                changeMessage(3)
            }
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
        postSettings(settings)
        console.log(settings)
    }

    function postSettings(form){

        let data = JSON.stringify(form)
        let response = fetch("http://localhost:3001/api/postForm/" + location.state.code, {
            method: 'post',
            body: data,
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(res => res.data)
        console.log(response)
    }

    if(message == 4){
        return(
            <>
            <p>Error: Too Many players</p>
            </>
        )
    }
    else if(message == 3){
        return(
            <>
            <p>Error: Game in progress</p>
            </>
        )
    }
    else{
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
}

export default Room;