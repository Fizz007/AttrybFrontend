import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoute from "../components/privateRoute";
import MyCars from "../pages/MyCars";
import AddCar from "../pages/AddCar";
import EditCar from "../pages/Edit";

export default function AllRoutes(){
    return <Routes>
        <Route path='/add' element={<PrivateRoute><AddCar /></PrivateRoute>}></Route>
        <Route path='/' element={<PrivateRoute><MyCars /></PrivateRoute>}></Route>
        <Route path='/car/:id' element={<PrivateRoute><EditCar /></PrivateRoute>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
    </Routes>
}