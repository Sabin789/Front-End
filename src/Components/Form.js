import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const FormComponent = () => {

const[name,setName]=useState("")
const[category,setCategory]=useState("")
const[price,setPrice]=useState("")
const[description,setDescription]=useState("")
const[brand,setBrand]=useState("")


const newProduct={name,category,price,description,brand}


useEffect(()=>{
    console.log(name)
  
},[name])
const postProd=async(product)=>{
    let url=process.env.REACT_APP_BE_URL+"/products/"

    try{
        const res= await fetch(url,{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
      
            },
            body:JSON.stringify(product)

          })
         
 
          const jsonRes=await res.json()
          console.log(jsonRes)
        
          
    }catch(err){
        console.log(err)
    }
}


const submitProd=(e)=>{
    e.preventDefault()
    postProd(newProduct)
}

    return ( <>
      <Form onSubmit={()=>console.log("hello")}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Name</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter Product Name" 
        value={name.value}
        onChange={(e)=>setName(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Category</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Product Category" 
        value={category.value}
        onChange={(e)=>setCategory(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Product Description"
        value={description.value}
        onChange={(e)=>setDescription(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Brand</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Product Brand" 
        value={brand.value}
        onChange={(e)=>setBrand(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control 
        type="number" 
        placeholder="Product Price"
        value={price.value}
        pattern={[0-9]}
        onChange={(e)=>setPrice(parseInt(e.target.value))} />
      </Form.Group>
   
     
      <Button variant="primary" type="submit"
      onClick={(e)=>submitProd(e)}
      >
        Submit
      </Button>
    </Form>
    </> );
}
 
export default FormComponent;