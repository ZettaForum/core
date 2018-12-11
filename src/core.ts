/**
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader.
 * @license MIT
 */

import { Translator, addTranslations } from "./translate"
import { Theme, getThemeFromName, defineThemeName } from "./theme"  // eslint-disable-line

export interface Init {
    name: string,
    el?: string,
    theme?: string | Theme,
    language?: string,
    logo?: string,
    favicon?: string,
    nameLink?: string,
    routerMode?: "hash" | "history"
}

export default class ZettaForum {
    constructor(init: Init) {
        init.theme = init.theme || "wecenter"
        init.language = init.language || "zh_CN"
        init.logo = init.logo || "logo.png"

        let theme: Theme = null
        if (typeof init.theme == "string") {
            theme = getThemeFromName(init.theme)
        } else {
            theme = init.theme
        }

        return theme(init)
    }

    static Translator = Translator
    static addTranslations = addTranslations

    static defineThemeName = defineThemeName
}

