import React, { useEffect, useState } from 'react';
import {Button,Modal,Form }from 'react-bootstrap';


const ProductModal = ({handleClose,show,id}) => {

let [prod,setProd]=useState("")
let [image, setImg] = useState("");
  const handleImage = (e) => {
    console.log(e.target.files[0]);
    setImg(e.target.files[0]);
  }
const getSingle=async(id)=>{
    let url=process.env.REACT_APP_BE_URL+"/products/"+id
    try{
        let res =await fetch(url)
        if(res.ok){
            console.log(id)
           let jsonRes=await res.json()
           setProd(jsonRes)
          

        }
    }catch(err){
        console.log(err)
    }
}

useEffect(()=>{
 getSingle(id)
 
},[show])
const formData = new FormData();
formData.append("imageUrl", image);
const postImage=async(image)=>{
    const url=`${process.env.REACT_APP_BE_URL}/products/${id}/upload`
    try{

        const res=await fetch(url,{
        method:"POST",
        body:image
        })
        if(res.ok){
            const image=await res.json()
          setProd({...prod,imageUrl:image})
        }

    }catch(err){
        console.log(err)
    }
}

const updateProd=async(newProd)=>{
    const url=process.env.REACT_APP_BE_URL+"/products/"+id
    try{
     let res=await fetch(url,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
    
          },
          body:JSON.stringify(newProd)

        })
        console.log(newProd)
       if(res.ok){
        setProd(newProd)
     
       }
     
    
    }catch(err){
        console.log.log(err)
    }
}

const update=(product,pic)=>{
   updateProd(product)
   postImage(pic)
}
    return ( <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit {prod.name}</Modal.Title>
        </Modal.Header>
        {prod ? 
        <Modal.Body>
        <Form>
   

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Category</Form.Label>
        <Form.Control 
        type="text" 
   
        value={prod.category}
        onChange={(e)=>setProd({
            ...prod,
            category: e.target.value,
          })}
       />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Product Description"
        value={prod.description}
        onChange={(e)=>setProd({
            ...prod,
            description: e.target.value,
          })}
  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Brand</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Product Brand" 
        value={prod.brand}
        onChange={(e)=>setProd({
            ...prod,
            brand: e.target.value,
          })}
      />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control 
        type="number" 
        placeholder="Product Price"
         value={prod.price}
         onChange={(e)=>setProd({
            ...prod,
            price: e.target.value,
          })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Image</Form.Label>
        <Form.Control 

        placeholder="Product Brand" 
        // value={prod.imageUrl}
        type="file"
        accept="image/*"
        onChange={handleImage}
      />
      </Form.Group>
     
  
    </Form>
        </Modal.Body>
        :""}
        <Modal.Footer>
          
          <Button variant="primary" type='submit'  onClick={()=>update(prod,formData)}>Save</Button>
        </Modal.Footer>
      </Modal>);
}
 
export default ProductModal;