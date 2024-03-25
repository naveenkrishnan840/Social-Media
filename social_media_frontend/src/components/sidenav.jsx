import React, {useState} from 'react';
import {Layout, Menu} from 'antd';
import ArrowRightOutlined from "@ant-design/icons";

const {Sider} = Layout;

function SideNav() {
  const [collapse, setCollapse] = useState(false);
  return (
    <>
      <Sider collapsed={collapse} onCollapse={(value)=>setCollapse(value)}>
      <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
          >
            <Menu.Item><ArrowRightOutlined/></Menu.Item>
            <Menu.Item><ArrowRightOutlined/> {"Fovirote Movies"}</Menu.Item>
          </Menu>
      </Sider>
    </>
  )
}

export default SideNav;