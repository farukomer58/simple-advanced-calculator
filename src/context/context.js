import React, { useState, useContext, useEffect } from 'react'
import { keyData, allowedKeys } from "./data"
// make sure to use https
// import useFetch from './useFetch'
// export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [operations, setOperations] = useState([])
    const [isLastOperation, setIsLastOperation] = useState(false)
    const [displayValue, setDisplayValue] = useState("")

    const [negative, setNegative] = useState(false)
    const [canPlaceDot, setCanPlaceDot] = useState(true)

    // Used to calculate from a string
    const Parser = require('expr-eval').Parser;

    // Register the clicked button key
    const setClickedButton = (e, isNumber, isOperation) => {
        e.preventDefault()
        const value = e.target.value
        console.log(displayValue)
        console.log(value)

        if (isNumber) {
            setIsLastOperation(false)

            if (value === '.') {
                if (canPlaceDot) {
                    const lastCharParsed = parseInt(displayValue.substr(displayValue.length - 1))
                    if (isNaN(lastCharParsed)) {
                        setDisplayValue(displayValue + "0" + value)
                        setIsLastOperation(false)
                        setCanPlaceDot(false)
                    } else {
                        setDisplayValue(displayValue + value)
                        setIsLastOperation(false)
                        setCanPlaceDot(false)
                    }

                }
            } else {

                setDisplayValue(displayValue + value)
                console.log("Hey you should add value to displayValue", value, displayValue)
                setIsLastOperation(false)
            }


        } else if (isOperation && displayValue.length > 0) {
            setCanPlaceDot(true)
            if (isLastOperation) {
                // Remove last operator char from displayvalue en replace with new operator
                let newDisplayValue = displayValue.slice(0, -1);
                setDisplayValue(newDisplayValue + value)
                setIsLastOperation(true)
            } else {
                let operationValue = value

                // setOperation(operationValue)
                setDisplayValue(displayValue + operationValue)
                setIsLastOperation(true)

                setOperations(...operations, operationValue)
            }
        } else {
            if (value === "-") {
                let operationValue = value

                // setOperation(operationValue)
                setDisplayValue(displayValue + operationValue)
                setIsLastOperation(true)

                setOperations(...operations, operationValue)
            }
            if (value === "AC") {
                setDisplayValue("")
                setOperations([])
            }
            if (value === "+/-") {

                //if value is already negative
                if (displayValue > 0) {
                    setDisplayValue("-" + displayValue)
                    setNegative(!negative)
                } else {
                    try {
                        setDisplayValue(Math.abs(displayValue).toString())
                        setNegative(!negative)
                    } catch (e) { }

                }

                // setOperations([])
            }
        }
    }

    // Calculate the Result filled in the display component
    const calculate = (e) => {
        e.preventDefault()
        const value = e.target.value

        if (displayValue != "") {
            try {
                const parser = new Parser();
                let expression = parser.parse(displayValue);
                let result = expression.evaluate({ x: 3 });

                setDisplayValue(isNaN(result) ? "Error" : result.toString())
                setOperations([])
                setCanPlaceDot(result.toString().includes(".") ? false : true)
                setNegative((result < 0))
            } catch (e) {

            }
        }
    }

    // Register the key press and add to calculation
    const handleKeyPress = (event) => {
        console.log(event.key)
        if (event.key === '=' || event.key === 'Enter') {
            console.log("Yo I should do calculation")
            calculate(event)
        } else {
            const pressedKey = allowedKeys[event.key]

            event.target.value = event.key
            if (pressedKey) {
                setClickedButton(event, pressedKey.isNumber, pressedKey.isOperation)
            }
        }
    }

    const context = {
        displayValue: displayValue,
        isLastOperation:isLastOperation,
        negative:negative,
        canPlaceDot:canPlaceDot,
        setClickedButton: setClickedButton,
        calculate: calculate,
        handleKeyPress:handleKeyPress,
    }

    return (
        <AppContext.Provider value={{ context }}>
            {children}
        </AppContext.Provider>
    )
}
// make sure use
export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }
