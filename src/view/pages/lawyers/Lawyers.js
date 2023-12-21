import React from 'react';
import SmallNavBar from '../../components/smallnavigationbar/SmallNavBar';
import Footer from '../../components/footer/Footer';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { Spinner } from 'react-bootstrap';
import { useToast } from '@chakra-ui/toast';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import { Stack } from '@chakra-ui/layout';
function Lawyers(props) {
  const navigate = useNavigate();
  const [lawyers, setLawyers] = useState();
  const [filtered, setFiltered] = useState();

  const [searchText,setSearchText]=useState("");
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast()

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${process.env.REACT_APP_HOSTURL}/lawyer`).then((res) => {
      const lawyersData = res.data.lawyers.map((lawyer) => ({
        ...lawyer,
        fullName: `${lawyer.firstName} ${lawyer.lastName}`,
      }));
  console.log(lawyersData);
      setLawyers(lawyersData);
      setFiltered(lawyersData);
      setIsLoading(false);
    }).catch((e) => {
      toast({
        title: "Server Error Search!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    });
  }, []);
  const [value, setValue] = useState();

  useEffect(() => {
    const filteredLawyers = lawyers&&lawyers.filter((lawyer) =>
    lawyer.category === value &&
    lawyer.fullName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFiltered(filteredLawyers);
  }, [searchText, lawyers]);


  const handleRadioChange = (newValue) => {
    setValue(newValue);
  
    // Filter lawyers based on the selected category and search text
    const newFilteredLawyers = lawyers.filter(
      (lawyer) =>
        lawyer.category === newValue &&
        lawyer.fullName.toLowerCase().includes(searchText.toLowerCase())
    );
  
    setFiltered(newFilteredLawyers);
  };
  
  return (
    <div>
      <SmallNavBar />
      <div style={{padding:20,display:"flex",alignItems:"center"}}>
        <div className='search-bar-closed' style={{border:"1px black solid",width:"50%",marginTop:"none"}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="49" height="49" viewBox="0 0 49 49" fill="none">
            <path d="M42.875 42.8754L34.008 34.0085M34.008 34.0085C35.5248 32.4917 36.7279 30.6911 37.5487 28.7094C38.3696 26.7277 38.7921 24.6037 38.7921 22.4588C38.7921 20.3138 38.3696 18.1898 37.5487 16.2081C36.7279 14.2264 35.5248 12.4258 34.008 10.909C32.4913 9.39232 30.6907 8.18918 28.709 7.36833C26.7273 6.54749 24.6033 6.125 22.4583 6.125C20.3133 6.125 18.1894 6.54748 16.2077 7.36833C14.226 8.18918 12.4253 9.39232 10.9086 10.909C7.84545 13.9722 6.12457 18.1268 6.12457 22.4588C6.12457 26.7907 7.84545 30.9453 10.9086 34.0085C13.9718 37.0716 18.1263 38.7925 22.4583 38.7925C26.7903 38.7925 30.9449 37.0716 34.008 34.0085Z" stroke="#001F3F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input className='input-style' placeholder='Search By Name...' value={searchText} onChange={(e)=>{
setSearchText(e.target.value)
          }}></input>



          




        </div>
        <RadioGroup onChange={handleRadioChange} value={value} style={{marginLeft:20}}>
                                        <Stack direction='row' className='radio-buttons'>
                                            <Radio value='Trainee'>Trainee Lawyer</Radio>
                                            <Radio value='Litigation'>Litigation Lawyer</Radio>
                                            <Radio value='Appeal'>Appeal Lawyer</Radio>
                                        </Stack>
                                    </RadioGroup>
      </div>
      <div style={{ flexWrap: 'wrap', display: "flex", justifyContent: "space-around" }}>
        {isLoading ? <Spinner animation="border" role="status" style={{ color: "var(--main-color)" }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner> :
        filtered&&
          filtered.map((e, i) => {
            return <Card style={{ width: '18rem', marginBottom: "20px" }}>
              <Card.Img variant="top" src={e.profilePic ? e.profilePic : "./user.png"} style={{ height: 200 }} />
              <Card.Body>
                <Card.Title>{e.firstName} {e.lastName}</Card.Title>
                <Card.Text>
                  {e.category} Lawyer
                </Card.Text>
                <Card.Text style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>
                  {e.bio}
                </Card.Text>
                <Button variant="primary" onClick={() => {
                  navigate(`/lawyer/${e.id}`)
                }}>Open profile</Button>
              </Card.Body>
            </Card>
          })
        }
      </div>
      <Footer />
    </div>
  );
}

export default Lawyers;