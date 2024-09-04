import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'

export default function PostListItem({posts ,deletePost }) {
    const deleteHandler = (item)=>{
        if (window.confirm(`Do you really want to delete ${item.title} post?`)) {
            deletePost(item.id)
          }
    }
    const records = posts.length > 0 ? posts.map( (post , index)=>
        (
              <tr key={post.id}>
              <td>{++index}</td>
              <td>{post.title}</td>
              <td>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="success" >Edit</Button>
                  <Button variant="danger" onClick={()=>(deleteHandler(post))}>Delete</Button>
                </ButtonGroup>
              </td>
            </tr>
        )
    ):  'There is no posts available';
  
  return (
    <>
     {records}
    </>

      
  
  )
}
