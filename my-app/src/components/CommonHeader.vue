<template>
<div class="header-container">
    <div class="l-content">
        <el-button icon="el-icon-menu" size="mini" @click="handleMenu" style="margin-right: 20px;"></el-button>
        <el-breadcrumb separator="/" class="A">
            <el-breadcrumb-item v-for="item in tags" :key="item.path" @click.native="Bdd(item)">{{item.label}}</el-breadcrumb-item>
        </el-breadcrumb>
        
    </div>
    <div class="r-content">
    <el-dropdown>
      <span class="el-dropdown-link">
       <img src="../assets/user.png"/>
      </span>
    <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
    </el-dropdown-menu>
    </el-dropdown>
    </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
import Cookie from 'js-cookie'
export default {
    name:'CommonHeader',
    methods:{
        handleMenu(){
            this.$store.commit('collapseMenu')
        },
        Bdd(item){
            if(this.$route.path != item.path && !(item.path === '/' && this.$route.path === '/home')){
            this.$router.push({
            path:item.path
        })
        }
    },
    logout(){
        //清除Cookie的token信息
        Cookie.remove('token')
        //清除Cookie中的menu
        Cookie.remove('menu')
        this.$router.push({name:'login'})
    }
},
computed:{
        // ...mapState({
        //     tags: state => state.tab.tabsList
        // })
        tags(){
            return this.$store.state.tab.tabsList
        }
    }
}
</script>

<style scoped>
.l-content{
    display: flex;
    align-items: center;
}
.header-container {
    padding: 0 20px;
    background-color: #f1b7b7;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
</style>