/**
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader.
 * @license MIT
 */

export const isArray = (x) => {
    return Object.prototype.toString.call(x) == "[object Array]"
}

export const isObject = (x) => {
    return Object.prototype.toString.call(x) == "[object Object]"
}

export const getClassName = (x) =>{
    const s = Object.prototype.toString.call(x)
    return s.match(/ (\w+)\]/)[1]
}

export class ErrorExtended extends Error {
    constructor(message, name = "Error") {
        super(message)
        this.name = name
    }
}
