import React, { useEffect } from 'react'
import { useGlobalContext } from './context/context'
import { keyData, allowedKeys } from "./context/data"
import CalculatorHead from "./components/CalculatorHead";
import KeyRow2 from './components/KeyRow2'

function Calculator() {

    const { context } = useGlobalContext()
    const { displayValue, isLastOperation, negative, canPlaceDot, handleKeyPress } = context

    // Also listen to keyboard click for buttons
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return function cleanupListener() {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [displayValue, isLastOperation, negative, canPlaceDot])

    return (
        <div className="calculator">
            <div className="calculator-body">

                {/* display result */}
                <CalculatorHead displayValue={context.displayValue} />

                {/* display Button keys */}
                {keyData.map((keyRow, index) => {
                    return <KeyRow2 key={index} keyRow={keyRow} />
                })}

            </div>
        </div>
    )
}

export default Calculator
