/**
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader.
 * @license MIT
 */

import { isObject, getClassName } from "./util"

interface RawTranslations {
    [str: string]: string | RawTranslations
}

interface FormattedTranslations {
    [str: string]: string
}

interface AllTranslations {
    [language: string]: FormattedTranslations
}

const allTranslations: AllTranslations = {}

export class Translator {
    translations: FormattedTranslations = null
    _root: string = null

    constructor(language: string) {
        this.translations = allTranslations[language]
    }

    _translate(str: string) {
        if (this._root) {
            return this.translations[`${this._root}.${str}`]
        } else {
            return this.translations[str]
        }
    }

    setRoot(root: string[]) {
        this._root = root.join(".")
    }

    getRoot() {
        return this._root.split(".")
    }

    set root(root) {
        this.setRoot(root)
    }

    get root() {
        return this.getRoot()
    }

    get translate() {
        return this._translate.bind(this)
    }
}

const formatTranslations = (t: RawTranslations) => {
    let output: FormattedTranslations = {}

    Object.entries(t).forEach(([str, translation]) => {
        if (typeof translation == "string") {
            const r = /^\w+$/
            if (!str.match(r)) {
                throw new Error(`The string "${str}" does not match the pattern of "${r.source}"`)
            }

            output[str] = translation
        } else if (!isObject(translation)) {
            throw TypeError("The translation can not be an instance of " + getClassName(translation) + ".")
        } else {
            Object.entries(
                formatTranslations(translation as RawTranslations)
            ).forEach(([x, tr1]) => {
                output[`${str}.${x}`] = tr1
            })
        }
    })

    return output
}

export const addTranslations = (language: string, t: RawTranslations, root: string[] = []) => {
    const _root = root.join(".")
    const formatted = formatTranslations(t)
    let translations = {}

    Object.entries(formatted).forEach(([key, value]) => {
        translations[`${_root}.${key}`] = value
    })

    allTranslations[language] = Object.assign({},
        allTranslations[language],
        translations
    )

    return allTranslations
}

const _UNIT_TEST = () => {  // eslint-disable-line
    addTranslations("zh_CN", {
        a: "abc123",
        b: {
            d: "xmader",
            e: {
                f: "zetta",
                g: {
                    h: "321"
                }
            },
        },
        ...{
            a: "1"
        }
    }, ["b", "d"])

    console.log(allTranslations)

    const { translate } = new Translator("zh_CN")
    console.log(translate("a"))

    // npx parcel watch translate.ts --public-url ./ --no-source-maps --out-file translate.js -d ./
}
