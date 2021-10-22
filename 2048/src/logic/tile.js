import { GridSize } from "../constant";
import { assert } from './assert';

//export var Tile = {};

export function getNewTileSet() {
//Tile.getNewTileSet = function() {
    let tileSet = []

    let tile1 = makeTile(tileSet);
    tileSet.push(tile1);

    let tile2 = makeTile(tileSet);
    tileSet.push(tile2);

    return tileSet;
}

export function checkTileCollision(tileSet, tile) {
//Tile.checkTileCollision = function(tileSet, tile) {
    return tileSet.some((item) => item.x === tile.x && item.y === tile.y)
}

export function makeTile(tileSet) {
//Tile.makeTile = function(tileSet) {
    let tile;

    while (!tile || (tileSet && checkTileCollision(tileSet, tile))) {
        tile = {
            x: getInteger(1, GridSize),
            y: getInteger(1, GridSize),
            value: 2,
            isNew: true,
            isMerged: false,
            isDisabled: false,
        }
    }

    return tile;
}

export function getInteger(from, to) {
//Tile.getInteger = function(from, to) {
    return Math.floor(Math.random() * to + from);
}

export function moveTile({ tileSet, x, y }) {
    assert(x === 0 || y === 0, '');
    const isMoveY = y !== 0;
    const isMinus = x + y < 0;
    const sorted = tileSet
      .map(item => ({ ...item, isMerged: false, isNew: false }))
      .filter(item => !item.isDisabled)
      .sort((a, b) => {
        const res = isMoveY ? a.x - b.x : a.y - b.y;
        if (res) {
          return res;
        } else {
          if (isMoveY) {
            return isMinus ? a.y - b.y : b.y - a.y;
          } else {
            return isMinus ? a.x - b.x : b.x - a.x;
          }
        }
      });
    const initialPos = isMinus ? 1 : GridSize;
    let pos = initialPos;
    for (let i = 0; i < sorted.length; i++) {
      if (isMoveY) {
        sorted[i].y = pos;
        pos = isMinus ? pos + 1 : pos - 1;
        if (sorted[i].x !== sorted[i + 1]?.x) {
          pos = initialPos;
        }
      } else {
        sorted[i].x = pos;
        pos = isMinus ? pos + 1 : pos - 1;
        if (sorted[i].y !== sorted[i + 1]?.y) {
          pos = initialPos;
        }
      }
    }
  
    let nextPos = 0;
    const newtileSet = [...sorted];
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i].isDisabled) {
        continue;
      }
  
      if (
        nextPos &&
        (isMoveY
          ? sorted[i].x === sorted[i - 1]?.x
          : sorted[i].y === sorted[i - 1]?.y)
      ) {
        if (isMoveY) {
          sorted[i].y = nextPos;
        } else {
          sorted[i].x = nextPos;
        }
        nextPos += isMinus ? 1 : -1;
      } else {
        nextPos = 0;
      }
  
      if (
        (isMoveY
          ? sorted[i].x === sorted[i + 1]?.x
          : sorted[i].y === sorted[i + 1]?.y) &&
        sorted[i].value === sorted[i + 1]?.value
      ) {
        const tile = makeTile();
        tile.x = sorted[i].x;
        tile.y = sorted[i].y;
        tile.isMerged = true;
        tile.value = sorted[i].value * 2;
        newtileSet.push(tile);
        sorted[i].isDisabled = true;
        sorted[i + 1].isDisabled = true;
        if (isMoveY) {
          nextPos = sorted[i + 1].y;
          sorted[i + 1].y = sorted[i].y;
        } else {
          nextPos = sorted[i + 1].x;
          sorted[i + 1].x = sorted[i].x;
        }
      }
    }
    return newtileSet;
  }