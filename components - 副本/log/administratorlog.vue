<template>
  <div class="mRight" id="versionBox">
    <div class="mRightTwo">
      <div class="zForm systemlog">
        <span class="paddingLeft">起始时间</span>
        <div class="timeBox">
            <el-date-picker v-model="startTime" 
            type="date" 
            format="yyyy-MM-dd" 
            value-format="timestamp" 
            placeholder="开始日期"></el-date-picker>
        </div>
        <span>终止时间</span>
         <div class="timeBox">
            <el-date-picker v-model="endTime" 
            type="date" 
            format="yyyy-MM-dd" 
            value-format="timestamp" 
            placeholder="终止日期"></el-date-picker>
        </div>
        <span class="Selectfont">一级菜单</span>
        <div class="zSelect">
            <el-select v-model="Moduledatavalue" @change="selcetChange" class="zgroup" placeholder="--请选择--">
                <el-option
                v-for="item in Moduledata"
                :key="item.key"
                :label="item.module_name"
                :value="item.module_url"
                ></el-option>
            </el-select>
         </div>
        <span class="Selectfont">二级级菜单</span>
        <div class="zSelect">
          <el-select v-model="Fundatavalue" class="zgroup" placeholder="--请选择--">
            <el-option
              v-for="item in Fundata"
              :key="item.key"
              :label="item.fun_name"
              :value="item.fun_url"
            ></el-option>
          </el-select>
        </div>
        <div id="inline">
            <span>操作账号或姓名：</span>
            <input v-model="logName" class="zInput" type="text" placeholder />
            <span>用户IP：</span>
            <input v-model="logIp" class="zInput" type="text" placeholder />
            <button @click="findData">查询</button>
            <button @click="clearData">清空</button>
        </div>
      </div>
      <div class="zTable">
        <div class="elTable">
            <el-table ref="multipleTable" :data="logListdata" style="width: 100%">
                <el-table-column prop="action_time" label="操作时间">
                    <template slot-scope="scope">
                        <span>{{ scope.row.action_time | FormatDate('yyyy-MM-dd hh:mm:ss') }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="企业名称"></el-table-column>
                <el-table-column prop="module_name" label="功能模块名称"></el-table-column>
                <el-table-column prop="fun_name" label="操作详情"></el-table-column>
                <el-table-column prop="user_account" label="操作用户账号"></el-table-column>
                <el-table-column prop="user_name" label="操作用户姓名"></el-table-column>
                <el-table-column prop="user_ip" label="操作用户IP"></el-table-column>
            </el-table>
            <el-pagination
                @current-change="handleCurrentChange" 
                :current-page.sync="page_total_pages" 
                :page-size="page_size" 
                layout="total, prev, pager, next, jumper" 
                :total="page_total_items"
                class="zPage"
                style="margin-top:20px;"
                >
            </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import axios from "axios";

/* api */
/* getFunentriesBymoduleUrl 管理员日志列表 */
/* getAllmoduleEntries 获取全部的模块条目 */
/* specifyListof 获取指定的模块列表 */
import {getFunentriesModuleurl, getAllmoduleEntries, specifyListof} from '../interface/log'

export default {
  data() {
    return {
        startTime : '',
        endTime : '',
        logName : '',
        logIp : '',
        Fundata : [],
        Fundatavalue : '',
        Moduledata : [],
        Moduledatavalue : '',
        logListdata : [],
       /* 分页相关 */
        page_size : 10,			//  请求多少条目
        page_total_items : 0,  // 总条数
        page_total_pages : 1,  //  当前条数
    };
  },
  methods: {
        // 初始化下拉数据
        getInitdropDowndata(){
            let objData = {}
            getAllmoduleEntries(objData).then(res => {
                if (res.status === 200 && res.data.result == "ok") {
                    this.Moduledata = res.data.data;
                }
            });	
        },
        // 动态加载下拉
        selcetChange(){
            let url = this.Moduledatavalue;           
            this.getSecondarydata(url);
        },
        // 二级下拉数据获取
        getSecondarydata(url){
            let objData = {
                "module_url": url
            }
            specifyListof(objData).then(res => {
                if (res.status === 200 && res.data.result == "ok") {
                    this.Fundata = res.data.data;
                }
            });	
        },
        // 初始化数据列表
        getDatalist(){
            let objData ={
                "account_or_user_name": this.logName,
                "begin_action_time": this.startTime,
                "end_action_time": this.endTime,
                "fun_url": this.Fundatavalue,
                "module_url":  this.Moduledatavalue,
                "user_ip": this.logIp,
                "page_number": this.page_total_pages,
                "page_size": this.page_size,
            }
            // 判断 开始日期是否为空
            if(objData.begin_action_time == ''){
                // 获取今天0点时间 为默认值
                let start = new Date(new Date(new Date().toLocaleDateString()).getTime() - 24*60*60*1000);

                objData.begin_action_time = start.getTime()
            }
            getFunentriesModuleurl(objData).then(res => {
                if (res.status === 200 && res.data.result == "ok") {
                    this.logListdata = res.data.data.list;
                    /* 总条数 */
                    this.page_total_items = res.data.data.page_total_items; 
                    this.page_total_pages = res.data.data.page_number;
                }
            });	

        },
        // 查询
        findData(){
            this.getDatalist();
        },
        // 清空
        clearData(){
            this.startTime = ''
            this.endTime = ''
            this.logName = ''
            this.logIp = ''
            this.Fundatavalue = ''
            this.Moduledatavalue = ''
        },
        // page
        handleCurrentChange(currentPage) {
            this.page_total_pages = currentPage;
            this.getDatalist();
        },
  },
  mounted: function() {
    var hei = document.documentElement.clientHeight;
    $(".mRightTwo").css("height", hei - 178);
    $(window).resize(function() {
      var wid = document.documentElement.clientWidth,
        hei = document.documentElement.clientHeight;
      $(".mRightTwo").css("height", hei - 178);
    });
    // this.getselect();
    $(".UploadPath").css("display", "none");
    // 初始化接口
    this.getDatalist();
    this.getInitdropDowndata();
  },
  updated() {
    var addmodHei = $("#userAddModel .el-dialog").height();
    $("#userAddModel .el-dialog").css("marginTop", -(addmodHei / 2));
    $("#userAddModel .el-dialog").css("marginBottom", 0);
    var addmodHei = $("#userEditModel .el-dialog").height();
    $("#userEditModel .el-dialog").css("marginTop", -(addmodHei / 2));
    $("#userEditModel .el-dialog").css("marginBottom", 0);
    // $('.TerminaLeft li')
    $(".TerminaLeft li").click(function() {
      $(".TerminaLeft li").css("background", "");
      $(this).css("background", "#57e29b");
    });
  }
};
</script>
<style scoped>
/*7-12赵昆加*/
#inline{
    width: 100%;
    display: inline-block;
    margin: 20px; 
}
#versionBox .systemlog .timeBox {
    float: left;
    margin: 0 20px;
}
</style>

