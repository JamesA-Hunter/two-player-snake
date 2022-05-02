import React, { Component, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

function Room (props) {
    const location = useLocation(); //location.state.code
    const socket = io();

    //connect to room using the code passed from home
    useEffect(() => {
        const socket = io("http://localhost:3001", {
            reconnectionDelayMax: 10000
        });
    
        socket.connect();
        socket.emit("code", location.state.code)
    }, [location.state.code])

    return(
        <>
        <h1>Room</h1>
        <h1>{location.state.code}</h1>
        </>
    )
}

export default Room;