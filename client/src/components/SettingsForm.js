import React, { useState, useEffect} from "react";

function SettingsForm(props){

    const [isPlayerOne, setPlayer] = useState(false);

    function setPlayerNo(props){
        if(props.playerNo > "1"){
            setPlayer(false)
        }
        else if(props.playerNo === "1"){
            setPlayer(true)
        }
    }

    function handleSubmit(e){

        let settings = [e.target.size.value, e.target.speed.value]
        props.setSettingsForm(settings)
        e.preventDefault()
    }

    useEffect(() => {
        setPlayerNo(props)
    });

    return (
        <>
        <p>settings are: {isPlayerOne.toString()}</p>
        <form onSubmit={handleSubmit}>
            <label htmlFor="size" >Pick a board size</label>
            <input type="text" id="size" ></input>

            <label htmlFor="speed" >Select game speed</label>
            <input type="text" id="speed" ></input>

            <button type="submit">Submit</button>
        </form>
        </>
    )
}

export default SettingsForm;