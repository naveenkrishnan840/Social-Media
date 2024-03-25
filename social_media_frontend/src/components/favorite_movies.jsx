import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { connect } from 'react-redux';
import {getUserSelectedMovies, getUserDeletedMovie} from "../actions/actions";
import { Table } from 'antd';
import {DeleteOutlined} from "@ant-design/icons"

const mapStateToProps = (state) => ({
  selected_movies_for_user: state.fov_movies,
  user_id: state.user_id,
});

const mapDispatchToProps = {getUserSelectedMovies, getUserDeletedMovie};

export const FavoriteMovies = ({selected_movies_for_user, user_id, getUserDeletedMovie, getUserSelectedMovies}) => {
  const [user_sel_movies, userSelMovies] = useState([]);
  const [user_del_sel_movie_id, userDelSelMovieId] = useState();


  useEffect(()=>{
    getUserSelectedMovies({user:{user:user_id}})
  },[]);

  useEffect(()=>{
    userSelMovies(selected_movies_for_user)
  },[selected_movies_for_user]);
  useEffect(()=>{
    const other_sel_movies = user_sel_movies.filter((movie)=>movie.movie_id !== user_del_sel_movie_id)
    userSelMovies(other_sel_movies)
  },[user_del_sel_movie_id]);


  const columns = [
    {
      title: 'Original Title',
      dataIndex: 'movie_title'
    },
    {
      title: 'Release Date',
      // key: 'Release Date',
      dataIndex: 'release_date',
    },
    {
      title: 'Synposis',
      // key: 'Synposis',
      dataIndex: 'synopsis',
    },
    {
      title: 'Vote Average',
      // key: 'Vote Average',
      dataIndex: 'vote_average',
    },
    {
      title: 'Vote Count',
      // key: 'Vote Count',
      dataIndex: 'vote_count',
    },
    {
      title: "Delete",
      render: (text, record, value)=>(
        <DeleteOutlined onClick={()=>{
          userDelSelMovieId(record["movie_id"])
          getUserDeletedMovie({movie_id: record["movie_id"]})
        }}/>
      )
    }
  ];
  return (
    <>
       <Table         
          // rowSelection={{
          //   type: "checkbox",
          //   ...rowSelection,
          // }}  
          // rowKey={"id"}
          rowKey={obj =>obj.id}
          dataSource={user_sel_movies} 
          columns={columns}>
        </Table>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteMovies);