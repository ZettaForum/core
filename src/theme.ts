/**
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader.
 * @license MIT
 */

import { Init } from "./core"  // eslint-disable-line

export type Theme = (init: Init) => any

interface AllThemes {
    readonly [name: string]: Theme
}

let allThemes: AllThemes = {}

export const defineThemeName = (name: string, theme: Theme) => {
    allThemes = Object.assign(allThemes, {
        [name]: theme
    })

    return name
}

export const getThemeFromName = (name: string) => {
    return allThemes[name]
}

export const getAllThemes = () => {
    return Object.assign({}, allThemes)
}

export const getAllThemeNames = () =>{
    return Object.keys(allThemes)
}
