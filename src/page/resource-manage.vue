<template>
  <article class="resource-manage-container" id="resource-manage-container" v-cloak>
    <ul class="choose-tabs clearfix">
      <li><a href="javascript:;" class="default-tab active-tab" @click="requestTabData(0)">全部</a></li>
      <li><a href="javascript:;" class="default-tab" @click="requestTabData(2)">已发布</a></li>
      <li><a href="javascript:;" class="default-tab" @click="requestTabData(1)">待发布</a></li>
      <li><a href="javascript:;" class="default-tab" @click="requestTabData(3)">已下架</a></li>
    </ul>
    <section class="first-select-section clearfix">
      <ul>
        <li class="clearfix ssl">
          <div class="dropdown f-fl">
            <select name="standard-dropdown" class="standard-dropdown wide first-select" id="selectbox1">
              <option value="" selected="selected">请选择学段</option>
            </select>
          </div>
          <div class="dropdown f-fl">
            <select name="standard-dropdown" class="standard-dropdown wide second-select" id="selectbox2">
              <option value="" selected="selected">请选择学科</option>
            </select>
          </div>
          <div class="dropdown f-fl">
            <select name="standard-dropdown" class="standard-dropdown wide third-select" id="selectbox3">
              <option value="" selected="selected">请选择教材版本</option>
            </select>
          </div>
          <div class="dropdown f-fl">
            <select name="standard-dropdown" class="standard-dropdown wide fourth-select" id="selectbox4">
              <option value="" selected="selected">请选择册次</option>
            </select>
          </div>
        </li>
        <li class="clearfix ssl">
          <label class="dl-mgl f-fl">时间设置</label>
          <input type="text" id="dates_start1" name="dates_start1" class="dateInput f-fl" value=""
                 placeholder="请选择起始时间">
          <label class="f-fl">至</label>
          <input type="text" id="dates_end1" name="dates_end1" class="dateInput f-fl" value="" placeholder="请选择结束时间">
        </li>
        <li class="clearfix ssl">
          <div class="dropdown f-fl" id="role">
            <select name="standard-dropdown" class="standard-dropdown wide allSelect" id="allSelect">
              <option value="0" selected="selected">全部</option>
              <option value="1">上传者</option>
              <option value="2">作者</option>
            </select>
          </div>
          <input type="text" class="search-box f-fl" placeholder="请输入搜索的内容" v-model="searchInput"/>
          <button class="search-btn f-fl" @click="requestSearchData">搜索</button>
        </li>
      </ul>
    </section>
    <section class="second-select-section">
      <span>排序</span>
      <ul class="clearfix">
        <li>
          <span>下载</span>
          <a href="javascript:;" :class="{'asc-enabled': downAscClick,'asc-disabled': !downAscClick}"
             @click="sortItems('download')"></a>
          <a href="javascript:;" :class="{'desc-enabled': downDescClick,'desc-disabled': !downDescClick}"
             @click="sortItems('download')"></a>
        </li>
        <li>
          <span>浏览</span>
          <a href="javascript:;" :class="{'asc-enabled': browseAscClick,'asc-disabled': !browseAscClick}"
             @click="sortItems('browse')"></a>
          <a href="javascript:;" :class="{'desc-enabled': browseDescClick,'desc-disabled': !browseDescClick}"
             @click="sortItems('browse')"></a>
        </li>
        <li>
          <span>价格</span>
          <a href="javascript:;" :class="{'asc-enabled': priceAscClick,'asc-disabled': !priceAscClick}"
             @click="sortItems('price')"></a>
          <a href="javascript:;" :class="{'desc-enabled': priceDescClick,'desc-disabled': !priceDescClick}"
             @click="sortItems('price')"></a>
        </li>
        <li>
          <span>评分</span>
          <a href="javascript:;" :class="{'asc-enabled': gradeAscClick,'asc-disabled': !gradeAscClick}"
             @click="sortItems('grade')"></a>
          <a href="javascript:;" :class="{'desc-enabled': gradeDescClick,'desc-disabled': !gradeDescClick}"
             @click="sortItems('grade')"></a>
        </li>

        <button class="select-free-resource" @click="filterFree">筛选免费资源</button>
      </ul>
    </section>
    <section class="bottom">
      <div class="wrap_table rm_table">
        <table class="table table-striped table-striped fixed-width ">
          <!--<table class="table-data table-striped" cellspacing="0" cellpadding="0">-->
          <thead>
          <tr>
            <th width="3.36%">
              <input type="checkbox" id="checkbox-2-0" @click="selectAll"/><label for="checkbox-2-0"></label>
            </th>
            <th width="22.7%">资源名称</th>
            <th width="4.38%">版权</th>
            <th width="5.7%">作者</th>
            <th width="5.7%">上传者</th>
            <th width="8.36%">上传时间</th>
            <th width="6.53%">单价（元）</th>
            <th width="9.18%">累计收益（元）</th>
            <th width="4.5%">评分</th>
            <th width="5.7%">浏览量</th>
            <th width="5.7%">下载量</th>
            <th width="5.7%">状态</th>
            <th width="12.75%">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableList">
            <td>
              <input type="checkbox" :id="cbInputId+(index+1)" :data-value="item.id" :data-status="item.status"
                     @click="selectEach"/><label :for="cbInputId+(index+1)"></label>
            </td>
            <td>
              <a href="#" class="resourceNameLink" v-if="item.status == 2">{{item.resourceName}}</a>
              <span v-else>{{item.resourceName}}</span>
            </td>
            <td>{{item.copyright}}</td>
            <td>{{item.resourceMaker}}</td>
            <td>{{item.createUserName}}</td>
            <td>{{item.createDateTime}}</td>
            <td>{{item.cost}}</td>
            <td>{{item.accumEarnings}}</td>
            <td>{{item.score}}</td>
            <td>{{item.pageview}}</td>
            <td>{{item.downloads}}</td>
            <td>
              <span v-if="item.status == '1'">待发布</span>
              <span v-else-if="item.status == '2'">已发布</span>
              <span v-else>已下架</span>
            </td>
            <td>
                        <span>
                            <a href="#" class="enabledLink" v-if="item.status == 2"
                               @click="offMsg(item.id,'#alertbar')">下架</a>
                            <a href="#" class="disabledLink" v-else>下架</a>
                        </span>
                        <span>
                             <a :href="audioUrl+item.id" class="enabledLink" v-if="item.resourceFormatId == 9">编辑</a>
                             <a :href="documentUrl+item.id" class="enabledLink" v-else-if="item.resourceFormatId == 10">编辑</a>
                             <a :href="videoUrl+item.id" class="enabledLink"
                                v-else-if="item.resourceFormatId == 12">编辑</a>
                        </span>
                        <span>
                            <a href="#" class="enabledLink" v-if="item.status == 2 && item.isRecommend == 0"
                               @click="recommend(item.id,'#alertbar')">推荐</a>
                            <a href="#" class="enabledLink" v-else-if="item.status == 2 && item.isRecommend == 1"
                               @click="nonrecommend(item.id,'#alertbar')">取消推荐</a>
                            <a href="#" class="disabledLink" v-else>推荐</a>
                        </span>
            </td>
          </tr>
          </tbody>
        </table>

      </div>

      <div id="app" class="page">
        <div class="wrap_page_l">
          <button class="batch-remove-button" @click="batchDelete('#alertbar')" v-if="all!=0">批量删除</button>
          <button class="batch-off-button" @click="batchOff('#alertbar')" v-if="all!=0">批量下架</button>
          <div class="page_tips" v-if="all!=0">共{{total_count}}条记录,{{cur}}/{{all}}页</div>
        </div>
        <!--<vue-nav :total_count="total_count" :cur="cur" :all="all" v-on:btnclick="listens"></vue-nav>-->
      </div>
    </section>
  </article>
