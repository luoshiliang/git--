<template>
    <div class="tabs">
    <el-tag
    class="tag"
    v-for="(item,index) in tags"
    :key="item.path"
    :closable="item.name !== 'home'"
    :effect="$route.name === item.name ? 'dark' : 'plain'"
    @click="changeMenu(item)"
    @close="handleClose(item,index)"
    >
    {{ item.label }}
  </el-tag>
    </div>
</template>

<script>
export default {
    name:'CommonTag',
    computed:{
        tags(){
            return this.$store.state.tab.tabsList
        }
    },
    methods:{
        changeMenu(item){
            this.$router.push({
                path:item.path
            })
        },
        handleClose(item,index){
            const length = this.tags.length - 1
            this.$store.commit('closeTag',item)
            if(item.name !== this.$route.name){
                return
            }
            if(index === length){
                this.$router.push({
                    name: this.tags[index-1].name
                })
            }else {
                this.$router.push({
                    name:this.tags[index].name
                })
            }
        }
    }
}

</script>

<style scoped>
.tabs{
    padding: 20px;
}
.tag{
    margin-right: 15px;
    cursor: pointer;
}

</style>