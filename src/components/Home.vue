<template>
  <el-container class="home_container">
    <el-header>
      <div class="title">后台管理系统</div>
      <div class="msg">
        <div>{{username}}</div>
      <el-button size="mini" type="info" @click="loginout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="iscollapse?'64px':'200px'">
        <div class="toggle_button" @click="toggleCollapse">| | |</div>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="rgb(51, 55, 68)"
          text-color="#fff"
          active-text-color="rgb(64, 158, 255)"
          unique-opened
          :collapse="iscollapse"
          :collapse-transition="false"
          :router="true"
           :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="icons[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/'+subItem.path)">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist:[],
      //定义自定义图标对象
      icons:{
        '125':'iconfont icon-user',
        '103':'iconfont icon-tijikongjian',
        '101':'iconfont icon-shangpin',
        '102':'iconfont icon-danju',
        '145':'iconfont icon-baobiao'
      },
      //是否折叠
      iscollapse:false,
      //是否激活
      activePath:'',
      //获取当前登录用户名
      username:''
    };
  },
  created(){
     this.getMenuList();
     this.activePath=window.sessionStorage.getItem('activePath')
     this.username=window.sessionStorage.getItem('name')
  },
  methods: {
    /* 点击推出按钮 */
    loginout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    /* 接口信息获取 */
    async getMenuList(){
      const {data:res} = await this.$http.get('/menus')
      console.log(res)
      if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist=res.data
    },
    /* 左侧边栏是否折叠 */
    toggleCollapse(){
       this.iscollapse=!this.iscollapse 
    },
    /* 激活样式状态 */
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath);
      this.activePath=activePath
    }
  }
};
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 28px;
  font-weight: 500;
  align-items: center;
}
.el-aside {
  background-color: rgb(51, 55, 68);
  .el-menu{
    border: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont{
  margin-right: 5px;
}
.toggle_button{
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
.msg{
  display: flex;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  .el-button{
    margin-left: 15px;
  }
}
</style>