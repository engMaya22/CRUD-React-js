import React, { memo } from 'react'
import { Table } from 'react-bootstrap'
import PostListItem from './PostListItem'

  const  PostsLists=({posts  ,deletePost ,isLoggin }) =>{
  
  
  return (
           <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th style={{ width: "70%" }}>Title</th>
                <th style={{ width: "10%" }}></th>
              </tr>
            </thead>
            <tbody>
                
              <PostListItem posts={posts} deletePost={deletePost} isLoggin={isLoggin}/>
       
            </tbody>
          </Table>
      
   
  )
}
export default memo(PostsLists);
