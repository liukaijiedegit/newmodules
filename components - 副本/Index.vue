<template>
	<div class="wrapper">
		<div class="head">
			<div class="user">
				<div class="userImg">
					<!-- <img src="../assets/userImg.jpg" /> -->
					<!-- <img :src="this.headPicUrl"> -->
				</div>
				<span><a href="javascript:;" v-html="Usemessage"></a></span>
				<span class="install">
<el-dropdown>
  <span class="el-dropdown-link ">
    <img src="../assets/install.png" /><i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
 <span  @click="isshowinstall = true" >
    <el-dropdown-item >修改密码</el-dropdown-item>
 </span>
  </el-dropdown-menu>
</el-dropdown>
				</span>

				<span class="out"><img @click="SignOut" src="../assets/out.png" /></span>

			</div>
			<div class="indexlogo">移动终端管理平台</div>
			<!-- <span><img src="../assets/logo2.png"/></span> -->
		</div>
		<div class="main">
			<NavView v-if="hackReset"></NavView>
			<!--	<HomeView></HomeView>-->
			<router-view/>
		</div>
			<div id="installlog">
			<el-dialog :close-on-click-modal="false" title="修改密码" :visible.sync="isshowinstall"  width="40%">
				<el-form :model="parameter" ref="parameter" label-width="20%" class="demo-ruleForm">
					<div class="formTable">
						<p>请输入手机号验证再修改密码</p>
						<div class="block " >
							<el-form-item label="手机号" :rules="[{ required: true, message: ' '}]" prop="phone">
								<el-input v-model="parameter.phone" maxlength="50" id="corporate_name"></el-input>
							</el-form-item>
						</div>
						<div class="block " >
							<el-form-item label="验证码" :rules="[{ required: true, message: ' '}]" prop="code">
								<el-input v-model="parameter.code" maxlength="50" id="corporate_name"></el-input>
							</el-form-item>
							<div id="logcode" @click="isshowinstallclick" v-html="countdown"> </div>


						</div>
						<div class="block">
							<el-form-item label="新密码" :rules="[{ required: true, message: ' '}]" prop="Password1">
								<el-input v-model="parameter.Password1" maxlength="120"  type="password"></el-input>
							</el-form-item>
						</div>

						<div class="block">
							<el-form-item label="确认密码" :rules="[{ required: true, message: ' '}]" prop="Password2">
								<el-input v-model="parameter.Password2" maxlength="120"  type="password"></el-input>
							</el-form-item>
						</div>
						<div class="power">

						</div>
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
	import NavView from '../components/Nav.vue'
	import $ from 'jquery'
	import axios from 'axios'

	export default {
		data: function() {
			return {
				issecond:60,
				countdown:'获取验证码',
				isshowinstall:false,
				hackReset: true,
				headPicUrl: '',
				Usemessage: localStorage.userName,
					parameter: {
					phone: '',
					code: '',
					Password1: '',
					Password2: '',
				},
			}
		},
		components: {
			NavView,
		},
		 destroyed: function () {

		  window.IsTips=false
		  console.log('页面关闭了')


 },
		mounted() {
			let URL = ServerUrl;
			var hei = document.documentElement.clientHeight;
			$('.wrapper').css('height', hei);
			// this.headPicUrl = URL + '/' + localStorage.imgUrl
			$(window).resize(function () {
				var appH = $('#app').height()
				$('.wrapper').height(appH);
				$('.main').height($('.wrapper').height() - $('.head').height());
				$('.mLeft').height($('.main').height())
				$('.mRight').height($('.main').height())
			})
		},
		methods: {
			loding() {
				//        window.location.reload()
			},
			Inputchange(){

				   console.log(this.parameter)

			},
			revise(){
				let _this = this;
				let URL = ServerUrl;
				if(this.parameter.Password1==this.parameter.Password2){
					 console.log("一样");
									var reviseparameter={
					is_encrypted_password: false,
					new_password:this.parameter.Password1,
					phonenum: this.parameter.phone,
					sms_verification_code: this.parameter.code,


				}

this.$http.post(URL + '/common/api/v1/auth/reset_password', reviseparameter).then(function(res) {
		               console.log(res)
					// _this.reLogin(res.data.code); //提示帐号登陆、
					if(res.status===200&&res.data.result=="ok"){


						this.isshowinstall=false;

                _this.$message({
				message: "修改密码成功",
				type: 'warning'
			});

					}
					if(res.data.result=="error"){
						_this.$message({
				message: res.data.error_description,
				type: 'warning'
			});
						 console.log(res);

					}

				}).catch(function(error) {
					console.log(error);
				});


				}else{
					_this.$message({
 				message: "两次密码输入不一致",
 				type: 'warning'
			});
				}




			},
	isshowinstallclick(){


		var that=this
				let _this = this;
				let URL = ServerUrl;

				var userparameter={
					 "phonenum":parseInt(this.parameter.phone),

				}
if(this.issecond==60){
	this.$http.post(URL + '/common/api/v1/auth/send_sms_verification_code_for_reset_password', userparameter).then(function(res) {
					// _this.reLogin(res.data.code); //提示帐号登陆、
					if(res.status===200&&res.data.result=="ok"){

						console.log(res)



					}
					if(res.data.result=="error"){
						_this.$message({
				message: res.data.error_description,
				type: 'warning'
			});
						 console.log(res);

					}

				}).catch(function(error) {
					console.log(error);
				});

        }



           var flag = 1;


	   this.issecond = this.issecond - 1;
	   console.log(this.issecond)

        this.countdown=this.issecond+"秒后重新发送"
      if ( this.issecond == 0) {
        this.countdown="获取验证码"
        flag = 1;
		this.issecond = 60;
		//  clearInterval(myVar);

        return;
       }
         var myVar = setTimeout(function(){ that.isshowinstallclick() }, 1000);




	  },

			SignOut() {
				this.$router.push({
							 path: "/"
        });

        //               window.IsTips=false

		// 		       console.log("我在退出"+ " window.IsTips="+window.IsTips)
		// 		// localStorage.removeItem('Myitems')
		// 		// alert(localStorage.userName)
		// 		let _this = this;
		// 		let URL = ServerUrl;
		// 		var delDate = {
		// 			"ClientKey": localStorage.clientKey,
		// 			"Token": localStorage.token,
		// 			"UserName": localStorage.userName,
		// 		}
		// 		console.log(delDate)
		// 		axios.delete(URL + '/api/Provider/Logon', {
		// 			data: delDate
		// 		}).then(function(response) {
		// 			  window.IsTips=false
		// 			 _this.reLogin(response.data.code); //提示帐号登陆
		// 			if(response.data.code==0||response.data.code==window.code){
		// 				 localStorage.clear();
		// 				_this.$router.push({
		// 					 path: "/"
        // });

		// 			}


		// 			console.log(response.data)
		// 		}).catch(function(error) {
		// 			console.log(error);
		// 		});

			}
		}
	}
