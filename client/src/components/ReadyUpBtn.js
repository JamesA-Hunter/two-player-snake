import React, { useState } from "react";

function ReadyUpBtn(props) {

    const [isReady, setReady] = useState(false) //not ready by default

    function changeReady(){
        setReady(!isReady)
        console.log(isReady)
    }

    return(
    <>
        <label className=""></label>
        <div className="space-x-1 rounded bg-blue-300 hover:bg-blue-600">
        {isReady ? (
        <button className="px-2 text-center" onClick={() => changeReady()}>Not ready</button>
        ) : (
        <button className="px-2 text-center" onClick={() => changeReady()}>Ready Up</button>
        )}
        </div>
    </>
    );
}

export default ReadyUpBtn;