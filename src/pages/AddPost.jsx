import React, { useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { insertPost } from '../store/postSlice';
import { useNavigate } from 'react-router-dom';
import Loading from './../components/Loading';

export default function AddPost() {
  const {loading , error} = useSelector((state) => state.posts);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // way1
  // const title = useRef(null);
  // const description = useRef(null);

  //way2 
  const [title , setTitle] = useState("");
  const [description , setDescription] = useState("");

  const submitHandler=(e)=>{
   e.preventDefault();
  //  console.log(title.current.value);
  //way1
  // const data = {
  //   title:title.current.value,
  //   description:description.current.value,

  // }
  // dispatch(insertPost(data));
   // title.current.value = null;
  // description.current.value = null;

  //way2
  const id = Math.floor(Math.random()*500);
  dispatch(insertPost({id , title,description}))          
            .unwrap()
            .then((originalPromiseResult) => {
              navigate("/")  
              })
            .catch((rejectedValueOrSerializedError) => {
              // handle error here
            });

  setTitle("");
  setDescription("");
     
 

  }
 
  return (
    <Form onSubmit={submitHandler}>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text"
        //  ref={title}
        value={title}  onChange={(e)=>setTitle(e.target.value)}
          />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3}
        //  ref={description}
         value={description} onChange={(e)=>setDescription(e.target.value)}
 
         />
      </Form.Group>
      {/* way1 */}
      {/* <Loading isLoading={loading} error={error} />
         <Button variant="primary" type='submit' disabled={loading} >Submit</Button> */}

{/* way2 */}
      <Loading isLoading={loading} error={error} >
         <Button variant="primary" type='submit'  >Submit</Button>
      </Loading>

    </Form>

  )
}