</script>

<style type="text/css">
  ::-webkit-scrollbar {
    width: 12px;
    /*滚动条宽度*/
    height: 12px;
    /*滚动条高度*/
  }
  ::-webkit-scrollbar-track {
    border-radius: 5px;
    /*滚动条的背景区域的圆角*/
    background-color: #222d50;
    /*滚动条的背景颜色*/
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    /*滚动条的圆角*/
    background-color: #4f5c84;
    /*滚动条的背景颜色*/
  }
#corporate_name{
	width: 100%;
}
#installlog .block #logcode{
    position: absolute;
    right: 15%;
    margin-top: 6px;
}
#installlog .block {
	overflow: hidden;
}
	#installlog .textarea .el-form-item__label,
	#menuEditModel .textarea .el-form-item__label {
		height: 160px;
		margin-top: 2px;
		background: #1b274c;
	}

	#installlog .textarea .el-textarea__inner,
	#menuEditModel .textarea .el-textarea__inner {
		height: 160px;
	}
	@import url("../media/lkjmedia.css");
	#menuEditModel .el-dialog,
	#installlog .el-dialog {
		width: 1100px;
		top: 20%;
	}

	#menuEditModel .block .el-form-item__label,
	#menuEditModel .block .el-input__inner {
		height: 36px;
		margin: 2px 0;
		line-height: 36px;
		border: 1px #3b4872 solid;
	}
	#menuEditModel .block .el-form-item__label,
	#installlog .block .el-form-item__label {
		background: #1b274c;
	}
	#installlog .block .el-form-item__label,
	#installlog .block .el-input__inner {
		height: 36px;
		margin: 2px 0;
		line-height: 36px;
		border: 1px #3b4872 solid;
	}

	#menuEditModel .el-dialog__body,
	#installlog .el-dialog__body {
		padding: 24px 24px 18px;
		height: 250px;
	}

	#menuEditModel .el-checkbox,
	#installlog .el-checkbox {
		float: left;
	}

	#menuEditModel .el-form-item,
	#installlog .el-form-item {
		margin: 0;
		padding: 0;
		width: 91%;
		float: left;
	}

	#menuEditModel .userBtn .el-form-item,
	#installlog .userBtn .el-form-item {
		width: 100%;
	}

	#menuEditModel .el-textarea,
	#installlog .el-textarea {
		width: 106.2%;
	}

	.el-textarea__inner {
		height: 160px;
		margin: 2px 0;
		line-height: 22px;
		background: #2a3558;
		border: 1px #3b4872 solid;
		border-radius: 0;
	}

	.el-date-editor.el-input {
		width: 100%;
	}

	.el-select {
		width: 100%;
	}

	.el-textarea {
		float: left;
		width: 92.2%;
	}

	.el-dialog__header span {
		padding-left: 38px;
		height: 38px;
		display: inline-block;

	}
	/*img:hover{*/
	/*background-color: #1b274c;*/
	/*}*/

	#installlog .block .el-form-item__content,
	#menuEditModel .block .el-form-item__content {
		line-height: 32px;
	}
</style>
<style>
	.wrapper {
		height: 100%;
	}

	.user span {
		float: left;
		display: block;
		overflow: hidden;
	}
	.user .out{
	 margin-left: 10px
	}

	.out ,.install{
		float: left;
		width: 18px;
		height: 18px;
		display: block;
		overflow: hidden;
		line-height: 18px;
		margin: 18px 0px 0px 10px;
	}

	@media screen and (max-width: 1366px) {
		.out {
			float: left;
			width: 18px;
			height: 18px;
			display: block;
			overflow: hidden;
			line-height: 18px;
			margin: 10px 0px 0px 10px;
		}
	}
</style>
