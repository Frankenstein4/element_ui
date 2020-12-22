<template>
  <div>
      <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
        <el-row>
          <el-col>
              <el-button type="primary" size="medium">添加角色</el-button>
          </el-col>
        </el-row>
        <!-- 角色 列表区域-->
        <el-table :data="rolelist" border stripe>
             <el-table-column label="" type="expand"></el-table-column>
            <!-- 序号 -->
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="角色名称" prop="roleName"></el-table-column>
          <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
          <el-table-column label="操作" prop="roleName">
              <template slot-scope="scope">
                   <!-- 修改按钮 -->
            <el-button size="mini" type="primary" icon="el-icon-edit" >编辑</el-button>
            <!-- 删除按钮 -->
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting">分配权限</el-button>
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
     //所有角色列表数据
     rolelist:[]
    }
},
created(){
    this.getRoleList()
},
methods:{
  async  getRoleList(){
      const { data: res } = await this.$http.get('/roles');
      console.log(res);
      if (res.meta.status !== 200) {
            return this.$message.error(res.meta.msg)
          }
        this.rolelist=res.data
  }
}
}
</script>

<style lang="less" scoped>

</style>