import React, { Component, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

function Room (props) {
    
    const [message, setmessage] = useState(" ");
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
            changeMessage(msg)
        })

        //send room code and userid to server
        socket.current.on("connect", () => {
            console.log(socket.current.id)
            socket.current.emit("code", location.state.code)
        })

        //cleanup function
        return () => {
            socket.current.off("msg");
            socket.current.off("connect");
            socket.current.disconnect();
         }

    }, [location.state.code])

    function changeMessage(msg) {
        setmessage(msg);
    }

    return(
        <>
        <h1>Room</h1>
        <h1>{location.state.code}</h1>
        <p>{message}</p>
        </>
    )
}

export default Room;