import React from 'react';
import SmallNavBar from '../../components/smallnavigationbar/SmallNavBar';
import Footer from '../../components/footer/Footer';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useNavigate} from "react-router-dom";
import { Spinner } from 'react-bootstrap';
import { useToast } from '@chakra-ui/toast';
function Lawyers(props) {
    const navigate=useNavigate();
    const [lawyers,setLawyers]=useState();
    const [isLoading,setIsLoading]=useState(true);
    const toast=useToast()

    useEffect(()=>{
        setIsLoading(true);
        axios.get("http://localhost:6005/lawyer").then((res)=>{
            
setLawyers(res.data.lawyers)
setIsLoading(false);
        }).catch((e)=>{
          toast({
              title: "Server Error Search!",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
      })
    },[])

    return (
        <div>
            <SmallNavBar/>
<div>

</div>
            <div style={{flexWrap:'wrap',display:"flex",justifyContent:"space-around"}}> 
                {isLoading?<Spinner animation="border" role="status" style={{ color: "var(--main-color)" }}>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>:
lawyers.map((e,i)=>{
    return <Card style={{ width: '18rem',marginBottom:"20px" }}>
    <Card.Img variant="top" src={e.profilePic?e.profilePic:"./user.png"}  style={{height:200}}/>
    <Card.Body>
      <Card.Title>{e.firstName} {e.lastName}</Card.Title>
      <Card.Text>
        {e.category}
      </Card.Text>
      <Card.Text>
        {e.bio}
      </Card.Text>
      <Button variant="primary" onClick={()=>{
        navigate(`/lawyer/${e.id}`)
      }}>Open profile</Button>
    </Card.Body>
  </Card>
})
                }
            </div>
            <Footer/>
        </div>
    );
}

export default Lawyers;