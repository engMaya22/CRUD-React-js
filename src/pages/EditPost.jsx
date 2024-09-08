import { Button, Form } from "react-bootstrap";
import Loading from "../components/Loading";
import usePostDetails from "../hooks/use-post-details";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cleanRecord, editPost } from "../store/postSlice";
import { useNavigate } from "react-router-dom";
import withGuard from "../util/withGuard";
import { useFormik } from "formik";
import { postSchema } from './../util/validationSchema';

  const EditPost = () =>{
  const {loading, error , record} = usePostDetails();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [title , setTitle] = useState("");
  // const [description , setDescription] = useState("");
// record -> old data ,title = "", description = "" -> will useeffect run 
// record -> null in pending , title + description -> old data which is record data -> will not run use effect
//record data in fullfilled , title + description -> old data which is record data -> will not run use effect
  // useEffect(()=>{//need to to fill my records by record data returned from getpost api when this component render
  //   if(record ){//all data loaded 
  //     setTitle(record.title);
  //     setDescription(record.description);

  //   }
  // },[record])

  useEffect(()=>{//to reset record when we render this page
   return ()=>{
    dispatch(cleanRecord())
   }
  },[dispatch])
  // const submitHandler=(e)=>{
  //   e.preventDefault();
  //   dispatch(editPost({id:record.id ,title,description}))
  //   .unwrap()
  //   .then(() => {
  //     navigate("/")  
  //     });


  // }
  const formik = useFormik({
    initialValues: {
      title: record ? record?.title : "",
      description: record? record?.description : "",
    },
    enableReinitialize:true,//for edit and dont forget to name teach field
    validationSchema:postSchema,
    onSubmit: values => {
      dispatch(editPost({id:record.id ,title:values.title,description:values.description}))
        .unwrap()
        .then(() => {
          navigate("/")  
          });
        
     
    },
  });
 

  return (
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text"
              name ="title"
              value={formik.values.title}
              isInvalid={!!formik.errors.title}   
              />
               <Form.Control.Feedback type="invalid">
                  {formik.errors.title}
             </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3}
              name ="description"
              value={formik.values.description}
              isInvalid={!!formik.errors.description}   

            />
             <Form.Control.Feedback type="invalid">
                  {formik.errors.description}
             </Form.Control.Feedback>
          </Form.Group>
            <Loading isLoading={loading} error={error} >
              <Button variant="primary" type='submit'  >Submit</Button>
          </Loading>

        </Form>
  )
}
export default withGuard(EditPost);