<template>
  <div class="login_container">
    <div class="login_box">
      <!-- logo区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登录表单 -->
      <el-form :model="loginForm" ref="loginFormRef" :rules="rules" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-3702mima"
            type="password"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //登录表单的数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 6, message: "长度请在2-6之间", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度请在6-12中间", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetForm() {
      console.log(this);
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      //表单的预验证
      /*  this.$refs.loginFormRef.validate((valid)=>{
               console.log(valid)//true  和  false
               if(!valid) return;
               this.$http.post("/login",this.loginForm).then(data=>{
                   console.log(data)
               })
           }) */

      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        //const result = await this.$http.post("/login",this.loginForm);
        const { data: res } = await this.$http.post("/login", this.loginForm);
        console.log(res);
        if (res.meta.status !== 200) {
          this.$message({
            message: res.meta.msg,
            type: "warning"
          });
        } else {
          //保存token
          window.sessionStorage.setItem("token", res.data.token);
          window.sessionStorage.setItem('name',res.data.username)
          this.$router.push("/home");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: rgb(51, 55, 68);
  height: 100%;
  .login_box {
    width: 500px;
    height: 300px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #eee;
    position: absolute;
    left: 50%;
    background-color: #fff;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      border-radius: 50%;
      background-color: #eeeeee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>