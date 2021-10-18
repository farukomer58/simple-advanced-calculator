import React from 'react'
import { useGlobalContext } from '../context/context'

function Key2({ btnKey, value}) {

    const { context } = useGlobalContext()

    if (btnKey === '=') {
        return (
            <button onClick={(e) => context.calculate(e)} value={btnKey}>{btnKey}</button>
        )
    } else {
        return (
            <button onClick={(e) => context.setClickedButton(e, value.isNumber, value.isOperation)} value={btnKey}>{btnKey}</button>
        )
    }

}

export default Key2
