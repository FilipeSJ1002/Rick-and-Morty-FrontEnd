import { Box, Flex, Stack } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UserEdit from './pages/UserEdit';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Characters from './pages/Characters';
import TitleRM from './components/TitleRM';

function App() {

  return (
    <Box color={'white'} fontWeight="bold" backgroundColor={"black"} backgroundImage="./src/assets//portal-rick-and-morty.gif"  backgroundSize="contain" 
    backgroundPosition="center" backgroundRepeat="no-repeat" minHeight="100vh">
      <Box>
        <TitleRM/>
      </Box>
      <Stack>
        <Routes>  
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/character" element={<ProtectedRoutes><Characters/></ProtectedRoutes>} />
          <Route path="/user-edit" element={<ProtectedRoutes><UserEdit/></ProtectedRoutes>} />
          <Route path="/about" element={<ProtectedRoutes><AboutUs/></ProtectedRoutes>} />
          <Route path="/contact" element={<ProtectedRoutes><Contact/></ProtectedRoutes>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Stack>
    </Box>
  );
}

export default App;
