import { Button, Layout, Menu, Popconfirm } from "antd";
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined
} from "@ant-design/icons";
import "./index.scss";
import React from "react";
import {useStore} from '@/store'
import { useEffect } from "react";
import {observer} from 'mobx-react-lite'; // store与react视图连接，当store发生改变时，视图也对应改变

const { Header, Sider } = Layout;


const GeekLayout = () => {
    // 从用户store引出用户信息store和登录信息store
    const {userStore,loginStore, channelStore}=useStore()
    // 函数副作用：请求ajax请求
    useEffect(()=>{
        // 获取用户信息
        userStore.getUserInfo()
        // 获取频道下拉框
        channelStore.loadChannelList()
    },[userStore, channelStore])
    // 退出确认
    const navigate=useNavigate()
    const onConfirm=()=>{
        /**
         * 退出登录：1：删除token 2:返回登录
         */
         loginStore.loginOut()
         navigate('/login')
    }
    const location=useLocation().pathname
  return (
    <Layout>
      <Header className="header">
        <div className="logo"></div>
        <div className="user-info">
            <span className="user-name">{userStore.userInfo.name}</span>
            <span className="user-logout">
                <Popconfirm
                    onConfirm={onConfirm}
                    okText="确定"
                    cancelText="取消"
                    title="是否确认退出？" 
                >
                    <LogoutOutlined /> 退出
                </Popconfirm>
            </span>
        </div>
      </Header>
      <Layout>
        <Sider className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[location]}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
                {/* 跳转得控件 link */}
              <Link to="/">数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/article">
              <Link to="/article">内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/publish">
              <Link to="/publish"> 发布文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default observer(GeekLayout)
