import React, { useState, useEffect } from "react";
import { Layout, Menu, Avatar } from "antd";
import { SelectParam } from "antd/lib/menu";
import { BellOutlined, MailOutlined } from "@ant-design/icons";
import { history } from "@/router";
import HeaderSearch from "./search";
import HeaderCreate from "./create";
import "./index.css";

const { Header } = Layout;

function NavHeader(props: any) {
  const defaultKey = history.location.pathname;

  const headSelect = (data: SelectParam) => {
    history.push(data.key);
  };

  return (
    <Layout>
      <Header className="glob-header">
        <div>
          <Menu
            theme="dark"
            mode="horizontal"
            onSelect={headSelect}
            defaultSelectedKeys={[defaultKey]}
          >
            <Menu.Item key="/">需求</Menu.Item>
            <Menu.Item key="/bug">缺陷</Menu.Item>
            <Menu.Item key="/docs">文档</Menu.Item>
            <Menu.Item key="/api">接口</Menu.Item>
            <Menu.Item key="/log">日志</Menu.Item>
            <Menu.Item key="/project">项目</Menu.Item>
            <Menu.Item key="/workbench">我的工作台</Menu.Item>
          </Menu>
        </div>
        <div className="header-operating">
          <HeaderSearch className="header-operating-item" />
          <HeaderCreate className="header-operating-item" />
          <BellOutlined className="header-icon header-operating-item" />
          <MailOutlined className="header-icon header-operating-item" />
          <Avatar className="header-operating-item">USER</Avatar>
        </div>
      </Header>
    </Layout>
  );
}

export default NavHeader;
