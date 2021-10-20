import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Control extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <button onClick={this.props.onPlus}>+</button>                
                <button onClick={this.props.onSubtract}>-</button>
                <button onClick={this.props.onColor}>Color</button>
            </div>
        )
    }
}

Control.propTypes = {
    onPlus: PropTypes.func,
    onSubtract: PropTypes.func,
    onColor: PropTypes.func
}

function warnUnbinded(func) {
    return console.warn(`${func} not defined`);
}

Control.defaultProps = {
    onPlus: warnUnbinded('onPlus'),
    onSubtract: warnUnbinded('onSubtract'),
    onColor: warnUnbinded('onColor')
}