</template>
<style lang="scss">
  @import "../../static/css/base/min";
  @import "../../static/css/resource-manage";
  @import "../../static/css/plugins/jquery.datetimepicker.css";
</style>
<script>
    //import DateFormatter from 'dateFormatter';
    //import SelectBox from 'selectBox';
    export default{
        data(){
            return{
            priceAscClick: true,
            priceDescClick: true,
            gradeAscClick: true,
            gradeDescClick: true,
            downAscClick: true,
            downDescClick: true,
            browseAscClick: true,
            browseDescClick: true,
            cur: 1,
            all:0,
            total_count:100,
            page:'1',
            selectDataList: [],
            selectFirst: 11,
            selectSecond: 11,
            selectThird: 11,
            selectFourth: 11,
            searchInput: null,
            tableList: [],
            selectBoxUrl: "../../static/json/resource-dropdown.json",
            requestQueryList: "../../static/json/resource-check-list.json",
            currentTab: 1,
            cbInputId: "checkbox-1-0",
            cbIdList: [],
            cbStatusList: [],
            audioUrl: null,
            documentUrl: null,
            videoUrl: null,
            freeStat: null
        }
        },
        components:{
            //'vue-nav': Vnav
        },
        methods:{
            listens:function(data){
                var vm = this;
                vm.cur=data;
                vm.selectFirst = $("#selectbox1").val() || null;
                vm.selectSecond = $("#selectbox2").val() || null;
                vm.selectThird = $("#selectbox3").val() || null;
                vm.selectFourth = $("#selectbox4").val() || null;
                var params = {
                    toPage: vm.cur,
                    pageSize: 10,
                    phaseCode: vm.selectFirst,
                    subjectCode: vm.selectSecond,
                    versionCode: vm.selectThird,
                    volumesCode: vm.selectFourth,
                    startTime: $("#dates_start1").val() || null,
                    endTime: $('#dates_end1').val() || null,
                    uploadUser: ($("#allSelect").val() == 1)? vm.searchInput : null,
                    createUser:($("#allSelect").val() == 2)? vm.searchInput : null,
                    resourceName: ($("#allSelect").val() == 0)? vm.searchInput : null,
                    //sort:null,
                    sort:null,
                    isfree:vm.freeStat,
                    sortup:null,
                    status: vm.currentTab
                };
                 vm.requestTableList(params);
                // console.log(app.page);
            },
            resetSort: function(priceAsc,priceDesc,gradeAsc,gradeDesc,downAsc,downDesc,browseAsc,browseDesc){
                var vm = this;
                vm.priceAscClick = priceAsc;
                vm.priceDescClick = priceDesc;
                vm.gradeAscClick = gradeAsc;
                vm.gradeDescClick = gradeDesc;
                vm.downAscClick = downAsc;
                vm.downDescClick = downDesc;
                vm.browseAscClick = browseAsc;;
                vm.browseDescClick = browseDesc;
            },
            sortItems: function(msg,event){
                var obj = window.event.target;
                var vm = this;
                switch (msg){
                    case 'price':
                        if($(obj).hasClass("asc-enabled")){
                            vm.resetSort(false,true,true,true,true,true,true,true);
                            vm.sortAjaxData('price',1);
                        };
                        if($(obj).hasClass("desc-enabled")){
                            vm.resetSort(true,false,true,true,true,true,true,true);
                            vm.sortAjaxData('price',0);
                        };
                        break;
                    case 'grade':
                        if($(obj).hasClass("asc-enabled")){
                            vm.resetSort(true,true,false,true,true,true,true,true);
                            vm.sortAjaxData('score',1);
                        };
                        if($(obj).hasClass("desc-enabled")){
                            vm.resetSort(true,true,true,false,true,true,true,true);
                            vm.sortAjaxData('score',0);
                        };
                        break;
                    case 'download':
                        if($(obj).hasClass("asc-enabled")){
                            vm.resetSort(true,true,true,true,false,true,true,true);
                            vm.sortAjaxData('download',1);
                        };
                        if($(obj).hasClass("desc-enabled")){
                            vm.resetSort(true,true,true,true,true,false,true,true);
                            vm.sortAjaxData('download',0);
                        };
                        break;
                    case 'browse':
                        if($(obj).hasClass("asc-enabled")){
                            vm.resetSort(true,true,true,true,true,true,false,true);
                            vm.sortAjaxData('view',1);
                        };
                        if($(obj).hasClass("desc-enabled")){
                            vm.resetSort(true,true,true,true,true,true,true,false);
                            vm.sortAjaxData('view',0);
                        }
                        break;
                }
            },
            sortAjaxData: function(name,order){
                var vm = this;
                vm.selectFirst = $("#selectbox1").val() || null;
                vm.selectSecond = $("#selectbox2").val() || null;
                vm.selectThird = $("#selectbox3").val() || null;
                vm.selectFourth = $("#selectbox4").val() || null;
                var params = {
                    toPage: 1,
                    pageSize: 10,
                    phaseCode: vm.selectFirst,
                    subjectCode: vm.selectSecond,
                    versionCode: vm.selectThird,
                    volumesCode: vm.selectFourth,
                    startTime: $("#dates_start1").val() || null,
                    endTime:$('#dates_end1').val() || null,
                    uploadUser: ($("#allSelect").val() == 1)? vm.searchInput : null,
                    createUser:($("#allSelect").val() == 2)? vm.searchInput : null,
                    resourceName: ($("#allSelect").val() == 0)? vm.searchInput : null,
                    //sort:null,
                    sort:name,
                    isfree:vm.freeStat,
                    sortup:order,
                    status: vm.currentTab
                };
                 vm.requestTableList(params);
            },
            setDateTime: function(){
                //日期设置
                $.datetimepicker.setLocale('ch');
                $('#dates_start1').datetimepicker({
                    //yearOffset:222,
                    lang:'ch',
                    timepicker:false,
                    format:'Y-m-d',
                    formatDate:'Y-m-d',
                    onShow:function( ct ) {
                        this.setOptions({
                            maxDate: $('#dates_end1').val() ? $('#dates_end1').val() : false
                        })
                    }
                });
                $('#dates_end1').datetimepicker({
                    //yearOffset:222,
                    lang:'ch',
                    timepicker:false,
                    format:'Y-m-d',
                    formatDate:'Y-m-d',
                    onShow:function( ct ) {
                        this.setOptions({
                            minDate: $('#dates_start1').val() ? $('#dates_start1').val() : false
                        })
                    }
                });

            },
            initSelectBox: function(){
                $("select").selectBox();
                $(".first-select").css({
                    "max-width":"130px",
                    "width": "130px"
                });
                $(".second-select").css({
                    "max-width":"130px",
                    "width": "130px"
                });
                $(".third-select").css({
                    "max-width":"140px",
                    "width": "140px"
                });
                $(".fourth-select").css({
                    "max-width":"130px",
                    "width": "130px"
                });
                $(".allSelect").css({
                    "max-width":"120px",
                    "width": "120px"
                });
                $(".dropdown").css("display", "inline-block");
                $(".selectBox-label").css("width","auto");
                var vm = this;
                $.ajax({
                    url: vm.selectBoxUrl,
                    type: "GET",
                    dataType: 'json',
                    async: false
                }).done(function (result) {
                    $("#selectbox1").linkSelect({
                        secondId: "selectbox2",
                        thirdId: "selectbox3",
                        fourthId: "selectbox4",
                        number: 4
                    },result);
                    vm.selectFirst = $("#selectbox1").selectBox().value || null;
                    vm.selectSecond = $("#selectbox2").selectBox().value|| null;
                    vm.selectThird = $("#selectbox3").selectBox().value|| null;
                    vm.selectFourth = $("#selectbox4").selectBox().value|| null;
                });

            },
            requestTabData: function(value){
                var vm = this;
                vm.currentTab = value;
                vm.freeStat = null;
                var params = {
                    toPage: 1,
                    pageSize: 10,
                    status:value
                    //phaseCode: vm.selectFirst,
                    //subjectCode: vm.selectSecond,
                    //versionCode: vm.selectThird,
                    //volumesCode: vm.selectFourth,
                    //startTime: $("#dates_start1").val() || null,
                    //endTime:$('#dates_end1').val() || null,
                    //uploadUser: ($("#allSelect").selectBox().value == 1)? vm.searchInput : null,
                    //createUser:($("#allSelect").selectBox().value == 2)? vm.searchInput : null,
                    //sort:null,
                    //isfree:null,
                    //sortup:1,
                    };
                 vm.resetSort(true,true,true,true,true,true,true,true);
                 vm.requestTableList(params);
            },
            requestSearchData: function(){
                var vm = this;
                vm.selectFirst = $("#selectbox1").val() || null;
                vm.selectSecond = $("#selectbox2").val() || null;
                vm.selectThird = $("#selectbox3").val() || null;
                vm.selectFourth = $("#selectbox4").val() || null;
                var params = {
                    toPage: 1,
                    pageSize: 10,
                    phaseCode: vm.selectFirst,
                    subjectCode: vm.selectSecond,
                    versionCode: vm.selectThird,
                    volumesCode: vm.selectFourth,
                    startTime: $("#dates_start1").val() || null,
                    endTime:$('#dates_end1').val() || null,
                    uploadUser: ($("#allSelect").val() == 1)? vm.searchInput : null,
                    createUser:($("#allSelect").val() == 2)? vm.searchInput : null,
                    resourceName: ($("#allSelect").val() == 0)? vm.searchInput : null,
                    //sort:null,
                    //isfree:null,
                    //sortup:1,
                    status: vm.currentTab
                };
                vm.resetSort(true,true,true,true,true,true,true,true);
                 vm.requestTableList(params);
            },
            filterFree: function(){
                var vm = this;
                vm.selectFirst = $("#selectbox1").val() || null;
                vm.selectSecond = $("#selectbox2").val() || null;
                vm.selectThird = $("#selectbox3").val() || null;
                vm.selectFourth = $("#selectbox4").val() || null;
                vm.freeStat = 0;
                var params = {
                    toPage: 1,
                    pageSize: 10,
                    phaseCode: vm.selectFirst,
                    subjectCode: vm.selectSecond,
                    versionCode: vm.selectThird,
                    volumesCode: vm.selectFourth,
                    startTime: $("#dates_start1").val() || null,
                    endTime: $('#dates_end1').val() || null,
                    uploadUser: ($("#allSelect").val() == 1)? vm.searchInput : null,
                    createUser:($("#allSelect").val() == 2)? vm.searchInput : null,
                    resourceName: ($("#allSelect").val() == 0)? vm.searchInput : null,
                    //sort:null,
                    sort:null,
                    isfree:vm.freeStat,
                    sortup:null,
                    status: vm.currentTab
                };
                 vm.requestTableList(params);
            },
            requestTableList: function(params){
                var vm = this;
                $.ajax({
                    url: vm.requestQueryList,
                    type: "GET",
                    data: params,
                    dataType: 'json',
                    async: false
                }).done(function (result) {
                    vm.tableList = result.rows;
                    vm.total_count = result.total_count;
                    vm.cur = result.cur_page;
                    vm.all = result.page_count;
                });
            },
            offMsg: function(id,obj) {
                $(obj).attr("data-id","");
                $(".warn").html("是否确认下架该资源");
                $(".confirmbtn").attr("onclick","confirmDel(6)");
             //sendMsg_center(id,obj);
            },
            recommend: function(id,obj) {
                $(".warn").html("是否确认推荐该资源");
                $(".confirmbtn").attr("onclick","confirmDel(8)");
                $(obj).attr("data-id","");
             //sendMsg_center(id,obj);
            },
            nonrecommend: function(id,obj) {
                $(".warn").html("是否确认取消推荐");
                $(".confirmbtn").attr("onclick","confirmDel(9)");
                $(obj).attr("data-id","");
             //sendMsg_center(id,obj);
            },
            batchDelete: function(obj){
                var vm = this;
                vm.cbIdList = [];
                vm.cbStatusList = [];
                    $('[id^="checkbox-1-"]').each(function(){

                        var self = $(this);
                        if(self.prop("checked")){
                            vm.cbIdList.push(self.data("value"));
                            vm.cbStatusList.push(self.data("status"));
                        }
                    });
                  //  console.log(vm.cbIdList);
                if(vm.cbIdList.length==0){
                    $(".hint").html("所选项不能为空");
                    //openAlertWin();
                    return;
                }
                // 判断是否满足删除条件
                for(var i= 0,len=vm.cbStatusList.length;i<len;i++){
                    var sta = vm.cbStatusList[i];
                    if(sta == 2){
                        $(".hint").html("所选项中不能包含已发布资源");
                        //openAlertWin();
                        return;
                    }
                }

                // 执行删除操作
                $(obj).attr("data-id","");
                $(".warn").html("是否确认批量删除");
                $(".confirmbtn").attr("onclick","confirmDel(12)");
                //sendMsg_center(vm.cbIdList,obj);

            },
            batchOff: function(obj){
                var vm = this;
                vm.cbIdList = [];
                vm.cbStatusList = [];
                $('[id^="checkbox-1-"]').each(function(){

                    var self = $(this);
                    if(self.prop("checked")){
                        vm.cbIdList.push(self.data("value"));
                        vm.cbStatusList.push(self.data("status"));
                    }
                });
                if(vm.cbIdList.length==0){
                    $(".hint").html("所选项不能为空");
                    //openAlertWin();
                    return;
                }
                // 判断是否满足下架条件
                for(var i= 0,len=vm.cbStatusList.length;i<len;i++){
                    var sta = vm.cbStatusList[i];
                    if(sta != 2){
                        $(".hint").html("所选项中不能包含待上架资源和已下架资源");
                        //openAlertWin();
                        return;
                    }
                }
                // 执行下架操作
                $(obj).attr("data-id","");
                $(".warn").html("是否确认批量下架");
                $(".confirmbtn").attr("onclick","confirmDel(11)");
                //sendMsg_center(vm.cbIdList,obj);
            },
            leftOperations: function(){
                var vm = this;
                //tab
                $(".choose-tabs .default-tab").click(function () {
                    $(".choose-tabs .default-tab").removeClass("active-tab");
                    $(this).addClass("active-tab");
                });
                //checkbox
                vm.cbInputId = "checkbox-1-";
                //edit Url forward
                var searchEntry = "?resource_id=";
                vm.audioUrl = "resource-audio.html" + searchEntry;
                vm.documentUrl = "resource-docum.html" + searchEntry;
                vm.videoUrl =  "resource-video.html" + searchEntry;
            },
            selectAll: function () {
                if($('[id^="checkbox-2-0"]').prop("checked")){
                    $('[id^="checkbox-1-"]').prop("checked",true);
                }else{
                    $('[id^="checkbox-1-"]').prop("checked",false);
                }
            },
            selectEach: function() {
                $('[id^="checkbox-2-0"]').prop("checked",false);
            }
        },
        mounted: function(){
            var vm = this;
            vm.leftOperations();
            vm.setDateTime();
            vm.initSelectBox();
            vm.requestTabData(0);
        }
    }

</script>
