import React, { useEffect, useState } from 'react'
import { useGlobalContext } from './context/context'
import { keyData, allowedKeys } from "./context/data"
import CalculatorHead from "./components/CalculatorHead";
import KeyRow from './components/KeyRow'

import { FaHistory } from 'react-icons/fa'

function Calculator() {

    const { context } = useGlobalContext()
    const { displayValue, isLastOperation, negative, canPlaceDot, handleKeyPress, history } = context

    const [showHistory, setShowHistory] = useState(false)

    // Also listen to keyboard click for buttons
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return function cleanupListener() {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [displayValue, isLastOperation, negative, canPlaceDot])


    useEffect(() => {
        console.log(history)
        console.log(history.length)
    }, [history])
    return (
        <div className="calculator">
            <div className="calculatorContainer">
                <div className="history row ">
                    <div className="col-12" style={{width:"100%"}}>
                        <button className="btn histoyBtn" onClick={()=>setShowHistory(!showHistory)}><FaHistory /></button>
                    </div>
                    
                    {showHistory && <div className="historyBox">
                        {history.length>0?history.map((item)=>{
                            return (
                                <div className="historyItem row mb-1">
                                    <b className="col-12">{!item.isInt?item.result.toFixed(3):item.result}</b>
                                    <p className="col-12">{item.calculation}</p>
                                </div>
                            )
                        }):<p>No History</p>}
                    </div>}
                    
                </div>

                <div className="calculator-body">

                    {/* display result */}
                    <CalculatorHead displayValue={context.displayValue} />

                    {/* display Button keys */}
                    {keyData.map((keyRow, index) => {
                        return <KeyRow key={index} keyRow={keyRow} />
                    })}

                </div>
            </div>

        </div>
    )
}

export default Calculator
