import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate();


  return (
    <div>
        <Container>
       <Row>
         <Col>
            <div className='mt-5 text-center'>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
                <Button variant="link" onClick={()=>navigate("/",{replace:true})}>Go back</Button>

            </div>
         </Col>
       </Row>
        </Container>
   
    </div>
  )
}
