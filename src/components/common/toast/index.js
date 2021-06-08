import Toast from './Toast'

const obj = {}

  obj.install = function (createApp){
    // console.log('执行install')
    // document.body.appendChild(Toast, $el)
    //1.创建组件构造器
    console.log(obj)
    const toastContrustor = createApp.extend(Toast)
    //2.new的方式，根据组件构造器，可以创建一个组件对象
    const toast = new toastContrustor()
    //3.将组件对象手动挂载到某一元素
    toast.$mount(document.createElement('div'))
    //4.toast.$el对应就是div
    document.body.appendChild(toast.$el)

    createApp.prototype.$toast = Toast;
  }
export default obj