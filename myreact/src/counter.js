import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Value from './value'
import Control from './control'

import { connect, bindActionCreators } from 'react-redux'
import * as actions from './action'

                //<Value number={this.props.store.getState().counter.number}/>

class Counter extends Component {
    render() {
        return (
            <div>
                <Value number={this.props.number}/>
                <Control onPlus={this.props.doIncrement} onSubtract={this.props.doDecrement}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        number: state.counter.number,
        setColor: state.setcolor.color
    }
}

const mapDispatchToProps = (dispatch) => {
    //return bindActionCreators(actions, dispatch);
    return {
        doIncrement: () => { dispatch(actions.increment()) },
        doDecrement: () => { dispatch(actions.decrement()) },
        doSetColor: () => { dispatch(actions.setColor()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);