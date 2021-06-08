<template>
  <div class="botton-bar">
    <div class="check-content">
      <check-button 
        :is-checked="isSelectAll" 
        class="check-button" 
        @click.native="checkClick" />
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{totalPrice}}
    </div>
    <div class="calculate">
      去计算:({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex';

export default {
  name:"CartButtonBar",
  components:{
    CheckButton
  },
  methods: {
    checkClick(){
      if(this.isSelectAll){//全部选中
        this.cartList.forEach(item => item.checked = false)
      }else{//部分或全部不选中
        this.cartList.forEach(item => item.checked = true)
      }
      // this.cartList.forEach(item => item.checked = !this.isSelectAll)
    }
  },
  computed:{
    ...mapGetters(['cartList']),

    totalPrice(){
      console.log(this.$store)
      return "￥" + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
      checkLength(){
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
      if(this.cartList.length === 0) return false
      //1.用filter
      // return !(this.cartList.filter(item => !item.checked).length)
      //2.用find
      // return !this.cartList.find(item => !item.checked)
      //3.普通遍历
      // let isCherced = false;
      for (let item of this.cartList){
        if(!item.checked){
          return false
        }
      }
      return true
    }
  }
}
</script>

<style scoped>
  .botton-bar{
    position: relative;
    display: flex;

    height: 40px;
    background: #eee;
    line-height: 40px;

  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price{
    margin-left: 20px;
    flex: 1;
  }
  .calculate{
    width: 90px;
    background-color: red;
    color: #eee;
    text-align: center;
  }
</style>