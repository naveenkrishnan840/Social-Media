import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { getAcceptUsers } from "../actions/actions";
import { Table, Button, Space} from 'antd';


export const CurrentUsrStatus = ({user_id, accept_users, getAcceptUsers}) => {
 
  useEffect(() =>{
    getAcceptUsers({"user_id": user_id})
  },[])


  const columns = [
    {
      title: 'User',
      dataIndex: 'to_user_name'
    },
    {
      title: "Email",
      dataIndex: "to_email_id"
    },
    {
      title: 'Request Status',
      render: (user)=>{
        return (
        <>
        <Space>
        <Button type='dashed' style={{"color": "green", "background": "lightgreen"}}> Accepted </Button>
        <Button type='dashed' style={{"color": "red", "background": "#FF7F7F"}}> Follow Back </Button>
        </Space>
        </>
        )
      }
    },
  ];
  const layoutStyle = {
    height: "710px"
  };
  return (
    <>
      <Table style={layoutStyle}    
        rowSelection={null}
        rowKey={obj =>obj.id}
        dataSource={accept_users} 
        columns={columns}>
      </Table>
    </>
  )
}
const mapStateToProps = (state) => ({
  accept_users: state.accept_users,
  user_id: state.user_id
})

const mapDispatchToProps = {getAcceptUsers}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUsrStatus)