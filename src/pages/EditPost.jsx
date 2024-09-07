import { Button, Form } from "react-bootstrap";
import Loading from "../components/Loading";
import usePostDetails from "../hooks/use-post-details";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editPost } from "../state/postSlice";
import { useNavigate } from "react-router-dom";

export default function EditPost() {
  const {dataLoading, dataError , record} = usePostDetails();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title , setTitle] = useState("");
  const [description , setDescription] = useState("");


  useEffect(()=>{//need to to fill my records by record data returned from getpost api when this component render
    if(record && !title && !description){//all data loaded 
      //!title && !description to ensure for once set these old data
      setTitle(record.title);
      setDescription(record.description);

    }
  },[record ,title , description])
  const submitHandler=(e)=>{
    e.preventDefault();
    dispatch(editPost({id:record.id ,title,description}))
    .unwrap()
    .then(() => {
      navigate("/")  
      });


  }

  return (
   <Loading isLoading={dataLoading} error={dataError}>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text"
            value={title}  onChange={(e)=>setTitle(e.target.value)}
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3}
            value={description} onChange={(e)=>setDescription(e.target.value)}

            />
          </Form.Group>
            {/* <Loading isLoading={loading} error={error} > */}
            <Button variant="primary" type='submit'  >Submit</Button>
          {/* </Loading> */}

        </Form>
   </Loading>
  )
}
