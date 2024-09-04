import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'

export default function PostListItem({posts  }) {
    const records = posts.length > 0 ? posts.map( (post , index)=>
        (
              <tr key={post.id}>
              <td>{++index}</td>
              <td>{post.title}</td>
              <td>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="success">Edit</Button>
                  <Button variant="danger">Delete</Button>
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
