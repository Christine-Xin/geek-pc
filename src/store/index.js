import LoginStore from "./login.Store"
import UserStore from './user.Store'
import ChannelStore from './channel.Store'
import React from 'react'
class RootStore {
    constructor(){
        this.loginStore=new LoginStore()
        this.userStore=new UserStore()
        this.channelStore=new ChannelStore()
    }
}
// 实例化操作
const rootStore= new RootStore()
/**
 * 使用reactcontext完成统一方法封装
 * provider value={传递的数据}
 * 查找机制：useContext优先从provider value找，如果找不到就会找
 * creactcontext方法传递过来的默认参数
 */
const context= React.createContext(rootStore)
/**
 * 这个方法作用：通过usecontext拿到rootstore实例对象，然后返回
 * 只要在业务组件中调用useStore()->rootstore
 */
const useStore =()=>React.useContext(context)
 export {useStore}