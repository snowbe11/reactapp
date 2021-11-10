import React from 'react'

export default function Menu() {
    const style = {
        backgroundColor: 'cadetblue',
        width: '100%',
        textAlign: 'left',
        verticalAlign: 'middle',
        color: 'white',
        padding: '10px'
    }
    return (
        <div className='Topmenu' style={style}>
            <React.Fragment>
            &#128540; 2048 is not Toothpaste
            </React.Fragment>
        </div>
    )
}
