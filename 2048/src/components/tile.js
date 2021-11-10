import React from 'react'
import times from 'lodash/times'
import { GridSize } from '../constant';
import './tile.css'

export default function Tile({tileSet}) {

    return (
        <div className='tile-container'>
            {times(GridSize, (i) => (
                <div className='grid-row' key={i * GridSize}>
                    {times(GridSize, (j) => {
                        let matchItems = tileSet.filter(item => item.x === (i + 1) && item.y === (j + 1))
                        if (matchItems && matchItems.length > 0) {
                            for (const item of matchItems) {
                                if (!item.isDisabled) {
                                    return (<div className={`tile-slot tile-value-${item.value}`} key={j}>
                                        <div className={`tile-content tile-value-${item.value} tile-value-text ${item.isNew && !item.isMerged ? 'tile-new' : ''}`}>
                                            {item.value}
                                        </div>
                                    </div>);
                                }
                            }
                        }
                        else {
                            return (<div className='tile-slot' key={j}></div>);
                        }
                    })}
                </div>
            ))}
        </div>
    )
}
