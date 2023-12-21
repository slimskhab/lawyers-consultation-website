import React, { useEffect } from 'react'
import "./adminPanel.css"
import SmallNavBar from '../../components/smallnavigationbar/SmallNavBar'
import Footer from '../../components/footer/Footer'
import { Button, Card, CardBody, Heading, Image, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setInitLawyers, setSelectedLawyers, updatedUser } from '../../../features/AdminPanel'
export default function AdminPanel() {
  const lawyers = useSelector((state) => state.adminPanelStore.lawyers)
  const selectedLawyer = useSelector((state) => state.adminPanelStore.selectedLawyer)
  const dispatch = useDispatch();
  const toast = useToast()
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_HOSTURL}/lawyer/notverrified`).then((response) => {
      dispatch(setInitLawyers(response.data.lawyers))
    }).catch((e) => {
      toast({
        title: "Server Error Search!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    })

  }, [])


  const handleApproveButton = () => {
    axios.put(`${process.env.REACT_APP_HOSTURL}/lawyer/update/${selectedLawyer.id}`, {
      "status": 1
    }).catch((e) => {
      toast({
        title: "Server Error Search!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    })
    dispatch(updatedUser())

  }

  const handleDisapproveButton = () => {
    axios.put(`${process.env.REACT_APP_HOSTURL}/lawyer/update/${selectedLawyer.id}`, {
      "status": -1
    }).catch((e) => {
      toast({
        title: "Server Error Search!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    })
    dispatch(updatedUser())

  }

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleDateString(); // Format date as 'MM/DD/YYYY'
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time as 'HH:MM'
    return `${formattedDate} ${formattedTime}`;
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
                    {formatDate(elt.createdAt)}
                  </Text>
                </CardBody>

              </Stack>
            </Card>
          })}

          <br></br>

        </div>

        <div style={{ width: "70%", display: "flex", flexDirection: "column" }}>
          {
            lawyers.length === 0 ?
              <h2>No accounts to verify</h2>:
            selectedLawyer===0?              <h2>Please select a profile</h2>

              : <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                
                <TableContainer style={{padding:20}}>
                  <Table variant='simple' size='md'>
                    <Tbody>
                      <Tr>
                        <Td>Profile Picture</Td>
                        <Td>                <img src={selectedLawyer.profilePic} style={{ height: 200, width: 200 }} alt={selectedLawyer.firstName}></img>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>First Name</Td>
                        <Td>{selectedLawyer.firstName}</Td>
                      </Tr>
                      <Tr>
                        <Td>Last Name</Td>
                        <Td>{selectedLawyer.lastName}</Td>
                      </Tr>
                      <Tr>
                        <Td>Email</Td>
                        <Td>{selectedLawyer.email}</Td>
                      </Tr>
                      <Tr>
                        <Td>Bio</Td>
                        <Td style={{ whiteSpace: "pre-line" }}>{selectedLawyer.bio}</Td>
                      </Tr>
                      <Tr>
                        <Td>Category</Td>
                        <Td>{selectedLawyer.category}</Td>
                      </Tr>
                      <Tr>
                        <Td>Diploma</Td>
                        <Td>                <img src={selectedLawyer.certifPic} alt={selectedLawyer.lastName}></img>
                        </Td>
                      </Tr>
                    </Tbody>

                  </Table>
                </TableContainer>
                <div>
                  <Button colorScheme='teal' size='md' onClick={handleApproveButton} style={{ marginRight: 10 }}>
                    Approve
                  </Button>

                  <Button colorScheme='red' size='md' onClick={handleDisapproveButton}>Disapprove</Button>
                </div>
              </div>
          }



        </div>
      </div>
      <Footer />
    </div>
  )
}
