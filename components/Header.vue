<template>
    <div class="head">
      <div class="user">
        <div class="userImg">
        </div>
        <span>
          <a href="javascript:;" v-html="Usemessage"></a>
        </span>
        <span class="install">
          <el-dropdown>
            <span class="el-dropdown-link">
              <img src="../assets/install.png" />
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <span @click="isshowinstall = true">
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>个人信息</el-dropdown-item>
              </span>
            </el-dropdown-menu>
          </el-dropdown>
        </span>

        <span class="out">
          <img @click="SignOut" src="../assets/out.png" />
        </span>
      </div>
      <div class="indexlogo">移动终端管理平台2</div>
      <div id="installlog">
      <el-dialog
        :close-on-click-modal="false"
        title="修改密码"
        :visible.sync="isshowinstall"
        width="40%"
      >
        <el-form :model="parameter" ref="parameter" label-width="20%" class="demo-ruleForm">
          <div class="formTable">
            <p>请输入手机号验证再修改密码</p>
            <div class="block">
              <el-form-item label="手机号" :rules="[{ required: true, message: ' '}]" prop="phone">
                <el-input v-model="parameter.phone" maxlength="50" id="corporate_name"></el-input>
              </el-form-item>
            </div>
            <div class="block">
              <el-form-item label="验证码" :rules="[{ required: true, message: ' '}]" prop="code">
                <el-input v-model="parameter.code" maxlength="50" id="corporate_name"></el-input>
              </el-form-item>
              <div id="logcode" @click="isshowinstallclick" v-html="countdown"></div>
            </div>
            <div class="block">
              <el-form-item label="新密码" :rules="[{ required: true, message: ' '}]" prop="Password1">
                <el-input v-model="parameter.Password1" maxlength="120" type="password"></el-input>
              </el-form-item>
            </div>

            <div class="block">
              <el-form-item
                label="确认密码"
                :rules="[{ required: true, message: ' '}]"
                prop="Password2"
              >
                <el-input v-model="parameter.Password2" maxlength="120" type="password"></el-input>
              </el-form-item>
            </div>
            <div class="power"></div>
          </div>
          <div class="userBtn">
            <el-form-item>
              <el-button @click="isshowinstall=false">关闭</el-button>
              <el-button type="primary" @click="revise">修改</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>
    </div>
    </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
export default {
  data: function() {
    return {
      issecond: 60,
      countdown: "获取验证码",
      isshowinstall: false,
      headPicUrl: "",
      Usemessage: localStorage.userName,
      parameter: {
        phone: "",
        code: "",
        Password1: "",
        Password2: ""
      }
    };
  },
  mounted() {
    let URL = ServerUrl;
    var hei = document.documentElement.clientHeight;
    $(".wrapper").css("height", hei);
    // this.headPicUrl = URL + '/' + localStorage.imgUrl
    $(window).resize(function() {
      var appH = $("#app").height();
      $(".wrapper").height(appH);
      $(".main").height($(".wrapper").height() - $(".head").height());
      $(".mLeft").height($(".main").height());
      $(".mRight").height($(".main").height());
    });
  },
  methods: {
    // 修改
    revise() {
      let _this = this;
      let URL = ServerUrl;
      if (this.parameter.Password1 == this.parameter.Password2) {
        console.log("一样");
        var reviseparameter = {
          is_encrypted_password: false,
          new_password: this.parameter.Password1,
          phonenum: this.parameter.phone,
          sms_verification_code: this.parameter.code
        };

        this.$http
          .post(URL + "/common/api/v1/auth/reset_password", reviseparameter)
          .then(function(res) {
            console.log(res);
            // _this.reLogin(res.data.code); //提示帐号登陆、
            if (res.status === 200 && res.data.result == "ok") {
              this.isshowinstall = false;

              _this.$message({
                message: "修改密码成功",
                type: "warning"
              });
            }
            if (res.data.result == "error") {
              _this.$message({
                message: res.data.error_description,
                type: "warning"
              });
              console.log(res);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        _this.$message({
          message: "两次密码输入不一致",
          type: "warning"
        });
      }
    },
    // 获取验证码
    isshowinstallclick() {
      var that = this;
      let _this = this;
      let URL = ServerUrl;

      var userparameter = {
        phonenum: parseInt(this.parameter.phone)
      };
      if (this.issecond == 60) {
        this.$http
          .post(
            URL +
              "/common/api/v1/auth/send_sms_verification_code_for_reset_password",
            userparameter
          )
          .then(function(res) {
            // _this.reLogin(res.data.code); //提示帐号登陆、
            if (res.status === 200 && res.data.result == "ok") {
              console.log(res);
            }
            if (res.data.result == "error") {
              _this.$message({
                message: res.data.error_description,
                type: "warning"
              });
              console.log(res);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }

      var flag = 1;

      this.issecond = this.issecond - 1;
      console.log(this.issecond);

      this.countdown = this.issecond + "秒后重新发送";
      if (this.issecond == 0) {
        this.countdown = "获取验证码";
        flag = 1;
        this.issecond = 60;
        //  clearInterval(myVar);

        return;
      }
      var myVar = setTimeout(function() {
        that.isshowinstallclick();
      }, 1000);
    },
    // 退出登录
    SignOut() {
        this.$router.push({
            path: "/"
        });
    }
  }
};
</script>
