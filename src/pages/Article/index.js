// 内容管理
import './index.scss'
import { Breadcrumb, Card, Form, Input,Button, Checkbox, Radio, Select,DatePicker, Table, Space,} from 'antd';
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import img404 from '../../assets/error.png'
import { useEffect, useState } from 'react';
import { http } from '@/utils';
import {useNavigate} from 'react-router-dom'

const { RangePicker } = DatePicker;
const {Option} = Select

const Article=()=>{
    // 频道列表管理
    const [channelList, setChannelList] = useState([])
    const LoadChannelList=async ()=>{
        const res= await http.get('/channels')
        setChannelList(res.data.channels)
    }
    useEffect(()=>{
        LoadChannelList()
    },[])
    // 文章列表管理
    const [articleData, setArticleData] = useState({
        list:[], //文章列表
        count:0, //文章数量
    })
    // 文章参数管理
    const [params,setParams]=useState({
        page:1,
        per_page:10
    })
    /**
     * 如果异步请求函数需要依赖一些数据得变化而重新执行
     * 推荐把它写在useEffect内部
     * 统一不抽离函数到外面，只要涉及到异步请求得函数，都放在useEffect内部
     */
    useEffect(()=>{
        const loadList=async ()=>{
            const res=await http.get('/mp/articles',{params})
            console.log('文章列表',res)
            setArticleData({
              list:res.data.results,
              count:res.data.total_count,
            })
        }
        // 调用请求接口
        loadList()
    },[params])

    const onFinish=(values)=>{
        console.log(values)
        const {channel_id,status, date}=values
        // 参数处理
        const params1={}
        if(status!==-1){
          params1.status=status
        }
        if(channel_id){
          params1.channel_id=channel_id
        }
        if(date){
          params1.begin_pubdate=date[0].format('YYYY-MM-DD')
          params1.end_pubdate=date[1].format('YYYY-MM-DD')

        }
        setParams({
          ...params,
          ...params1
        })
    }
    // 
    const pageChange=(page)=>{
      setParams({
        page:page,
        ...params,

      })
    }
    const formatStatus=()=>{

    }
    const navigate=useNavigate()
    // 跳转到编辑
    const goPublish=(data)=>{
      navigate(`/publish?id=${data.id}`)
    }
    // 删除
    const delArticle=async (data)=>{
      console.log(data)
      await http.delete(`/mp/articles/${data.id}`)
      setParams({
        ...params,
        page:1
      })
    }
    const columns = [
        {
          title: '封面',
          dataIndex: 'cover',
          width: 120,
          render: cover => {
            return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
          }
        },
        {
          title: '标题',
          dataIndex: 'title',
          width: 220
        },
        {
          title: '状态',
          dataIndex: 'status',
          render: data => formatStatus(data)
        },
        {
          title: '发布时间',
          dataIndex: 'pubdate'
        },
        {
          title: '阅读数',
          dataIndex: 'read_count'
        },
        {
          title: '评论数',
          dataIndex: 'comment_count'
        },
        {
          title: '点赞数',
          dataIndex: 'like_count'
        },
        {
          title: '操作',
          render: data => {
            return (
              <Space size="middle">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => goPublish(data)} />
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => delArticle(data)}
                />
              </Space>
            )
          },
          fixed: 'right'
        }
    ]
      const dataSource = [
        {
          cover: {
            images:[]
          },
          title: '胡彦斌',
          status: 'Y',
          pubdate: '2022-08-01',
          read_count:10,
          comment_count:10,
          like_count:10
        }
      ];
    return (
        <div>
            {/* 面包屑 */}
          
            <Card title={
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>内容</Breadcrumb.Item>
                    <Breadcrumb.Item>文章</Breadcrumb.Item>
                </Breadcrumb>
            }>
                <Form 
                    onFinish={onFinish}
                    initialValues={{ status: -1 }}
                    >
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={-1}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                            <Radio value={3}>审核失败</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="频道" name="channel_id">
                        <Select placeholder="请选择" allowClear>
                            {
                                channelList.map(channel => 
                                    <Option value={channel.id} key={channel.id}>{channel.name}</Option>
                                )
                            }
                            
                        </Select>
                    </Form.Item>
                    <Form.Item label="日期" name="date">
                        <RangePicker />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit">筛选</Button>
                    </Form.Item>
                </Form>
            </Card>
            {/* 列表 */}
            <Card title={`根据筛选条件共查询到 ${articleData.count} 条结果`}>
                <Table 
                  dataSource={articleData.list} 
                  columns={columns}
                  rowKey="id"
                  pagination={
                    {
                      pageSize:params.per_page,
                      total:articleData.count,
                      onChange:pageChange
                    }
                  }
                  ></Table>
            </Card>
        </div>
    )
}
export default Article;