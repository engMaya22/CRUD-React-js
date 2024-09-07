import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';

export default function PostListItem({posts ,deletePost }) {
    const navigate = useNavigate();
    const deleteHandler = (item)=>{
        if (window.confirm(`Do you really want to delete ${item.title} post?`)) {
            deletePost(item.id)
          }
    }
    const records = posts.length > 0 ? posts.map( (post , index)=>
        (
              <tr key={post.id}>
              <td>{++index}</td>
              <td><Link to={`post/${post.id}`}>{post.title}</Link> </td>
              <td>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="success" onClick={()=>navigate(`post/${post.id}/edit`)}>Edit</Button>
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
