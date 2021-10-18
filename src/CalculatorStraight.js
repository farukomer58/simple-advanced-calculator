import { useState, useEffect } from "react"
import './App.css';
import CalculatorHead from "./components/CalculatorHead";
import KeyRow from './components/KeyRow'

function CalculatorStraight() {

  const keyData = [
    {
      "AC": { isNumber: false, isOperation: false },
      "+/-": { isNumber: false, isOperation: false },
      "%": { isNumber: false, isOperation: true },
      "/": { isNumber: false, isOperation: true },
    },
    {
      "7": { isNumber: true, isOperation: true },
      "8": { isNumber: true, isOperation: true },
      "9": { isNumber: true, isOperation: true },
      "*": { isNumber: false, isOperation: true },
    },
    {
      "4": { isNumber: true, isOperation: true },
      "5": { isNumber: true, isOperation: true },
      "6": { isNumber: true, isOperation: true },
      "-": { isNumber: false, isOperation: true },
    },
    {
      "1": { isNumber: true, isOperation: true },
      "2": { isNumber: true, isOperation: true },
      "3": { isNumber: true, isOperation: true },
      "+": { isNumber: false, isOperation: true },
    },
    {
      "0": { isNumber: true, isOperation: true },
      ".": { isNumber: true, isOperation: true },
      "=": { isNumber: false, isOperation: true },
    },
  ]

  const allowedKeys = {
    "0": { isNumber: true, isOperation: true },
    "1": { isNumber: true, isOperation: true },
    "2": { isNumber: true, isOperation: true },
    "3": { isNumber: true, isOperation: true },
    "4": { isNumber: true, isOperation: true },
    "5": { isNumber: true, isOperation: true },
    "6": { isNumber: true, isOperation: true },
    "7": { isNumber: true, isOperation: true },
    "8": { isNumber: true, isOperation: true },
    "9": { isNumber: true, isOperation: true },
    ".": { isNumber: true, isOperation: true },
    "/": { isNumber: false, isOperation: true },
    "+": { isNumber: false, isOperation: true },
    "-": { isNumber: false, isOperation: true },
    "*": { isNumber: false, isOperation: true },
    "%": { isNumber: false, isOperation: true },
    "=": { isNumber: false, isOperation: true },
  }

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
        <CalculatorHead displayValue={displayValue} />

        {/* display Button keys */}
        {keyData.map((keyRow, index) => {
          return <KeyRow key={index} keyRow={keyRow} setClickedButton={setClickedButton} calculate={calculate} />
        })}

      </div>
    </div>
  );
}

export default CalculatorStraight;
