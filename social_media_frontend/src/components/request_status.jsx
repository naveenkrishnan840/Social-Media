import React, {useEffect } from 'react';
import { connect } from 'react-redux';
import { getPendingUsers } from "../actions/actions";
import { Table, Button } from 'antd';


export const RequestStatus = ({user_id, pending_users, getPendingUsers}) => {
 
  useEffect(() =>{
    getPendingUsers({"user_id": user_id})
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
      title: 'Friend Request',
      render: (user)=>{
        return (
        <>
        <Button type='dashed' style={{"color": "yellow", "background": "lightyellow"}}> Pending </Button>
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
        dataSource={pending_users} 
        columns={columns}>
      </Table>
    </>
  )
}
const mapStateToProps = (state) => ({
  pending_users: state.pending_users,
  user_id: state.user_id
})

const mapDispatchToProps = {getPendingUsers}

export default connect(mapStateToProps, mapDispatchToProps)(RequestStatus)