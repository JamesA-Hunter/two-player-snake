import React, { Component } from "react";
import { useLocation } from "react-router-dom";

function Room (props) {
    const location = useLocation();
    return(
        <>
        <h1>Room</h1>
        <h1>{location.state.code}</h1>
        </>
    )
}

export default Room;