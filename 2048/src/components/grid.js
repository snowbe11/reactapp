import React from 'react'
import times from 'lodash/times'
import { GridSize } from '../constant'
import './grid.css'

export default function Grid() {
    return (
        <div className='grid-container'>
            {times(GridSize, (i) => (
                <div className='grid-row' key={i}>
                    {times(GridSize, (j) => (
                        <div className='grid-slot' key={j}></div>
                    ))}
                </div>
            ))}
        </div>
    )
}
