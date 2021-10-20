import { combineReducers } from "redux";
import counter from './counter'
import setcolor from './color'

const Reducers = combineReducers({
    counter,
    setcolor
})

export default Reducers