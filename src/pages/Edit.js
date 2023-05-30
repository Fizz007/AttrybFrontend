import { Box, Button, Flex, Input, InputGroup, InputLeftAddon, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseurl } from "../utils/baseUrl";

export default function EditCar(){
    const params = useParams();
    const [obj , setObj] = useState({})
    const [obj2 , setObj2] = useState({});
    const toast = useToast();
    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {value , name} = e.target;
        if(name == 'max_speed' || name == 'name' || name == 'power'){
            setObj({...obj , [name]:value})
        }
        else{
            setObj({...obj , [name]:Number(value)})
        }
    }

    const handleChange2 = (e)=>{
        const {value , name} = e.target;
        if( name =='registration_place'){
            setObj2({...obj2 , [name]:value})
        }
        else{
            setObj2({...obj2 , [name]:Number(value)})
        }
    }

    const handleClick = async()=>{
        let newObj = obj;
        delete newObj.userID;
        delete newObj._id;
        delete newObj.__v;
        delete newObj.inventry;
        newObj.inventry = obj2;
        
        let res = await axios.put(`${baseurl}/car/edit/${params.id}` ,{car : newObj} );
        let ans = await res.data;
        if(ans.status){
            toast({
                title: 'Car Updated',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position:'top'
              })
              navigate('/')
        }
        else{
            toast({
                title: 'Error Occured',
                description: ans.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position:'top'
              })
        }


    }

    useEffect(()=>{
      async function getObj(){
        let res = await axios.get(`https://stormy-tights-hen.cyclic.app/car/single/${params.id}`);
        let ans = await res.data;
        if(ans.status){
            setObj(ans.cars);
            setObj2(ans.cars.inventry)
        }
      }
      getObj();
    },[])
    return <Flex flexDirection='column' w={['300px','400px','500px','500px']} m='auto' mt='20px' gap='10px'>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='Name' />
             <Input fontSize='13px' fontWeight='500' type='text' value={obj.name} name='name' onChange={(e)=>handleChange(e)} />
           </InputGroup>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='Mileage' />
             <Input fontSize='13px' fontWeight='500'  value={obj.mileage} name='mileage' onChange={(e)=>handleChange(e)} />
           </InputGroup>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='Power' />
             <Input fontSize='13px' fontWeight='500' type='text' value={obj.power} name='power' onChange={(e)=>handleChange(e)} />
           </InputGroup>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='Max Speed' />
             <Input fontSize='13px' fontWeight='500' type='text' value={obj.max_speed} name='max_speed' onChange={(e)=>handleChange(e)} />
           </InputGroup>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='Model Year' />
             <Input fontSize='13px' fontWeight='500'  value={obj.model_year} name='model_year' onChange={(e)=>handleChange(e)} />
           </InputGroup>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='Price' />
             <Input fontSize='13px' fontWeight='500'  value={obj.price} name='price' onChange={(e)=>handleChange(e)} />
           </InputGroup>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='KMs' />
             <Input fontSize='13px' fontWeight='500'  value={obj2.KMs} name='KMs' onChange={(e)=>handleChange2(e)} />
           </InputGroup>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='Accident' />
             <Input fontSize='13px' fontWeight='500'  value={obj2.accident} name='accident' onChange={(e)=>handleChange2(e)} />
           </InputGroup>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='Buyers' />
             <Input fontSize='13px' fontWeight='500'  value={obj2.numberOfBuyers} name='numberOfBuyers' onChange={(e)=>handleChange2(e)} />
           </InputGroup>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='Register Place' />
             <Input fontSize='13px' fontWeight='500'  value={obj2.registration_place} name='registration_place' onChange={(e)=>handleChange2(e)} />
           </InputGroup>
           <Button onClick={handleClick} bg='gray' _hover={{bg:'gray'}}>Update Car</Button>
    </Flex>
}