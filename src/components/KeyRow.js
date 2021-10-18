import React from 'react'
import Key from './Key'

function KeyRow({ keyRow}) {

    return (
        <div className="calculator-row">
            {Object.entries(keyRow).map(([key, value]) => {
                return <Key key={key} btnKey = {key} value={value}/>
            })}
        </div>
    )
}

export default KeyRow
