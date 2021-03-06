import { addKeyObserver, removekeyObserver } from "../input"
import { useEffect } from "react";
import { makeTile, moveTile } from '../tile'

let moveCount = 0;

export default function useMoveTile(tileSet, setTileContext, setScore, setGameOver) {
    useEffect(() => {
        const moveAndAdd = ({x, y}) => {
            const newTileSet = moveTile({tileSet, x, y});
            if (newTileSet) {
                const myscore = newTileSet.reduce((acc, item) => item.isMerged ? acc + item.value : acc, 0);

                moveCount = moveCount + 1;
    
                setScore(score => {
                    //console.log('current score = ' + myscore + ', Score = ' + (score + myscore));
                    return score + myscore;
                });
    
                const newTile = makeTile(newTileSet);
                if (newTile) {
                    newTile.isNew = true;
                    newTileSet.push(newTile);
        
                    setTileContext(newTileSet);
                }
                else {
                    console.error('login fail, dead end !');
                    setGameOver(true);
                }

                // check continue game ?
                let tryInput = [
                    { x:1, y:0 },
                    { x:-1, y:0 },
                    { x:0, y:1 },
                    { x:0, y:-1 }
                ]

                let solutionExist = false;

                tryInput.map((input) => {
                    if (!solutionExist) {
                        const x = input.x;
                        const y = input.y;
                        const tileSet = newTileSet;
                        const lookupNextTileSet = moveTile({tileSet, x, y});
                        if (lookupNextTileSet) {
                            // 미리 이동시켜보고 게임이 진행되는지를 체크해야 한다.
                        }
                    }
                })

                if (!solutionExist) {
                    setGameOver(true);
                }
            }

            // else, ignore input
        }

        const moveLeft = () => moveAndAdd({x:-1, y:0});
        const moveRight = () => moveAndAdd({x:1, y:0});
        const moveUp = () => moveAndAdd({x:0, y:-1});
        const moveDown = () => moveAndAdd({x:0, y:1});

        addKeyObserver('up', moveLeft);
        addKeyObserver('down', moveRight);
        addKeyObserver('left', moveUp);
        addKeyObserver('right', moveDown);

        return () => {
            removekeyObserver('up', moveLeft);
            removekeyObserver('down', moveRight);
            removekeyObserver('left', moveUp);
            removekeyObserver('right', moveDown);
            }
    })
}