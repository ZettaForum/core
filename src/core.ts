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

interface Footer {
    year?: number,  // Founding Year
    author?: string,  // The author(s) or the webmaster(s)
}

export interface Init {
    name: string,
    el?: string,
    theme?: string | Theme,
    language?: string,
    logo?: string,
    logoLink?: string,
    topNav: TopNavItem[],  // Max Length: 5
    footer?: Footer | string /** html */ | Element,
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

        const footer = init.footer
        if (!(typeof footer == "string") && !(footer instanceof Element)) {
            // Define the default values of init.footer
            init.footer = Object.assign({}, {
                year: 2018,
                author: "Xmader",
            }, footer)
        }

        return theme(init)
    }

    static Translator = Translator
    static addTranslations = addTranslations

    static defineThemeName = defineThemeName
}


// 在 top (window) 上定义只读的全局属性
if (top) {
    Object.defineProperty(top, "ZettaForum", {
        value: ZettaForum,
        enumerable: true
    })
}