<style scoped>
/*7-3刘凯杰加*/
.elTable .butclick {
  padding: 0px 10px;
  background: #1b274c;
  border: 1px #3b4872 solid;
}

#userEditModel #files {
  width: 90px;
  height: 30px;
  position: absolute;
  opacity: 0;
  z-index: 20;
  top: 8px;
}

.filegroup {
  height: 30px;
  overflow: hidden;
  position: relative;
  padding-top: 8px;
  text-align: left;
}

#file {
  float: left;
  width: 260px;
  color: #fff;
  height: 30px;
  border: none;
  line-height: 30px;
  margin-left: 100px;
  background: none;
}

.btn3 {
  float: left;
  color: #fff;
  width: 90px;
  height: 30px;
  background: #4a567c;
  border-radius: 3px;
  position: absolute;
  z-index: 19;
  line-height: 30px;
  text-align: center;
}

#userAddModel #files {
  width: 90px;
  height: 30px;
  position: absolute;
  opacity: 0;
  z-index: 20;
  top: 8px;
}

.sccess {
  color: #fff;
  float: left;
  width: 16px;
  height: 16px;
  display: none;
  overflow: hidden;
  line-height: 16px;
  background: #61cd97;
  border-radius: 50%;
  margin-top: 7px;
  text-align: center;
}

