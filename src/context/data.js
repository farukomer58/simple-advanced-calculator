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

export {
    keyData,
    allowedKeys,
}