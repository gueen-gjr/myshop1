一，featureView
  独立组件封装featureView
    div>a>img
  
二，tabControl
  独立组件的封装
    props->titles
    div>根据titles v-for遍历 div -> span{{titles}}
    css相关布局
    选中哪个tab，哪一个文字就变色，下面border-bottom
      currentindex

三，首页商品数据请求
  3.1设计数据结构，用于保存数据
    goods：{
      pop：page/list
      new：page/list
      sell：page/list
    }
  3.2发送数据请求
    在home.js 中封装getHomeGoods
    在home.vue中,又在methods中getHomeGoods(type)
    调用getHomeGoods('pop'),getHomeGoods('new'),getHomeGoods('sell')
      page:动态获取对应的page
    获取到数据：res
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page += 1
四，对商品数据进行展示
  4.1封装GoodsList.vue组件
    props：goods.pop -> list[30]
    v-for goods -> GoodsListItem
    GoodsListItem（组件） -> GoodsItem（数据）
  4.2封装GoodsListItem.vue组件
    props：goodsItem
    goodsItem 取出数据，并且使用正确的div/img标签进行展示
五，对滚动进行重构 better-scroll
  5.1 在index.html 中使用better-scroll
    const bscroll = new BScroll(el,{})
    注意：wrapper -> content -> 很多内容
    1.监听滚动
      probeType：0/1/2（手指滚动）/3（只要是滚动就监听）
      bscroll.on('scroll',(position) => {})
    2.上拉加载
      pullUpLoad：true
      bscroll.on('pullingUp', () => {})
    3.click：false
      button可以监听点击
      div不可以监听
  5.2在vue项目中使用better-scroll
    在profile中进行简单演示
    对better-scroll进行封装：scroll.vue
    home.vue 和 scroll.vue之间进行通信
      home.vue 把 pubeType 设置为3
      Scroll.vue需要通过$emit，实时将事件发送到Home.vue
六，回到顶部BackTop
  6.1 对backTop组件的封装
  6.2 如何监听组件的点击
    直接监听back--top的点击，但是可以直接监听？
      不可以，必需添加修饰符 .native
    回到顶部
      scroll对象，scroll.scrollTo(x,y,time)
        this.$refs.scroll.scrollTo(0,0,500)
  6.3 back-top 组件的显示隐藏
    isshowBackTop:false
    监听滚动，拿到滚动的位置：
      positon.y >1000 -> isshowBackTop:true
      isShowBackTop = -position > 1000
七，解决首页可滚动区域问题
  observeDOM:true,
  observeImage:true,
八，tabControl的吸顶效果
  8.1 获取tabControl的offsetTop
    必须知道滚动到多少时，开始有吸顶效果,这个时候就需要获取tabControl的offsetTop
    但是，如果直接在mounted中获取tabControl的offsetTop，那么值是不正确的
    如何获取正确值
      监听homeswiper中img的加载完成
      加载完成后吗，发出事件，在home.vue中获取正确的值
      补充：
        为了不多次发出事件，可以使用isLoad的变量进行状态记录
  8.2监听滚动，动态的改变tabControl的样式
    问题动态的改变tabControl的样式时，会出现两个问题
      一，下面的商品内容会突然上移
      二，tabcontrol虽然设置了fixed，但是也随着   better-scroll一起滚出去了
    方案解决问题
      在最上面复制一份tabcontrol组件对象，利用他来实现停留效果
      当用户滚动到一定位置时，placeHoldertabcontrel显示出来
      当用户滚动没达到指定位置时，隐藏起来
  九，让home保持原来的位置
    离开时保存一个位置信息
    进来时将其设置为原来保存位置saveY信息即可
