import React from 'react'
import Key from './Key'


function KeyRow({ keyRow, setClickedButton, calculate}) {

    return (
        <div className="calculator-row">
            {Object.entries(keyRow).map(([key, value]) => {
                return <Key key={key} btnKey = {key} value={value} setClickedButton={setClickedButton} calculate={calculate}/>
            })}
        </div>
    )
}

export default KeyRow
