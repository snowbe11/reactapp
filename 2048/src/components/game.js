import React from 'react'
import { useState } from 'react'
import { getNewTileSet } from '../logic/tile'
import useMoveTile from '../logic/hook/moveTile'
import Grid from './grid'
import './game.css'
import Tile from './tile'
import Notification from './notification'

export default function Game() {
    const [score, setScore] = useState(0);
    const [tileSet, setTileContext] = useState(getNewTileSet);
    const [gameOver, setGameOver] = useState(false);

    useMoveTile(tileSet, setTileContext, setScore, setGameOver);

    const style = {
        marginTop: '40px',
    }

    const onNewStartGame = () => {
        setGameOver(false);
        setTileContext(getNewTileSet());
    }

    return (
        <div style={style}>
            <div className='game-control'>
                <div>
                    <div className='game-score'>
                        My Score
                    </div>
                    <div className='game-score-box'>
                        {score}
                    </div>
                </div>
                <button className='header-start-button' onClick={onNewStartGame}>Start Game</button>
            </div>
            <div className='game-container'>
                <Grid />
                <Tile tileSet={tileSet}/>
                <Notification isGameOver={gameOver}/>
            </div>
        </div>
    )
}
