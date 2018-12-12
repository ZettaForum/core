/**
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader.
 * @license MIT
 */

import { Translator, addTranslations } from "./translate"
import { Theme, getThemeFromName, defineThemeName } from "./theme"  // eslint-disable-line

interface NavItem {
    name: string,
    href: string,
}

interface TopNavItem extends NavItem {
    icon?: string
}

export interface Init {
    name: string,
    el?: string,
    theme?: string | Theme,
    language?: string,
    logo?: string,
    logoLink?: string,
    topNav: TopNavItem[],  // Max Length: 5
    routerMode?: "hash" | "history"
}

export default class ZettaForum {
    constructor(init: Init) {

        // Define the default values
        init = Object.assign({
            el: "#app",
            theme: "wecenter",
            language: "zh_CN",
            logo: "logo.png",
            logoLink: "/",
            routerMode: "hash",
        }, init)

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

