<template>
    <el-form ref="form" label-width="70px" :inline="true" :model="form" :rules="rules" class="login_container">
        <h3 class="login_title">系统登录</h3>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="submit" style="margin-left: 108px; margin-top: 10px;" type="primary">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import {getMenu} from '../api'
export default {
    name:'Login',
    data(){
        return {
            form:{
                username:'',
                password:'',
            },
            rules:{
                username:[
                    { required : true, trigger: 'blur', message:'请输入用户名'}
                ],
                password:[
                    { required: true, trigger: 'blur', message:'请输入密码'}
                ]
            }
        }
    },
    methods:{
        submit(){
            // const token = Mock.Random.guid()
        

            //校验通过
            this.$refs.form.validate((valid) => {
                if(valid){
                    getMenu(this.form).then(({ data }) => {
                        console.log(data)
                        if(data.code === 20000) {
                            this.$message({
                                message: '登录成功',
                                type: 'success'
                            });
                            //获取菜单的数据存入store中
                            //data.data.menu
                            this.$store.commit('setMenu',data.data.menu)
                            this.$store.commit('addMenu',this.$router)

                            Cookie.set('token',data.data.token)
                            this.$router.push({path:'/home'})
                        }else{
                            this.$message.error(`${data.data.message}`)
                        }
                    })
                }
            })
            


        }
    }
}
</script>
<style>
body{
    background-image: url(../assets/3\(1\).jpg);
}
.login_container{
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 35px 35px 15px 15px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
}
.el-input{
    width: 198px;
}
.login_title{
    text-align: center;
    margin-bottom: 40px;
    color:#505458
}
</style>