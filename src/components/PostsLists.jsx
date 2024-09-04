import React from 'react'
import { Table } from 'react-bootstrap'
import PostListItem from './PostListItem'

export default function PostsLists({posts }) {
  
  
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
                
              <PostListItem posts={posts} />
       
            </tbody>
          </Table>
      
   
  )
}
