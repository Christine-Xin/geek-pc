import {makeAutoObservable} from 'mobx'
class CounterStore {
    // 定义数据
    count=0
    list=[1,2,3,4,5,6]
    constructor(){
        // 响应式处理
        makeAutoObservable(this)
    }

    addCount=()=>{
        // 定义action函数
        this.count++
    }

    // 定义计算属性
    get filterList(){
        return this.list.filter(item=>item>2)
    }
    // 方法修改list
    addList=()=>{
        this.list.push(7,8,9)
    }
}
const counterStore=new CounterStore()
export default counterStore;