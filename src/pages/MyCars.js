import { Box, Button, Flex, Select, SimpleGrid, Skeleton, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import API from "./api";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import CarDiv from "../components/div";
import { baseurl } from "../utils/baseUrl";
function MyCars(){
    let idArr = JSON.parse(localStorage.getItem('attryb_arr'))||[]
    const [data , setData] = useState([]);
    const [arr , setArr] = useState(idArr);
    const [loading , setLoading] = useState(false);
    const [searchParams, setSearchParam] = useSearchParams();
    let a = searchParams.get('color')||'';
    const [color , setColor] = useState(a)
    let b = searchParams.get('mileage')||'';
    const [mileage , setMileage] = useState(b)
    let c = searchParams.get('price')||'';
    const [price , setPrice] = useState(c);
    const { user } = useContext(AuthContext);
    const toast = useToast();


     useEffect(()=>{
        // get all cars data
        setLoading(true)
        async function getData(){
            let api = API(mileage , price ,color , `${baseurl}/car`)
            let res = await axios.get(api);
            let ans = await res.data;
            console.log(ans)
            if(ans.status){
                setData(ans.cars);
            }
            setLoading(false)
        }
        getData();
     },[price , mileage , color])
 
     // set search params
     useEffect(() => {
        let paramsObject = {
        }
        if (price) {
            paramsObject.price = price;
        }
        if (mileage) {
            paramsObject.mileage = mileage;
        }
        if (color) {
            paramsObject.color = color
        }
        setSearchParam(paramsObject)
    },[price , mileage , color])

    const getAllHondaCity = async()=>{
        setLoading(true)
        let res = await axios.get(`https://stormy-tights-hen.cyclic.app/car/all/honda` );
        let ans = await res.data;
        if(ans.status){
            setData(ans.cars);
            setLoading(false)
        }
        else{
            setLoading(false)
        }
        setSearchParam({})
    }

    const handleDelCar = async(id)=>{
        let res1 = await axios.delete(`https://stormy-tights-hen.cyclic.app/car/del/${id}`);
        let data1 = await res1.data;

        if(data1.status){
            let api = API(mileage , price ,color , `https://stormy-tights-hen.cyclic.app/car`)
            let res = await axios.get(api);
            let ans = await res.data;
            if(ans.status){
                setData(ans.cars);
            }
            toast({
                title: 'Car deleted',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position:'top'
              })
            setLoading(false)
        }
        else{
            toast({
                title: 'Error Occured',
                status: 'error',
                description : data1.message,
                duration: 3000,
                isClosable: true,
                position:'top'
              })
        }
        setLoading(false)

    }

    const handleDelMany = async()=>{
        let res1 = await axios.delete(`https://stormy-tights-hen.cyclic.app/car/manydel/${arr.join(',')}` );
        let data1 = await res1.data;

        if(data1.status){
            let api = API(mileage , price ,color ,  `https://stormy-tights-hen.cyclic.app/car`)
            let res = await axios.get(api);
            let ans = await res.data;
            if(ans.status){
                setData(ans.cars);
            }
            toast({
                title: 'Selected car deleted',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position:'top'
              })
              setArr([]);
             localStorage.setItem('attryb_arr' , JSON.stringify([]))
            setLoading(false)
        }
        else{
            toast({
                title: 'Error Occured',
                status: 'error',
                description : data1.message,
                duration: 3000,
                isClosable: true,
                position:'top'
              })
        }
        setLoading(false)

    }
    return <Box w='90%' m='auto' mt='40px' mb='50px'>
        <SimpleGrid gap='10px' mb='40px' columns={['1','1','2','3']}>
            <Select value={color} onChange={(e)=>setColor(e.target.value)}>
                <option value="">Select Colour</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="yellow">Yellow</option>
                <option value="navy">Navy</option>
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="green">Green</option>
                <option value="gray">Gray</option>
            </Select>
            <Select value={mileage} onChange={(e)=>setMileage(Number(e.target.value))}>
                <option value="">Select Mileage</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
                <option value={60}>60</option>
                <option value={80}>80</option>
                <option value={120}>120</option>
                <option value={140}>140</option>
                <option value={100}>100</option>
                <option value={160}>160</option>
            </Select>
            <Select value={price} onChange={(e)=>setPrice(Number(e.target.value))}>
                <option value="">Select Price</option>
                <option value={100000}>100000</option>
                <option value={200000}>200000</option>
                <option value={300000}>300000</option>
                <option value={500000}>500000</option>
                <option value={700000}>700000</option>
                <option value={900000}>900000</option>
                <option value={1500000}>1500000</option>
                <option value={2000000}>2000000</option>
            </Select>
            <Button onClick={getAllHondaCity}>
                Get All Honda City 2015
            </Button>
            <Button display={arr.length == 0 ?'none':'block'} onClick={handleDelMany}>
                Delete Selected Cars
            </Button>
        </SimpleGrid>
        {
            loading ? <SimpleGrid gap='10px' columns={['1','1','2','3']}>
                {
                    [1,2,3,4,5,6,7,8].map((ele)=>{
                        return <Skeleton key={ele} h='250px' w='100%'></Skeleton>
                    })
                }
            </SimpleGrid>:data?.length==0?<Flex justifyContent='center' alignItems='center'>
                <Text>No Car</Text>
            </Flex>:<SimpleGrid gap='10px' columns={['1','1','2','3']}>
                {
                    data?.map((ele)=>{
                        return <CarDiv key={ele._id} car={ele} handleDelCar={handleDelCar} arr={arr} setArr={setArr} />
                    })
                }
            </SimpleGrid>
        }
    </Box>
}


export default MyCars;