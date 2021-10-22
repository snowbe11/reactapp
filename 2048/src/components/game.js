import React from 'react'
import times from 'lodash/times'
import { useState } from 'react'

import { GridSize } from '../constant'
import { getNewTileSet } from '../logic/tile'

import './game.css'
import useMoveTile from '../logic/hook/moveTile'

function GridSlot() {
    return (<div className='grid-slot'>1</div>)
}

export default function Game(props) {
    const [tileSet, setTileContext] = useState(getNewTileSet);

    //console.log(tileSet);

    useMoveTile(tileSet, setTileContext);

    const staticGridContainer = (
        <div className='grid-container'>
            {times(GridSize, (i) => (
                <div className='grid-row' key={i}>
                    {times(GridSize, (j) => (
                        <GridSlot key={j}></GridSlot>
                    ))}
                </div>
            ))}
        </div>
    )

    const dynamicTileContainer = (
        <div className='tile-container'>
            {times(GridSize, (i) => (
                <div className='grid-row' key={i}>
                    {times(GridSize, (j) => {
                        let matchItems = tileSet.filter(item => item.x === (i + 1) && item.y === (j + 1))
                        if (matchItems && matchItems.length > 0) {
                            for (const item of matchItems) {
                                if (!item.isDisabled) {
                                    return (<div className={`tile-slot tile-value-${item.value}`} key={j}>
                                        1
                                        <div className={`tile-content tile-value-${item.value} tile-value-text`}>
                                            {item.value}
                                        </div>
                                    </div>);
                                }
                            }
                        }
                        else {
                            return (<div className='tile-slot tile-empty' key={j}>1</div>);
                        }
                    })}
                </div>
            ))}
        </div>
    )

    return (
        <div className='game-container'>
            {staticGridContainer}
            {dynamicTileContainer}
        </div>
    )
}
