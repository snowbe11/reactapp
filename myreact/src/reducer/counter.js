import * as types from '../action/actionTypes'

const initializeState = {
    number: 0
}

export default function counter(state = initializeState, action) {

    switch (action.type) {
        case types.INCREMENT:
            return { ...state, number: state.number + 1 }
        case types.DECREMENT:
            return { ...state, number: state.number - 1 }

        default:
            return state;
    }
}