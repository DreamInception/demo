<template>
  <div class="header clearfix">
    <!--<div class="logorht">-->
    <!--<div class="headlist">-->
    <!--<ul>-->
    <!--<li class="name"><a href="#">退出</a></li>-->
    <!--<li class="help"><a href="#">管理员</a></li>-->
    <!--&lt;!&ndash;<li class="message"><a href="box.html" target="right">消息</a></li>&ndash;&gt;-->
    <!--</ul>-->
    <!--</div>-->
    <!--</div>-->
    <div class="logo"><img src="static/images/nav/logo.png" alt=""/></div>
    <div class="headlist">
      <ul>
        <li class="name"><a href="#">欢迎您，<span>{{userJson.username}}</span></a></li>
        <li class="change">
          <!--<a href="login-updatepassword.html">修改</a>-->
          <router-link to="login-updatepassword.html">修改</router-link>
        </li>
        <li class="quit"><a href="#"></a></li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss">
  @import "../../static/css/base/min.scss";

  .header {
    width: 100%;
    height: 65px;
    position: absolute;
    background: $mainColor;
    z-index: 999;
    left: 0;
    top: 0;
    clear: both;
  }

  .logo {
    float: left;
    padding: 15px 0 0 35px;
  }

  .headlist {
    float: right;

  li {
    float: left;
    padding-right: 20px;
    line-height: 65px;
    color: $whiteColor;

  a {
    color: $whiteColor;
  }

  }
  li.quit {
    width: 64px;
    height: 65px;
    background: $quitColor url(../../static/images/nav/quit.png) no-repeat center;
    cursor: pointer;

  a {
    height: 100%;
    width: 100%;
    display: block;
  }

  }
  }
  .logorht {
    height: 30px;


  li {
    float: right;
    text-align: center;
    padding-right: 10px;

  span {
    float: left;
    display: block;
    height: 30px;
    line-height: 25px;
    margin: 25px 0;
  }

  a {
    display: block;
    float: left;
    line-height: 30px;
    padding-left: 26px;
    color: $fontColor;

  &
  :hover {
    color: $mainColor;
  }

  }
  }
  }

</style>
<script>
  export default{
    data: function () {
      return {
        userJson: {username: '京师讯飞'}
      }
    }
  }
</script>


