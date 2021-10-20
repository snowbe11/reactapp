import * as types from '../action/actionTypes'

const initializeState = {
    color: [255, 255, 255]
}

export default function setcolor(state = initializeState, action) {

    switch (action.type) {
        case types.SET_COLOR:
            return { color: [Math.random() % 255, Math.random() % 255, Math.random() % 255] }

        default:
            return state;
    }
}