import Mock from "mockjs";

let List = []
export default {
    getStatistcalData:() => {
        for(let i = 0; i < 7; i++){
            List.push(
                Mock.mock({
                    苹果:Mock.Random.float(100,8000,0,0),
                    vivo:Mock.Random.float(100,8000,0,0),
                    oppo:Mock.Random.float(100,8000,0,0),
                    魅族:Mock.Random.float(100,8000,0,0),
                    三星:Mock.Random.float(100,8000,0,0),
                    小米:Mock.Random.float(100,8000,0,0),
                })
            )
        }
        return {
            code: 20000,
            data:{
                videoData:[
                    {
                        name:'oppo',
                        value:1999
                    },
                    {
                        name:'vivo',
                        value:2999
                    },
                    {
                        name:'苹果',
                        value:3999
                    },
                    {
                        name:'小米',
                        value:4999
                    },
                    {
                        name:'魅族',
                        value:5999
                    },
                    {
                        name:'三星',
                        value:6999
                    },
                ],
                userData: [
                    {
                        date: '周一',
                        new: 12,
                        active: 100
                    },
                    {
                        date: '周二',
                        new: 19,
                        active: 200
                    },
                    {
                        date: '周五',
                        new: 29,
                        active: 300
                    },
                    {
                        date: '周六',
                        new: 39,
                        active: 400
                    },
                    {
                        date: '周三',
                        new: 49,
                        active: 500
                    },
                    {
                        date: '周四',
                        new: 59,
                        active: 600
                    },
                ],
                orderData: {
                    date: ['20191001','20191002','20191003','20191004','20191005','20191006','20191007',],
                    data: List
                },
                tableData: [
                    {
                        name:'oppo',
                        todayBuy:500,
                        monthBuy:4500,
                        todalBuy:22000
                    },
                    {
                        name:'三星',
                        todayBuy:600,
                        monthBuy:5500,
                        todalBuy:23000
                    },
                    {
                        name:'魅族',
                        todayBuy:700,
                        monthBuy:6500,
                        todalBuy:24000
                    },
                    {
                        name:'小米',
                        todayBuy:800,
                        monthBuy:7500,
                        todalBuy:25000
                    },
                    {
                        name:'vivo',
                        todayBuy:900,
                        monthBuy:8500,
                        todalBuy:26000
                    },
                    {
                        name:'华为',
                        todayBuy:1000,
                        monthBuy:9500,
                        todalBuy:27000
                    },
                ]
            }
        }
    }
}