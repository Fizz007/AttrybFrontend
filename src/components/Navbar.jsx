import {Link} from 'react-router-dom';
import { Flex, Spacer,Box,ButtonGroup,Button,Image,
    Divider,
    Text,
    } from '@chakra-ui/react';
import { useContext,useState } from 'react';
import { AuthContext } from '../context/Auth';
const Navbar = ()=>{
  const {isAuth,toggleAuth} = useContext(AuthContext);
  const [isOpen,setIsOpen] = useState(false)

  const handleLogout=()=>{
     toggleAuth();
    setIsOpen(!isOpen)
    localStorage.removeItem('attryb')
  }

  return(<>
       <Box padding='10px 20px' color='white' bg='#87a251' display={['none','none','none','block']} position='sticky' zIndex='10' top='0'>
       <Flex minWidth='max-content' alignItems='center' gap='2'>
  <Box p='2'>
    <Link to='/'>
    <Image borderRadius='50%'  maxW='40px' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWkdBb3OhntG6WeZl2HAjoehZf5iKB2_KWjg&usqp=CAU' />
    </Link>
  </Box>
  <Spacer />
  <ButtonGroup gap='10'>
   <Link to='/'>
    <Button _hover={{bg:'none'}} border='none' bg='none'>Second Hand Cars</Button>
   </Link>
   <Link to='/add'>
   <Button border='none' _hover={{bg:'none'}} bg='none'>Add Car</Button>
   </Link>
    {
      isAuth?<Button bg='black' color='white' _hover={{bg:'#283747'}} onClick={handleLogout}>Logout</Button>:
   <Link to='/login'>
   <Button bg='black' color='#fff' _hover={{bg:'black'}}>Login</Button>
   </Link>
    }
  </ButtonGroup>
</Flex>
       </Box>

{/* ---------------------------------------------------------------------------------------------------------------------------------------- */}

    <Box padding='10px' color='white' display={['block','block','blog','none']} bg='#202A44'  position='sticky' zIndex='10' top='0'>
        <Flex w='100%' m='auto' justifyContent='space-between' padding='0px 30px' alignItems='center'>
        <Box>
          <Link to='/'>
          <Image borderRadius='50%'  maxW='40px' src='https://i.ibb.co/bgJW5bP/images.png' />
          </Link>
        </Box>
        <Box color='#f06'  onClick={()=>setIsOpen(!isOpen)}>
        {

            isOpen?<Text fontWeight='600' fontSize='21px'>✖</Text>:<Text fontWeight='600' fontSize='25px'>☰</Text>
        }
        </Box>
        </Flex>
      
  <Flex bg='#202A44'  h='100vh' w='100%' padding='10px 40px' flexDirection='column' position='absolute' left={isOpen?'0px':'-1000px'} top='60px' transition='.3s all ease'>

    <Link to='/'>
    <Button _hover={{bg:'none'}} onClick={()=>setIsOpen(false)} border='none' bg='none'>Second Hand Cars</Button>
    </Link>
    <Link to='/add'>
    <Button onClick={()=>setIsOpen(false)} _hover={{bg:'none'}} border='none' bg='none'>Add Car</Button>
    </Link>
    {
      isAuth?<Button bg='#E59866' onClick={()=>handleLogout()}>Logout</Button>:
   <Link to='/login'>
   <Button onClick={()=>setIsOpen(!isOpen)} bg='#E59866' >Login</Button>
   </Link>
    }
  </Flex>
       
    </Box>
    
    <Divider  />

       </>
  )


}

export default Navbar;