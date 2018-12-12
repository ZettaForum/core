/**
 * ZettaForum 泽虵论坛
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader.
 * @license MIT
 */

import ZettaForum from "./src/core"

// 导入默认主题
import "./defaults/theme/wecenter"

// 导入默认语言包
import "./defaults/language/zh_CN"
import "./defaults/language/en_US"

const _UNIT_TEST = () => {  // eslint-disable-line
    new ZettaForum({
        el: "#app",
        name: "test",
        // language: "en_US",
        logo: "lib/img/logo.png",
        routerMode: "hash",
        topNav: [
            {
                name: "发现",
                href: "/",
                icon: "list"
            },
            {
                name: "话题",
                href: "/topic/",
                icon: "topic"
            },
            {
                name: "公告",
                href: "/help/",
                icon: "bulb"
            },
        ],
        footer: {
            // author: "",
            year: 2018
        },
        logoLink: "/"
    })
}

_UNIT_TEST()
