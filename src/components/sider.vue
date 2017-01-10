<template>
  <div :class="[{'switch':navChange}]">
    <div>
      <ul class="navList">
        <li v-for="item in listData"><a :href="item.url" target="right"><span><img :src="item.bgImage"></span>{{item.name}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss">
  @import "../../static/css/base/min.scss";

  .maincontent {
    width: 100%;
    margin-top: 65px;
    background: $bg;
  }

  .navList {

  li {
    display: block;
    height: 50px;
    line-height: 50px;
    text-align: left;
    border-bottom: 1px solid $borderColor;
    cursor: pointer;
    font-size: 14px;

  a {
    width: 75%;
    display: inline-block;
    padding-left: 25%;
  }

  span {

  img {
    float: left;
    margin-top: 17px;
    margin-right: 10px;
  }

  }
  &
  :hover,

  &
  .selectedNav {
    background: $navHover;
  }

  }
  }
  .shown {
    display: block !important;
  }

  .arrow {
    width: 10px;
    height: 50px;
    background: $mainColor;
    position: absolute;
    top: 50%;
    left: -10px;
    margin-top: -25px;
    z-index: 999;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    line-height: 50px;
    font-family: "SimSun";
    text-align: center;
    color: #fff;
    cursor: pointer;

  &
  :hover {
    opacity: 0.85;
  }

  }
  .switch {

  .left {
    display: none;
  }

  .right {
    margin-left: 10px;
  }

  }
  .small_width {
    max-width: 120px;
  }

  .shown {
    display: block;
  }
</style>
<script>
  import Order from '../page/order'
  export default{
    data()
  {
    return {
      msg: 'hello vue',
      navChange: false,
      toggleArrow: '&lt;',
      listData: [
        {
          "name": "资源管理",
          "isShow": 1,
          "bgImage": "../../static/images/nav/left0.png",
          "url": "resource-manage.html",
          "subnav": []
        },
        {
          "name": "用户管理",
          "isShow": 1,
          "bgImage": "../../static/images/nav/left1.png",
          "url": "user_manage.html",
          "subnav": []
        },
        {
          "name": "评论管理",
          "isShow": 1,
          "bgImage": "../../static/images/nav/left2.png",
          "url": "comment-manage.html",
          "subnav": []
        },
        {
          "name": "字典管理",
          "isShow": 1,
          "bgImage": "../../static/images/nav/left3.png",
          "url": "electronic-hotWord.html",
          "subnav": []
        },
        {
          "name": "系统管理",
          "isShow": 1,
          "bgImage": "../../static/images/nav/left4.png",
          "url": "box.html",
          "subnav": []
        },
        {
          "name": "推荐管理",
          "isShow": 1,
          "bgImage": "../../static/images/nav/left5.png",
          "url": "recommend.html",
          "subnav": []
        },
        {
          "name": "订单管理",
          "isShow": 1,
          "bgImage": "../../static/images/nav/left6.png",
          "url": "order.html",
          "subnav": []
        }
      ]
    }
  }
  ,
  methods: {
    arrowChange: function () {

      if (this.navChange) {
        this.toggleArrow = '&gt';
      } else {
        this.toggleArrow = '&lt';
      }
    },

    initNav: function () {
      $.ajax({
        url: "json/nav.json",
        type: "get",
        dataType: "json"
      }).done(function (data) {
        var listData = data.data.menuList;
        new Vue({
          el: ".navList",
          data: {
            listData: listData
          }
        });
        $(".navList").on("click", "li", function () {
          $(".navList").find("li").removeClass("selectedNav");
          $(this).addClass("selectedNav");
        });

      });
    },
    initpage: function() {
      var height = document.body.clientHeight || document.documentElement.clientHeight,
        header_height = document.getElementsByClassName("header").offsetHeight,
        cal_height = height-header_height+10;
      document.getElementsByClassName("maincontent").offsetHeight = cal_height;
      document.getElementsByClassName("left").offsetHeight = cal_height;
      document.getElementsByClassName("right").offsetHeight = cal_height;
    }
  },
  watch: {

  },
  components: {

  },
  computed: {

  },
  mounted: function() {
    this.initpage();

  }
  }
</script>
