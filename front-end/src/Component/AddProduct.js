import React, { useState } from "react";
import './AddProduct.css';
import { json, useNavigate } from "react-router-dom";

const AddProduct = () => {

    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();

    const addProduct = async () => {
        console.log(name, price, category, company);
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }


        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log(result);
        navigate('/')
    }

    return (
        <div className="Product">
            <h1>Add Product</h1>

            <input className="inputBox" type="text" placeholder="Enter product name"
                onChange={(e) => { setName(e.target.value) }} value={name} />
            {error && !name && <span className="invalid-input">Enter valid Name</span>}

            <input className="inputBox" type="text" placeholder="Enter product Price"
                onChange={(e) => { setPrice(e.target.value) }} value={price} />
            {error && !price && <span className="invalid-input">Enter valid Price</span>}

            <input className="inputBox" type="text" placeholder="Enter product Company"
                onChange={(e) => { setCompany(e.target.value) }} value={company} />
            {error && !company && <span className="invalid-input">Enter valid Company</span>}

            <input className="inputBox" type="text" placeholder="Enter product Category"
                onChange={(e) => { setCategory(e.target.value) }} value={category} />
            {error && !category && <span className="invalid-input">Enter valid Category</span>}

            <button className="AddBtn" onClick={addProduct}>Add Product</button>

        </div>
    )
}
export default AddProduct;