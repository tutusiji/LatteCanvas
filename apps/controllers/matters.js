
async function getAllMatters(ctx, next) {

    ctx.ok({
        code: 0,
        data: [
            {
                "month": 5,
                "date": 2,
                "msg": [
                    {
                        "id": "1212",
                        "name": "打王者荣耀",
                        "archive": "泰州小程序项目1"
                    },
                    {
                        "id": "12121",
                        "name": "吃鸡吃鸡1",
                        "archive": "泰州小程序项目2"
                    },
                    {
                        "id": "12121",
                        "name": "吃鸡吃鸡2",
                        "archive": "泰州小程序项目3"
                    },
                    {
                        "id": "12121",
                        "name": "吃鸡吃鸡3",
                        "archive": "泰州小程序项目4"
                    }
                ]
            },
            {
                "month": 5,
                "date": 3,
                "msg": [
                    {
                        "id": "1212",
                        "name": "打王者荣耀",
                        "archive": "i绵阳1"
                    },
                    {
                        "id": "12121",
                        "name": "吃鸡吃鸡1",
                        "archive": "i绵阳2"
                    },
                    {
                        "id": "12121",
                        "name": "吃鸡吃鸡2",
                        "archive": "i绵阳3"
                    },
                    {
                        "id": "12121",
                        "name": "吃鸡吃鸡3",
                        "archive": "i绵阳4"
                    }
                ]
            },
            {
                "month": 5,
                "date": 4,
                "msg": [
                    {
                        "id": "1212",
                        "name": "打王者荣耀",
                        "archive": "企业诉求平台1"
                    },
                    {
                        "id": "12121",
                        "name": "吃鸡吃鸡1",
                        "archive": "企业诉求平台12"
                    },
                    {
                        "id": "12121",
                        "name": "吃鸡吃鸡2",
                        "archive": "企业诉求平台13"
                    },
                    {
                        "id": "12121",
                        "name": "吃鸡吃鸡3",
                        "archive": "i绵企业诉求平台1阳24"
                    }
                ]
            },
            {
                "month": 5,
                "date": 6,
                "msg": [
                    {
                        "id": "1212",
                        "name": "打王者荣耀",
                        "archive": "深圳后台1"
                    },
                    {
                        "id": "12121",
                        "name": "吃鸡吃鸡1",
                        "archive": "深圳后台12"
                    },
                    {
                        "id": "12121",
                        "name": "吃鸡吃鸡2",
                        "archive": "深圳后台123"
                    },
                    {
                        "id": "12121",
                        "name": "吃鸡吃鸡3",
                        "archive": "深圳后台1234"
                    }
                ]
            },
            {
                "month": 5,
                "date": 12,
                "msg": [
                    {
                        "id": "1212",
                        "name": "打王者荣耀",
                        "archive": "深圳app1114"
                    },
                    {
                        "id": "12121",
                        "name": "吃鸡吃鸡1",
                        "archive": "深圳app12222"
                    },
                    {
                        "id": "12121",
                        "name": "吃鸡吃鸡2",
                        "archive": "深圳app12333"
                    },
                    {
                        "id": "12121",
                        "name": "吃鸡吃鸡3",
                        "archive": "深圳app124444"
                    }
                ]
            },
            {
                "month": 5,
                "date": 15,
                "msg": [
                    {
                        "id": "1212",
                        "name": "打王者荣耀",
                        "archive": "深圳app124444"
                    },
                    {
                        "id": "12121",
                        "name": "吃鸡吃鸡1",
                        "archive": "深圳app124444"
                    },
                    {
                        "id": "12121",
                        "name": "吃鸡吃鸡2",
                        "archive": "深圳app124444"
                    },
                    {
                        "id": "12121",
                        "name": "吃鸡吃鸡3",
                        "archive": "深圳app124444"
                    }
                ]
            },
            {
                "month": 5,
                "date": 20,
                "msg": [
                    {
                        "id": "1212",
                        "name": "打王者荣耀",
                        "archive": "深圳app124444"
                    },
                    {
                        "id": "12121",
                        "name": "吃鸡吃鸡1",
                        "archive": "深圳app124444"
                    },
                    {
                        "id": "12121",
                        "name": "吃鸡吃鸡2",
                        "archive": "深圳app124444"
                    },
                    {
                        "id": "12121",
                        "name": "吃鸡吃鸡3",
                        "archive": "深圳app124444"
                    }
                ]
            }
        ],
        message: "success"
    })
    next()
}

module.exports = {
    getAllMatters
}