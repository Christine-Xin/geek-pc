import './index.scss'
import {Card,Breadcrumb,Button, Checkbox, Form, Input, Space, Radio, Select, Upload, message} from 'antd'
import {
    PlusOutlined
} from "@ant-design/icons";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {observer} from 'mobx-react-lite'
import { useStore } from '@/store';
import { useEffect, useRef, useState } from 'react';
import { http } from '@/utils';
import { useNavigate, useSearchParams } from 'react-router-dom';
const { Option } = Select
function Publish(){
    const {channelStore} = useStore()
    // 提交表单
    const navigate=useNavigate()
    const onFinish=async (values)=>{
        console.log(values)
        const {channel_id,content,title,type}=values
        const params={
            channel_id,
            content,
            title,
            type,
            cover:{
                type:type,
                images:fileList.map(item=> item.url)
            }
        }
        console.log(params)
        if(id){
            await http.put(`/mp/articles/${id}?draft=false`,params)
        }else{
            await http.post('/mp/articles?draft=false',params)
        }
        
        // 跳转列表，提示用户
        navigate('/article')
        message.success('发布成功')
    }
    // 使用useRef声明一个暂存仓库
    const cacheImgList=useRef()

    // 图片列表
    const [fileList,setFileList]=useState([])
    const onUploadChange=({fileList})=>{
        console.log(fileList)
        setFileList(fileList)
        // 同时把图片列表存入仓库一份,需要做数据格式化
        const formatList=fileList.map(file=>{
            if(file.response){
                return {
                    url:file.response.data.url
                }
            }
            return file
        })
        cacheImgList.current=formatList
    }
    // 切换图片
    const [imgCount,setImgCount]= useState(1)
    const radioChange=(e)=>{
        console.log(e.target.value)
        const rawValue=e.target.value
        setImgCount(e.target.value)
        // 从仓库里面取对应的图片数量， 交给filelist
        if(rawValue===1){
            const img=cacheImgList.current?cacheImgList.current[0]:[]
            setFileList([img])
        }else if(rawValue===3){
            setFileList(cacheImgList.current)
        }
    }
    // 编辑功能：文案适配
    const [params]=useSearchParams()
    const id=params.get("id")
    console.log(id)
    // 数据回显：1：表单回显 2：暂存列表 3：upload组件filelist
    const form=useRef(null)
    useEffect(()=>{
        const loadDetail=async ()=>{
            const res = await http.get(`/mp/articles/${id}`)
            console.log(res)
            form.current.setFieldsValue({...res.data,type:res.data.cover.type})
            setFileList(res.data.cover.images.map(url=>{
                return {
                    url:url
                }
            }))
            // 暂存列表:暂存列表和filelist回显列表数据结构保持一致
            cacheImgList.current=res.data.cover.images.map(url=>{
                return {
                    url:url
                }
            })
        }
        if(id){
            loadDetail()
        }
        
    },[id])
    return (
        <div>
            <Card
             title={
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>{id?'编辑':'发布'}文章</Breadcrumb.Item>
                </Breadcrumb>
             }
            >
                <Form
                    onFinish={onFinish}
                    ref={form}
                >
                    <Form.Item label="标题" name="title" rules={[{required:true,message:'请输入文章标题'}]}>
                        <Input placeholder='请输入文章标题' style={{width:400}}/>
                    </Form.Item>
                    <Form.Item label="频道" name="channel_id" rules={[{ required: true, message: '请选择文章频道' }]}>
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {channelStore.channelList.map(item=>(
                                <Option value={item.id} key={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                        
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={radioChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                       {imgCount>0 && (
                             <Upload
                             listType="picture-card"
                             name='image'
                             className='avatar-uploader'
                             showUploadList
                             action='http://geek.itheima.net/v1_0/upload'
                             fileList={fileList}
                             onChange={onUploadChange}
                             multiple={imgCount>1}
                             maxCount={imgCount}
                             >
                             <div>
                                 <PlusOutlined />
                                 <div style={{ marginTop: 8 }}>Upload</div>
                             </div>
                         </Upload>
                       )}
                       
                    </Form.Item>
                    <Form.Item label="内容" name="content">
                        {/* <ReactQuill theme='snow' /> */}
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4 }}>
                      <Space>
                        <Button type='primary' htmlType='submmit'>{id?'更新':'发布'}文章</Button>
                      </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
export default observer(Publish);