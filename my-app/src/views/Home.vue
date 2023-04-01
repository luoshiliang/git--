<template>
    <el-row>
      <el-col :span="8" style="padding-right: 10px">
        <el-card class="box-card">
            <div class="user">
                <img src="../assets/user.png" alt="">
                <div class="user-info">
                    <p class="name">Admin</p>
                    <p class="access">超级管理员</p>
                </div>
            </div>
            <div class="login-info">
                <P>上次登录时间: <span>2023-7-9</span></P>
                <P>上次登录地点: <span>湖南</span></P>
            </div>
        </el-card>
        <el-card style="margin-top: 20px; height: 460px;">
            <el-table
               :data="tableData"
               style="width: 100%">
                <!-- <el-table-column
                    prop="name"
                    label="课程">
                </el-table-column>
                <el-table-column
                   prop="todayBuy"
                   label="今日购买">
                </el-table-column>
                <el-table-column
                   prop="monthBuy"
                   label="本月购买">
                </el-table-column>
                <el-table-column
                   prop="totalBuy"
                   label="总购买">
                </el-table-column> -->
                <el-table-column v-for="(val,key) in tableLabel" :prop="key" :label="val" :key="key"></el-table-column>
            </el-table>
        </el-card>
        </el-col>
    <el-col :span="16" style="padding-left: 10px">
    <div class="num">
        <el-card class="card" :body-style="{ display:'flex',padding: 0 }" v-for="item in countData" :key="item.name">
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{backgroundColor: item.color}"></i>
            <div class="detail">
                <p class="price">￥{{ item.value }}</p>
                <p class="desc">{{ item.name }}</p>
            </div>
        </el-card>
    </div>
    <el-card style="height: 280px;">
        <!-- 折线图 -->
        <div ref="echartsA" style="height: 280px"></div>
    </el-card>
    <div class="graph">
        <el-card style="height: 260px;" class="elA">
            <div ref="echartsB" style="height: 260px;"></div>
        </el-card>
        <el-card style="height: 260px;" class="elA">
            <div ref="echartsC" style="height: 240px;"></div>
        </el-card>
    </div>
    </el-col>
    </el-row>
</template>

<script>
import { getData } from '@/api';
import * as echarts from 'echarts'
export default {
    name:'Home',
    data(){
        return {
            tableData:[],
            tableLabel:{
                name:"课程",
                todayBuy:"今日购买",
                monthBuy:"本月购买",
                todalBuy:"总购买"

            },
            countData:[
                {
                    name:'今日支付订单1',
                    value:1234,
                    icon:'success',
                    color:'#ffb980'
                },
                {
                    name:'今日支付订单2',
                    value:1234,
                    icon:'success',
                    color:'#ffb980'
                },
                {
                    name:'今日支付订单3',
                    value:1234,
                    icon:'success',
                    color:'#ffb980'
                },
                {
                    name:'今日支付订单4',
                    value:1234,
                    icon:'success',
                    color:'#ffb980'
                },
                {
                    name:'今日支付订单5',
                    value:1234,
                    icon:'success',
                    color:'#ffb980'
                },
                {
                    name:'今日支付订单6',
                    value:1234,
                    icon:'success',
                    color:'#ffb980'
                },
            ]
        }
    },
    mounted(){
        getData().then(({ data })=>{
            const { tableData } = data.data
            this.tableData = tableData

        const echarts1 = echarts.init(this.$refs.echartsA)
        var echarts1option = {}
        //处理数据xAxis
        const { orderData,userData,videoData } = data.data
        const xAxis = Object.keys(orderData.data[0])
        const xAxisData = {
            data: xAxis
        }
        echarts1option.xAxis = xAxisData
        echarts1option.legend = xAxisData
        echarts1option.yAxis = {}
        echarts1option.series = []
        xAxis.forEach((key)=>{
            echarts1option.series.push({
                name:key,
                data:orderData.data.map(item => item[key]),
                type:'line'
            })
        })
        echarts1.setOption(echarts1option)

        // 柱状图
        const echarts2 = echarts.init(this.$refs.echartsB)
        var echarts2option = {
            legend: {
                textStyle: {
                    color: '#333'
                }
            },
            grid: {
                left: '20%'
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                type: 'category',
                data: userData.map(item => item.date),
                axisLine: {
                    lineStyle: {
                        color: '#17b3a3'
                    }
                },
            },
            axisLabel: {
                    interval :0,
                    color: '#333'
                },
                yAxis: [
                    {
                        type:'value',
                        axisLine:{
                            lineStyle:{
                                color:'#17b3a3'
                            }
                        }
                    }
                ],
                color:['#2ec7c9','#b6a2de'],
                series:[
                    {
                        name:'新增用户',
                        data: userData.map(item => item.new),
                        type:'bar'
                    },
                    {
                        name:'活跃用户',
                        data: userData.map(item => item.active),
                        type:'bar'
                    }
                ],
        }
        echarts2.setOption(echarts2option)

        //饼状图
        const echarts3 = echarts.init(this.$refs.echartsC)
        const echarts3option = {
            tooltip:{
                trigger:'item'
            },
            color:[
                '#0f78f4',
                '#dd536b',
                '#9462e5',
                '#a6a6a6',
                '#e1bb22',
                '#39c362',
                '#3ed1cf'
            ],
            series: [
                {
                    data: videoData,
                    type:'pie'
                }
            ]
        }        
        echarts3.setOption(echarts3option)
        console.log(videoData)
    })

    }
}
</script>
<style scoped>
.graph{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}
.elA{
    width: 48%;
}
.icon{
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
}
.user{
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid;
    display: flex;
    align-items: center;
}
.user img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
}
.name{
    font-size: 32px;
    margin-bottom: 10px;
}
.access{
    color: #999999;
}
p{
    line-height: 28px;
    font-size: 14px;
    color:#999999;
}
span{
    color: #666666;
    margin-left: 60px;
}
.detail{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
}
.price{
    font-size: 30px;
    margin-bottom: 10px;
    line-height: 30px;
    height: 30px;
}
.desc{
    font-size: 14px;
    color: #999999;
    text-align: center;
}
.num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.card{
    width: 32%;
    margin-bottom: 20px;
}
</style>