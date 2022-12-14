import './index.scss'
import  * as echarts from 'echarts'
import {useEffect, useRef} from 'react'
import Bar from '@/components/Bar'
/**
 * 1：把echarts加入项目
 * 如何在react中获取dom节点-》useRef
 * 在什么地方获取dom节点-》useEffect
 * 2:不抽离定制化得参数
 */
const Home=()=>{
   
    return (
        <div>
            <Bar 
                title='主流框架使用满意度' 
                xData={['react','vue','angular']}
                yData={[30,40,50]}
                style={{width:'500px',height:'500px'}}
            />
        </div>
    )
}
export default Home;