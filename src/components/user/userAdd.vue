<template>
      <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" >
        <!-- 内容主体区域 -->
     <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="addForm.username"></el-input>
  </el-form-item>
     </el-form>
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
  <el-form-item label="密码" prop="password">
    <el-input v-model="addForm.password" type="password"></el-input>
  </el-form-item>
     </el-form>
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="addForm.email"></el-input>
  </el-form-item>
     </el-form>
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
  <el-form-item label="手机号" prop="mobile">
    <el-input v-model="addForm.mobile"></el-input>
  </el-form-item>
     </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
</template>

<script>
export default {
data(){
    return{
           dialogVisible:false,
      //添加用户表单数据
      addForm :{
          username: '',
          password:'',
          email:'',
          mobile:''
      },
      addFormRules:{
           username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 6, message: "长度请在2-6之间", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度请在6-12中间", trigger: "blur" }
        ]
      }
    }
}
}
</script>

<style lang="less" scoped>

</style>