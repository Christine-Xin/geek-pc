// 高阶组件：把一个组件当作另一个组件的参数传入，然后通过一定的判断，返回新的组件
import {getToken} from '@/utils'
import {Navigate} from 'react-router-dom'
function AuthComponent ({children}){
    const isToken =getToken()
    if(isToken){
        return <>{children}</>
    }else{
        console.log(1111)
        return <Navigate to="/login" replace/>
    }
}
export {AuthComponent} 