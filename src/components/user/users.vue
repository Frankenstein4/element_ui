<template>
  <div class="user_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            clearable
            placeholder="请输入内容"
            v-model="queryInfo.query"
            @keyup.enter.native="toResult"
            @clear="search"
          >
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDailog(scope.row.id)"></el-button>
            <!-- 删除按钮 -->
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeUserById(scope.row.id)"></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top-start"
              :enterable="false"
            >
              <!-- 分配角色按钮 -->
              <el-button size="mini" type="warning" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" @close="addDialogClosed">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog
  title="修改用户"
  :visible.sync="editDialogVisible"
  width="50%"  @close="editDialogClosed">
  <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px" >
  <el-form-item label="活动名称">
    <el-input v-model="editForm.username" disabled></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="editForm.email" ></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="mobile">
    <el-input v-model="editForm.mobile" ></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUserInfo">确 定</el-button>
  </span>
</el-dialog>


  </div>
</template>

<script>
export default {
  data() {
    //验证邮箱的规则
    var checkMail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    };
    //验证手机号
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };
    return {
      input1: "",
      //获取用户列表参数对象
      queryInfo: {
        query: "",
        //pagenum 当前页数
        pagenum: 1,
        pagesize: 2
      },
      userlist: [],
      total: 0,
      //控制添加用户对话框的显示与隐藏
      dialogVisible: false,
      //添加用户表单数据
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 6, message: "长度请在2-6之间", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度请在6-12中间", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: checkMail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      },
      //控制修改用户对话框的显示与隐藏
      editDialogVisible:false,
      //查询到的用户对象
      editForm:{},
      editFormRules:{
         email: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: checkMail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //获取用户列表数据
    async getUserList() {
      const { data: res } = await this.$http.get("/users", {
        params: this.queryInfo
      });
      console.log(res);//怎么跟react请求接口的数据不一样
      if (res.meta.status !== 200) {
        return this.$message.error("获取用户列表失败");
      } else {
        this.userlist = res.data.users;
        this.total = res.data.total;
      }
    },
    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    //监听switch开关状态的改变
    async userStateChange(userinfo) {
      console.log(userinfo)
      const { data: res } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      );
      console.log(res);
      if (res.meta.status === 200) {
        this.$message({
          message: res.meta.msg,
          type: "success"
        });
      }
    },
    //点击搜索
    search() {
      console.log(this.queryInfo.query);
      this.getUserList();
    },
    //搜索回车
    toResult() {
      console.log(this.queryInfo.query);
      this.getUserList();
    },
    //监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    //点击按钮 保存新用户
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post("/users", this.addForm);
        console.log(res);
        if (res.meta.status !== 201) {
          this.$message({
            message: res.meta.msg,
            type: "warning"
          });
        } else {
          this.$message({
            message: "添加用户成功！",
            type: "success"
          });
          this.dialogVisible = false;
          this.getUserList();
        }
      });
    },
    //展示编辑用户的对话框
   async showEditDailog(id) {
      this.editDialogVisible=true;
      const { data: res } = await this.$http.get(`users/${id}`);
      //const { data: res } = await this.$http.get('/users/'+id);
      console.log(res)
      if (res.meta.status !== 200) {
          this.$message({
            message: res.meta.msg,
            type: "warning"
          });
        }else{
          this.editForm=res.data;
        }
    },
    //关闭编辑用户的对话框
    editDialogClosed(){
      this.$refs.editFormRef.resetFields();
    },
    //修改用户信息并提交
     editUserInfo(){
        this.$refs.editFormRef.validate(async valid => {
          if (!valid) return;
          const { data: res } = await this.$http.put(`users/${this.editForm.id}`, {
            email:this.editForm.email,
            mobile:this.editForm.mobile
          });
          console.log(res);
          if (res.meta.status !== 200) {
            return this.$message.error(res.meta.msg)
          }
          this.$message.success(res.meta.msg)
          this.editDialogVisible=false;
          this.getUserList()
        })
    },
    //删除用户按钮
   async removeUserById(id){
      //询问是否删除
   const confirmResult =  await this.$confirm('是否要永久删除此用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=> err)
        
        console.log(confirmResult)//点击确定 返回值为confirm  取消 返回值为cancel
        if(confirmResult !=='confirm'){
          return this.$message.info("已经取消删除")
        }else{
           const { data: res } = await this.$http.delete(`users/${id}`);
            console.log(res);
          if (res.meta.status !== 200) {
            return this.$message.error(res.meta.msg)
          }
           this.$message.success(res.meta.msg)
           this.getUserList()
        }
    }
    
  }
};
</script>

<style lang="less" scoped>
</style>