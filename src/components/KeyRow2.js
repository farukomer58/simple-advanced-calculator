import React from 'react'
import Key2 from './Key2'

function KeyRow2({ keyRow}) {

    return (
        <div className="calculator-row">
            {Object.entries(keyRow).map(([key, value]) => {
                return <Key2 key={key} btnKey = {key} value={value}/>
            })}
        </div>
    )
}

export default KeyRow2
