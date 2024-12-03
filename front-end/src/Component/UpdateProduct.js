import React, { useEffect } from "react";
import './UpdateProduct.css';
import { useParams, useNavigate } from "react-router-dom";


const UpdateProduct = () => {

    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {

        let data = await fetch(`http://localhost:5000/products/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        data = await data.json();

        setName(data.name);
        setPrice(data.price);
        setCategory(data.category);
        setCompany(data.company);
    }

    const UpdateProduct = async () => {

        let result = await fetch(`http://localhost:5000/products/${params.id.trim()}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();

        navigate('/')
    }

    return (
        <div className="Update-Product">

            <h1>Update Product</h1>

            <input className="inputBox" type="text" placeholder="Enter product name"
                onChange={(e) => { setName(e.target.value) }} value={name} />

            <input className="inputBox" type="text" placeholder="Enter product Price"
                onChange={(e) => { setPrice(e.target.value) }} value={price} />

            <input className="inputBox" type="text" placeholder="Enter product Company"
                onChange={(e) => { setCompany(e.target.value) }} value={company} />

            <input className="inputBox" type="text" placeholder="Enter product Category"
                onChange={(e) => { setCategory(e.target.value) }} value={category} />

            <button className="UpdateBtn" onClick={UpdateProduct}>Update Product</button>

        </div>
    )
}
export default UpdateProduct;