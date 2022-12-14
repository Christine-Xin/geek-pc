// 封装图表bar组件
import  * as echarts from 'echarts'
import {useEffect, useRef} from 'react'
function Bar({title , xData, yData, style}){
    const domRef=useRef()
    const chartInit = ()=>{
        const myChart=echarts.init(domRef.current)
        myChart.setOption({
            title: {
              text: title
            },
            tooltip: {},
            xAxis: {
              data: xData
            },
            yAxis: {},
            series: [
              {
                name: '销量',
                type: 'bar',
                data: yData
              }
            ]
          });
    }
    // 执行这个初始化得函数
    useEffect(()=>{
        chartInit()
    },[])
    return (
        <div>
            <div ref={domRef} style={style}>
            </div>
        </div>
    )
}

export default Bar;