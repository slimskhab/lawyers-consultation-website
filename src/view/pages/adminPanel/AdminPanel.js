import React, { useEffect, useState } from 'react'
import "./adminPanel.css"
import SmallNavBar from '../../components/smallnavigationbar/SmallNavBar'
import Footer from '../../components/footer/Footer'
import { Button, Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setInitLawyers, setSelectedLawyers, updatedUser } from '../../../features/AdminPanel'
export default function AdminPanel() {
  const lawyers = useSelector((state) => state.adminPanelStore.lawyers)
  const selectedLawyer = useSelector((state) => state.adminPanelStore.selectedLawyer)
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get("http://localhost:6005/lawyer/notverrified").then((response) => {
      dispatch(setInitLawyers(response.data.lawyers))
    })

  }, [])


  const handleApproveButton=() => {
    axios.put(`http://localhost:6005/lawyer/update/${selectedLawyer.id}`, {
      "status": 1
    })
    dispatch(updatedUser())

  }

  const handleDisapproveButton=() => {
    axios.put(`http://localhost:6005/lawyer/update/${selectedLawyer.id}`, {
      "status": -1
    })
    dispatch(updatedUser())

  }
  return (
    <div>
      <SmallNavBar />
      <div className='d-flex' style={{ color: "black" }}>
        <div style={{ width: "30%", display: "flex", flexDirection: "column" }}>

          {lawyers.map((elt) => {
            return <Card style={{ margin: "10px", cursor: "pointer" }}
              direction={{ base: 'column', sm: 'row' }}
              overflow='hidden'
              variant='outline' onClick={() => {
                dispatch(setSelectedLawyers(elt))
              }}
            >
              <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '100px' }}
                maxH={{ base: '100%', sm: '100px' }}
                src={elt.profilePic}
                alt='user profile'
              />

              <Stack>
                <CardBody>
                  <Heading size='md'>{elt.firstName} {elt.lastName}</Heading>

                  <Text>
                    {elt.createdAt ? elt.createdAt : "no data"}
                  </Text>
                </CardBody>

              </Stack>
            </Card>
          })}

          <br></br>

        </div>

        <div style={{ width: "70%", display: "flex", flexDirection: "column" }}>
          {
            selectedLawyer === 0 ?
              <span>please select an account</span> : <div style={{ display: "flex", flexDirection: "column",alignItems:"center" }}>
                <img src={selectedLawyer.profilePic} style={{height:200,width:200}}></img>
                <span>Fisrt Name: {selectedLawyer.firstName}</span>
                <span>Last Name: {selectedLawyer.lastName}</span>
                <span>Email: {selectedLawyer.email}</span>
                <span>Bio: {selectedLawyer.bio}</span>
                <span>Category: {selectedLawyer.category}</span>
                <img src={selectedLawyer.certifPic}></img>
                <div>
                <Button colorScheme='teal' size='md' onClick={handleApproveButton}>
                  Approve
                </Button><Button colorScheme='red' size='md' onClick={handleDisapproveButton}>Disapprove</Button>
                </div>
              </div>
          }



        </div>
      </div>
      <Footer />
    </div>
  )
}
