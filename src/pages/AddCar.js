import { Button, Flex, Input, InputGroup, InputLeftAddon, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { baseurl } from "../utils/baseUrl";
let init1 = {
    name : '',
    colors:[],
    max_speed : '',
    mileage : '',
    model_year : '',
    power : '',
    price : ''
}

let init2 = {
    KMs : '',
    accident :'',
    major_scratches :'',
    numberOfBuyers : '',
    original_Paint :'',
    registration_place : ''

}
export default function EditCar(){
    const [obj , setObj] = useState(init1)
    const [obj2 , setObj2] = useState(init2);
    const { user } = useContext(AuthContext);
    const [load , setLoad] = useState(false)
    const toast = useToast();
    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {value , name} = e.target;
        if(name == 'max_speed' || name == 'name' || name == 'power'){
            setObj({...obj , [name]:value})
        }
        else if(name == 'colors'){
            let a = value.split(',')
            setObj({...obj , [name]:a})
        }
        else{
            setObj({...obj , [name]:Number(value)})
        }
    }

    const handleChange2 = (e)=>{
        const {value , name} = e.target;
        if( name =='registration_place' || name =='original_Paint' || name =='major_scratches'){
            setObj2({...obj2 , [name]:value})
        }
        else{
            setObj2({...obj2 , [name]:Number(value)})
        }
    }

    const handleClick = async()=>{
        let newObj = obj;
        newObj.inventry = obj2;
        setLoad(true)
        let res = await axios.post(`${baseurl}/car/create` ,{car : newObj , userID : user._id} );
        let ans = await res.data;
        if(ans.status){
            setLoad(false)
            toast({
                title: 'Car Added',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position:'top'
              })
              navigate('/')
        }
        else{
            setLoad(false)
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

    return <Flex flexDirection='column' w={['300px','400px','500px','500px']} m='auto' mt='20px' gap='10px'>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='Name' />
             <Input placeholder="eg:- Honda City" fontSize='13px' fontWeight='500' type='text' value={obj.name} name='name' onChange={(e)=>handleChange(e)} />
           </InputGroup>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='Mileage' />
             <Input placeholder="eg:- 110" type="number" fontSize='13px' fontWeight='500'  value={obj.mileage} name='mileage' onChange={(e)=>handleChange(e)} />
           </InputGroup>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='Power' />
             <Input placeholder="eg:- 100 HP" fontSize='13px' fontWeight='500' type='text' value={obj.power} name='power' onChange={(e)=>handleChange(e)} />
           </InputGroup>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='Max Speed' />
             <Input placeholder="eg:- 120 KM/H" fontSize='13px' fontWeight='500' type='text' value={obj.max_speed} name='max_speed' onChange={(e)=>handleChange(e)} />
           </InputGroup>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='Model Year' />
             <Input placeholder="eg:- 2015" type="number" fontSize='13px' fontWeight='500'  value={obj.model_year} name='model_year' onChange={(e)=>handleChange(e)} />
           </InputGroup>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='Price' />
             <Input placeholder="eg:- 240000" type="number" fontSize='13px' fontWeight='500'  value={obj.price} name='price' onChange={(e)=>handleChange(e)} />
           </InputGroup>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='colors' />
             <Input fontSize='13px' fontWeight='500'  value={obj.colors} name='colors' placeholder="eg:- red,blue,green without space and with small letter" onChange={(e)=>handleChange(e)} />
           </InputGroup>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='KMs' />
             <Input placeholder="eg:- 20000" type="number" fontSize='13px' fontWeight='500'  value={obj2.KMs} name='KMs' onChange={(e)=>handleChange2(e)} />
           </InputGroup>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='Accident' />
             <Input placeholder="eg:- 2" type="number" fontSize='13px' fontWeight='500'  value={obj2.accident} name='accident' onChange={(e)=>handleChange2(e)} />
           </InputGroup>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='Buyers' />
             <Input placeholder="eg:- 9" type="number" fontSize='13px' fontWeight='500'  value={obj2.numberOfBuyers} name='numberOfBuyers' onChange={(e)=>handleChange2(e)} />
           </InputGroup>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='Register Place' />
             <Input placeholder="eg:- Pune" fontSize='13px' fontWeight='500'  value={obj2.registration_place} name='registration_place' onChange={(e)=>handleChange2(e)} />
           </InputGroup>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='Original Paint' />
             <Input placeholder="eg:- Yes or No" fontSize='13px' fontWeight='500'  value={obj2.original_Paint} name='original_Paint' onChange={(e)=>handleChange2(e)} />
           </InputGroup>
           <InputGroup>
           <InputLeftAddon w='130px' bg='gray' children='Major Scratches' />
             <Input placeholder="eg:- Yes or No" fontSize='13px' fontWeight='500'  value={obj2.major_scratches} name='major_scratches' onChange={(e)=>handleChange2(e)} />
           </InputGroup>
           <Button isLoading={load} onClick={handleClick} bg='gray' _hover={{bg:'gray'}}>Add Car</Button>
    </Flex>
}