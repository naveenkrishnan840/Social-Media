import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {listOfAllUsers, sendRequest, changeStatus} from "../actions/actions";
import { Table, Input, Button, Col, Row, Space} from 'antd';


export const AllUsers = ({list_of_users, listOfAllUsers, user_id, sendRequest, changeStatus}) => {
  const [list_of_auth_users, setListUsers] = useState([]);
  const [search_user, setSearchUser] = useState("");
 

  useEffect(()=>{
      if (search_user){
        const filter_movie = list_of_users.filter(a=>a.user_name.toLowerCase().includes(search_user.toLowerCase()) || a.email_id.toLowerCase().includes(search_user.toLowerCase()));
        setListUsers(filter_movie);
      } else {
        setListUsers(list_of_users);
      }
  }, [search_user])
  useEffect(() =>{
      listOfAllUsers({"user": user_id});
  },[])

  useEffect(()=>{
    setListUsers(list_of_users);
  }, [list_of_users]);

  function select_user(user, status){
    if (status == "send"){
      sendRequest({"from_user": user_id, "to_user": user.user_id});
    } else {
      changeStatus({"from_user": user.user_id, "to_user": user_id, "status": status});
    }

  }
  const columns = [
    {
      title: 'User',
      dataIndex: 'user_name'
    },
    {
      title: "Email",
      dataIndex: "email_id"
    },
    {
      title: 'Friend Request',
      render: (user)=>{ 
        if (user.status.includes("0")){
          return (
          <Button onClick={()=>select_user(user, "send")} type='dashed' style={{"color": "yellow", "background": "lightyellow"}}> Send </Button>
          )
        } else if (user.status.includes("1")) {
          return (
            <>
            <Space>
              <Button onClick={()=>select_user(user, 'accept')} type='dashed' style={{"color": "green", "background": "lightgreen"}}> Accept </Button>
              <Button onClick={()=>select_user(user, "reject")} type='dashed' style={{"color": "red", "background": "#FF7F7F"}}> Reject </Button>
            </Space>
          </>
          )
        }
      }
    },
  ];
  const layoutStyle = {
    height: "710px"
  };
  return (
    <>
      <Row gutter={16}>
        <Col span={7}>
          <Input placeholder='Search For Title ' style={{width:"100%"}} onChange={(e)=>{
            setSearchUser(e.target.value)
          }}/>          
        </Col>
       
      </Row>
        <Table style={layoutStyle}    
          rowSelection={null}
          rowKey={obj =>obj.id}
          dataSource={list_of_auth_users} 
          columns={columns}>
        </Table>
    </>
  )
}
const mapStateToProps = (state) => ({
  list_of_users: state.users_list,
  user_id: state.user_id
})

const mapDispatchToProps = {listOfAllUsers, sendRequest, changeStatus}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