.scrollbox {
  width: 1564px;
}

.upload {
  clear: both;
  width: 100%;
  overflow: hidden;
}

.uploadBg {
  width: 96%;
  height: 44px;
  margin: 2px 0;
  text-align: left;
  line-height: 44px;
  padding-left: 10px;
  background: #2a3558;
  border: 1px #3b4872 solid;
}

@media screen and (max-width: 1440px) {
  .scrollbox {
    width: 1156px;
  }
}

@media screen and (max-width: 1366px) {
  .scrollbox {
    width: 1090px;
  }
  #versionBox .zTable {
    padding-top: 0;
  }
  #versionBox .elTable {
    height: 86%;
  }
}
/* 弹出层 */

.formTable {
  overflow: hidden;
  padding: 2px 4px;
  background: #4a567c;
}

.block {
  float: left;
  width: 50%;
  height: 40px;
  overflow: hidden;
  /* border:2px #4a567c solid; */
}
.block .formbox {
  height: 36px;
  margin: 2px 0;
  line-height: 36px;
  border: 1px #3b4872 solid;
}
.block .blockleft {
  margin-left: 30%;
}
.infoMsg {
  float: left;
  line-height: 36px;
  padding-left: 9px;
}

.checkboxBg {
  width: 96%;
  height: 34px;
  margin: 2px 0;
  line-height: 34px;
  padding-left: 10px;
  background: #2a3558;
  border: 1px #3b4872 solid;
}

.textarea {
  clear: both;
  height: 120px;
  overflow: hidden;
}
.textarealist {
  height: 36px;
}
.textarealist1 {
  height: 36px;
  margin-top: 2px;
}
#versionBox .formbox .timeBox {
  width: 200px;
  display: inline-block;
  margin-left: 30px;
}

.userBtn2 {
  overflow: hidden;
  text-align: right;
}
.userBtn2 p {
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  padding: 10px 0 4px;
}
.userBtn2 p span {
  color: red;
}
/* end */

.paddingLeft {
  padding-left: 20px;
}

input.el-input__inner:hover {
  border: 1px #3b4872 solid;
}

.mRightTwo {
  padding: 34px 42px;
  margin: 15px 27px 15px 15px;
  background: #354166;
  box-shadow: 0px 0px 26px #01060e;
}

.zForm span {
  float: left;
  color: #eee;
  display: block;
  font-size: 14px;
  overflow: hidden;
  line-height: 36px;
}

.zTable {
  clear: both;
  height: 94%;
  overflow: hidden;
  padding-top: 26px;
}

.elTable {
  height: 91.7%;
  overflow: hidden;
}

.zInput {
  float: left;
  width: 120px;
  height: 36px;
  font-size: 14px;
  margin-left: 3px;
  line-height: 36px;
  padding-left: 14px;
  margin-right: 20px;
  background: #2a3558;
  border: 1px #3b4872 solid;
}

.zForm button {
  float: left;
  color: #eee;
  height: 38px;
  font-size: 14px;
  margin-left: 11px;
  text-align: center;
  line-height: 38px;
  padding: 0px 15px;
  background: #1b274c;
  border: 1px #3b4872 solid;
}

.zSelect {
  float: left;
  width: 148px;
}

.zForm span.btnRight {
  float: right;
  display: inline-block;
}
</style>
<style type="text/css">
#userEditModel .submit2 {
  float: left;
  color: #fff;
  width: 80px;
  height: 30px;
  background: #4a567c;
  border-radius: 3px;
  position: absolute;
  z-index: 19;
  line-height: 30px;
  text-align: center;
  margin-top: 0px;
}

