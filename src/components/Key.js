import React from 'react'

function Key({ btnKey, value, setClickedButton, calculate }) {
    if (btnKey === '=') {
        return (
            <button onClick={(e) => calculate(e)} value={btnKey}>{btnKey}</button>
        )
    } else {
        return (
            <button onClick={(e) => setClickedButton(e, value.isNumber, value.isOperation)} value={btnKey}>{btnKey}</button>
        )
    }

}

export default Key
