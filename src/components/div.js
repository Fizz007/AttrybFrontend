import { Badge, Box, Flex, Image, Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Checkbox,
     } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

function CarDiv({car , handleDelCar , arr , setArr}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const  c = arr.find((ele)=>ele==car._id)
    const [a , setA] = useState(c);

const handleDel = ()=>{
    handleDelCar(car._id)
}

const handleChecked = (e)=>{
    if(e.target.checked){
      let newArr = arr.slice();
      newArr.push(car._id);
      setA(true)
      setArr(newArr);
      localStorage.setItem('attryb_arr' , JSON.stringify(newArr))
   }
   else{
    let arr2 = arr.filter((ele)=>ele!==car._id);
      setA(false)
      setArr(arr2);
      localStorage.setItem('attryb_arr' , JSON.stringify(arr2))
   }
}

    return <Box p='40px 10px' pt='20px' borderRadius='10px' boxShadow='rgba(0, 0, 0, 0.35) 0px 5px 15px' key={car._id}>
            <Flex justifyContent='right' p='0px 10px'>
            <Checkbox isChecked={a} onChange={(e)=>handleChecked(e)} borderColor='blue'/>
            </Flex>
           <Image maxW='100%' src='https://carstreetindia.com/blogs/wp-content/uploads/2022/09/25-1024x683.jpg' />
           <Flex gap='20px' fontSize='18px' fontWeight='600' mb='10px' p='0px 20px'>
           <Text>{car.name}</Text>
           <Text>Model {car.model_year}</Text>
           </Flex>
           <Flex mt='20px' gap='10px' flexWrap='wrap' justifyContent='center'>
            <Badge p='5px 10px'>
                Power {car.power}
            </Badge>
            <Badge p='5px 10px'>
                Mileage {car.mileage}
            </Badge>
            <Badge p='5px 10px'>
                Max Speed {car.max_speed}
            </Badge>
           </Flex>
           <Flex justifyContent='space-between' flexWrap='wrap'>
            <Badge cursor='pointer' p='10px 30px' mt='10px' onClick={onOpen} >
              Inventory
           </Badge>
           <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Inventory Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody p='30px 20px'>
            <Text>KMs : {car.inventry.KMs}</Text>
            <Text>Accident : {car.inventry.accident}</Text>
            <Text>Major Scratch : {car.inventry.major_scratches}</Text>
            <Text>Original Paint : {car.inventry.original_paint?'Yes':'No'}</Text>
            <Text>Registration Place : {car.inventry.registration_place}</Text>
            <Text>Colours Available : {car.colors.join(',')}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
            <Badge p='10px 30px' mt='10px' >
              Price : {car.price} ₹
           </Badge>
           </Flex>

           <Flex mt='20px' flexWrap='wrap' justifyContent='center' gap='200px'>
            <Link to={`/car/${car._id}`}>
            <Text cursor='pointer' color='green'>Edit</Text>
            </Link>
            <Text onClick={handleDel} cursor='pointer' color='red'>Delete</Text>
           </Flex>
         </Box>
}

export default CarDiv