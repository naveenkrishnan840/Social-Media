import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    ArrowRightOutlined, LogoutOutlined
  } from '@ant-design/icons';
import {Route, Link, Switch} from "react-router-dom";  
import { Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import ListOfAllUsers from "./list_of_all_users";
import RequestStatus from "./request_status";
import CurrentUsrStatus from "./curr_usr_fri_status";
import {connect} from "react-redux";
const { Header, Sider, Content } = Layout;

const mapStateToProps = (state) => ({
  email_id: state.email_id
});
const HeaderPage = ({email_id}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    height: "100%"
  };
  return (
    <Layout style={layoutStyle}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['2']}
          items={[
            {
              key: '1',
              icon: "",
              label: "", 
            },
            {
              key: '2',
              icon: <ArrowRightOutlined/>,
              label: <Link to="/home">Users</Link>, 
            },
            {
              key: '3',
              icon: <UserOutlined />,
              label: <Link to="/friend-request">Friend Request</Link>,  
            },
            {
              key: '4',
              icon: <UserOutlined />,
              label: <Link to="/request-status">Request Status</Link>,  
            },
            {
              key: '5',
              icon: <UserOutlined />,
              label: email_id,  
            },
            {
              key: '6',
              icon: <LogoutOutlined />,
              label: <Link to="/signin">Logout</Link>,  
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[{
              key: '1',
              icon: '',
              label: "Social Media Network"  
          }]}></Menu>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
          //   minHeight: '700px',
            overflow: "initial",
            background: colorBgContainer,
          }}
        >
        <Switch>
          <Route exact path='/home'><ListOfAllUsers/></Route>
          <Route exact path='/friend-request'><CurrentUsrStatus/></Route>
          <Route exact path='/request-status'><RequestStatus/></Route>
        </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};
export default connect(mapStateToProps, {})(HeaderPage);
  