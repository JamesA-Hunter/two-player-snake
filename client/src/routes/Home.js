import React, { Component } from "react";
import GenerateRoomBtn from "../components/GenerateRoomBtn";
import JoinRoomBtn from "../components/JoinRoomBtn";

class Home extends Component {
    render() {
        return (
        <>
        <h1>home</h1>
        <GenerateRoomBtn/>
        <JoinRoomBtn/>
        </>
        );
    }
}

export default Home;