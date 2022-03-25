import React, { Component } from "react";

class GenerateRoomBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            generatedCode: "000000"
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        fetch("http://localhost:3001/api/createRoom")
            .then(response => response.json())
            .then(data => {this.setState({generatedCode: data})})
    }

    render() {
        return (
            <>
            <button onClick={this.handleClick}>Generate Room</button>
            <h1>{this.state.generatedCode}</h1>
            </>
        );
    }
}

export default GenerateRoomBtn;