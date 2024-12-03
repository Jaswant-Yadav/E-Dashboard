
import './App.css';
import Navbar from './Component/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Component/SignUp';
import PrivateComponent from './Component/PrivateComponent';
import Login from './Component/Login';
import AddProduct from './Component/AddProduct';
import ProductList from './Component/ProductList';
import UpdateProduct from './Component/UpdateProduct';
import Update from './Update';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element ={<PrivateComponent />}>
        <Route path='/' element = {<ProductList />} />
        <Route path='/add' element = {<AddProduct />} />
        <Route path='/update' element = {<Update />} />
        <Route path='/update/:id' element = {<UpdateProduct />} />
        <Route path='/Logout' element = {<h1>Logout Component</h1>} />
        <Route path='/profile' element = {<h1>Profile</h1>} />
        </Route>

        <Route path='/signup' element = {<Signup />} />
        <Route path='/login' element = {<Login />} />

      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
