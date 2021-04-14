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
           // testMix:'这是组件的数据'
        }
        /**
         * 
         * 
vuex：用来做状态管理的，里面定义的变量在每个组件中均可以使用和修改，在任一组件中修改此变量的值之后，其他组件中此变量的值也会随之修改。

Mixins：可以定义共用的变量，在每个组件中使用，引入组件中之后，各个变量是相互独立的，值的修改在组件中不会相互影响。

        */
    },
    created(){
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