#userEditModel .upload .uploadBg #uploadForm {
  width: 45%;
  margin-top: 0;
}

#userEditModel .el-dialog {
  width: 1100px;
  top: 50%;
}

#userEditModel .el-dialog__body {
  padding: 24px 24px 18px;
}

#userEditModel .el-checkbox {
  float: left;
}

#userEditModel .block .el-form-item__label {
  background: #1b274c;
}

#userEditModel .el-dialog .textarea .el-form-item__label {
  height: 120px;
  background: #1b274c;
}

#userEditModel .upload .el-form-item {
  width: 95.5%;
}

#userEditModel .el-form-item {
  margin: 0;
  padding: 0;
  width: 91%;
  float: left;
}

#userEditModel .userBtn2 .el-form-item {
  width: 100%;
}

#userEditModel .el-textarea {
  width: 106.2%;
}

/*7-3刘凯杰加以上*/
#userAddModel .submit2 {
  float: left;
  color: #fff;
  width: 80px;
  height: 30px;
  background: #4a567c;
  border-radius: 3px;
  position: absolute;
  z-index: 19;
  line-height: 30px;
  text-align: center;
  margin-top: 0px;
}

.upload .uploadBg #uploadForm {
  width: 45%;
  margin-top: 0;
}
@import url("../media/lkjmedia.css");
.TerminaLeft li {
  margin-top: 4px;
  font-size: 14px;
  text-indent: 16px;
}

.TerminaLeft li:hover {
  /*background-color: #409EFF;*/
  background: #57e29b;
  color: #fff;
}

.TerminaLeft li:focus {
  background-color: #57e29b;
  /* background: #57e29b; */
  color: #fff;
}

.TerminaRight .el-input .el-input__inner {
  height: 28px;
  width: 200px;
}

.TerminaLeft,
.TerminaRight {
  background-color: #1b274c;
  width: 200px;
  float: left;
  height: 340px;
  overflow-y: auto;
}

.TerminaRight {
  width: 410px;
  border-left: 2px #4a567c solid;
}

#TerminaInformationPopup .el-dialog {
  width: 660px;
  height: 500px;
  /*top: 50%;*/
}

#userAddModel .el-dialog {
  width: 1100px;
  top: 50%;
}

#userAddModel .el-dialog__body {
  padding: 24px 24px 18px;
}

#userAddModel .el-checkbox {
  float: left;
}

.textarealist .el-form-item__label,
.textarealist .el-input__inner,
.textarealist1 .el-form-item__label,
.textarealist1 .el-input__inner,
.textarea .el-input__inner,
.block .el-form-item__label,
.block .el-input__inner,
.textarea .el-form-item__label,
.upload .el-input__inner {
  height: 36px;
  margin: 2px 0;
  line-height: 36px;
  border: 1px #3b4872 solid;
}

.upload .el-form-item__label {
  width: 18.2% !important;
  height: 46px;
  margin: 2px 0;
  line-height: 46px;
  /* background: #2a3558; */
  border: 1px #3b4872 solid;
}

.upload .el-form-item__content {
  width: 84%;
  margin-left: 18.2% !important;
}
#userAddModel .block .el-form-item__label {
  background: #1b274c;
}

#userAddModel .el-dialog .textarea .el-form-item__label {
  height: 120px;
  background: #1b274c;
}
#userAddModel .upload .el-form-item {
  width: 95.5%;
}

#userAddModel .el-form-item {
  margin: 0;
  padding: 0;
  width: 91%;
  float: left;
}

#userAddModel .userBtn2 .el-form-item {
  width: 100%;
}

#userAddModel .el-textarea {
  width: 106.2%;
}

.textarea .el-textarea__inner {
  height: 120px;
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
  background: url(../../assets/modeIco.png) no-repeat;
}

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
#versionBox .el-progress {
  float: left;
  margin: 8px 0 0 102px;
  width: 257px;
}
#versionBox .el-progress-bar__outer {
  height: 10px !important;
}
</style>
