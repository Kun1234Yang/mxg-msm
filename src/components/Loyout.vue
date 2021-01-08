<template>

    <div>
        <!-- 头部区域 -->
        <app-header/>
        <!-- 左侧导航 -->
        <app-navber/>
        <!-- 右侧主区域 -->
        <app-main/>
    </div>
    
</template>

<script>
import AppHeader from './AppHeader'
import AppNavber from './AppNavber'
import AppMain from './AppMain'
import App from '../App.vue'

export default {
    components: {
        AppHeader,AppNavber,AppMain
        
    }
}
</script>

<style scoped>

.header{
    position: absolute;
    line-height: 50px;
    padding: 0px;
    top: 0px;
    left: 0px;
    right: 0px;
    background-color: #2d3a4b;
}

.navber{

    position: absolute;
    width: 230px;
    top: 50px;
    left: 0px;
    bottom: 0px;
    overflow-y: auto;
    background-color: #545c46;
}

.main{

    position: absolute;
    top:50px;
    left: 230px;
    right: 0px;
    bottom: 0px;
    padding: 10px;
    overflow-y: auto;
    /* background-color: red; */

}

</style>