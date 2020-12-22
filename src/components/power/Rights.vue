<template>
  <div>
      <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
        <el-table :data="rightList" border stripe>
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="权限名称" prop="authName"></el-table-column>
          <el-table-column label="路径" prop="path"></el-table-column>
          <el-table-column label="等级" prop="level">
              <template slot-scope="scope">
                  <el-tag  type="" v-if="scope.row.level==='0'">一级</el-tag>
                  <el-tag type="success" v-else-if="scope.row.level==='1'">二级</el-tag>
                  <el-tag type="warning" v-else>三级</el-tag>
              </template>
          </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
data(){
    return{
        rightList:[]
    }
},
created(){
    this.getRightList()
},
methods:{
    //获取权限列表数据
  async  getRightList(){
        const { data: res } = await this.$http.get('/rights/list');
      console.log(res);
      if (res.meta.status !== 200) {
            return this.$message.error(res.meta.msg)
          }
          this.rightList=res.data;
    }
}
}
</script>

<style lang="less" scoped>

</style>