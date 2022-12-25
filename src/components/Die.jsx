import React from "react"

function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFF"
    }
    return (
    <div className="die-face" style={styles} onClick={props.hold}>
        <h2 className="die-num">{props.value}</h2>
    </div>
    )
}

export default Die