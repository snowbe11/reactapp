import React, { useState } from 'react'

export default function Notification({isGameOver}) {
    const style = {
        backgroundColor: 'cadetblue',
        width: '100%',
        fontColor: 'white',
        fontWeight: 'bolder',
        fontSize: '3em',
        color: 'white',
        padding: '10px',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)'
    }

    if (isGameOver) {
        return (<div style={style}>Game Over !</div>)
    }
    else {
        return <React.Fragment></React.Fragment>
    }
}
