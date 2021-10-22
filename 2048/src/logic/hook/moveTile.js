import { addKeyObserver, removekeyObserver } from "../input"
import { useEffect } from "react";
import { makeTile, moveTile } from '../tile'


export default function useMoveTile(tileSet, setTileContext) {
    useEffect(() => {
        const moveAndAdd = ({x, y}) => {
            const newTileSet = moveTile({tileSet, x, y});

            const newTile = makeTile(newTileSet);
            newTileSet.push(newTile);
            newTile.isNew = true;

            setTileContext(newTileSet);
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
    })//, [input])
}