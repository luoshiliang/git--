<template>
  <el-menu 
  default-active="1-4-1" 
  class="el-menu-vertical-demo" 
  @open="handleOpen" 
  @close="handleClose" 
  :collapse="isCollapse"
  background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
  >
   <h3>{{ isCollapse ? '后台' : '通用后台管理系统' }}</h3>
    <el-menu-item :index="item.name" v-for="item in noChildren" :key="item.name" @click="clickMenu(item)">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu :index="item.label" v-for="item in hasChildren" :key="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="subItem.path" @click="clickMenu(subItem)" v-for="subItem in item.children" :key="subItem.path" >{{ subItem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>


  
<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
    .el-menu{
        height: 100vh;
        border-right: 0;
    }
    .el-menu h3{
       color: #fff;
       text-align: center;
       line-height: 48px;
    }
    .el-menu-item{
        color: white;
    }
</style>
  
  <script>
  import Cookie from 'js-cookie'
  export default {
    name:'commonAside',
    data() {
      return {}
    },
    computed:{
        //没有子路由
        noChildren(){
            return this.menuData.filter((item)=>{
                return !item.children
            })
        },
        //有子路由
        hasChildren(){
            return this.menuData.filter((item)=>{
                return item.children
            })
        },
        isCollapse(){
            return this.$store.state.tab.isCollapse
        },
        menuData(){
          if(Cookie.get('menu')){
            return JSON.parse(Cookie.get('menu'))
          }else{
            return this.$store.state.tab.menu
          }
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item){
        //当页面的路由与我们跳转的路由不一致时才允许跳转
        if(this.$route.path != item.path && !(item.path === '/' && this.$route.path === '/home')){
            this.$router.push({
            path:item.path
        })
        }
        this.$store.commit('selectMenu',item)
      }
    },
    // mounted(){
    //     this.$bus.$emit('add',this.isCollapse)
    //     this.$bus.$on('bdd',(a)=>{
    //         this.isCollapse = a
    //         console.log(a)
    //     })
    // },
    // updated(){
    //     this.$bus.$emit('add',this.isCollapse)
    // }

  }
  </script>