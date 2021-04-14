<template>
    <div>
        <div>{{testMix}}</div>
        <div @click="mixinsFun">{{testMix}}</div>
        <input type="text" v-model="testMix">
        <div>{{testMix2}}</div>
    </div>
</template>
<script>
import {mixinstest} from './index' 
export default {
    mixins: [mixinstest],
    data (){
        return {
            //testMix:'这是组件的数据'
        }
    },
    created(){
        this.testMix=this.testMix+1
        console.log('这是组件的created')
    },
    methods: {
        mixinsFun(){
            console.log('调用组件的methods的函数')
        }
    },
    computed:{
        testMix2(){
            return this.testMix+':这是组件计算结果'
        }
    },
    watch: {
        testMix(newVal,oldVal){
            console.log('组件的watch')
        }
    }
}
</script>
<style>

</style>