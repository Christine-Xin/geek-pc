import {makeAutoObservable} from 'mobx'
import {http, getToken, setToken, removeToken} from '@/utils'
class LoginStore {
    token=getToken() || ''
    constructor(){
        // 响应式
        makeAutoObservable(this)
    }
    getToken=async ({mobile,code})=>{
        const res=await http.post('http://geek.itheima.net/v1_0/authorizations',{
            mobile,code
        })
        this.token=res.data.token
        setToken(this.token)
    }
    loginOut=()=>{
        this.token=""
        removeToken()
    }
}

export default LoginStore