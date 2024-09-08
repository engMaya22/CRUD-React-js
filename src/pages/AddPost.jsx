import React, { useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { insertPost } from '../store/postSlice';
import { useNavigate } from 'react-router-dom';
import Loading from './../components/Loading';
import withGuard from './../util/withGuard';
import { useFormik } from 'formik';
import { postSchema } from './../util/validationSchema';

  const  AddPost = (props)=>{
    // console.log(props);
  const {loading , error} = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // way1
  // const title = useRef(null);
  // const description = useRef(null);

  //way2 
  // const [title , setTitle] = useState("");
  // const [description , setDescription] = useState("");

  // const submitHandler=(e)=>{
  //  e.preventDefault();
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
  // const id = Math.floor(Math.random()*500);
  // dispatch(insertPost({id , title,description}))          
  //           .unwrap()
  //           .then((originalPromiseResult) => {
  //             navigate("/")  
  //             })
  //           .catch((rejectedValueOrSerializedError) => {
  //             // handle error here
  //           });

  // setTitle("");
  // setDescription("");
     
 

  // }
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema:postSchema,
    onSubmit: values => {
      const id = Math.floor(Math.random()*500);
      dispatch(insertPost({id , title:values.title,description:values.description}))          
                .unwrap()
                .then((originalPromiseResult) => {
                  navigate("/")  
                  })
                .catch((rejectedValueOrSerializedError) => {
                  // handle error here
                });
    
     
    },
  });
 
  return (
    <Form onSubmit={formik.handleSubmit} noValidate >

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text"
          name ="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          isInvalid={!!formik.errors.title}    
        />
            {/* {formik.errors.title && formik.touched.title ? (
             <div>{formik.errors.title}</div>
           ) : null} */}
             <Form.Control.Feedback type="invalid">
                  {formik.errors.title}
             </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3}
         name ="description"
         onChange={formik.handleChange}
         value={formik.values.description}
         isInvalid={!!formik.errors.description}          

         />
          <Form.Control.Feedback type="invalid">
                  {formik.errors.description}
          </Form.Control.Feedback>
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
export default withGuard(AddPost) ;//way 2 by hof to protect 