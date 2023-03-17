import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import {Container } from 'react-bootstrap'
import ReviewsForm from "./ReviewsForm";
import ReviewsSection from "./ReviewsSection";

const SinglePrpduct = () => {
    const params=useParams()
    const id=params.productId
    let [prod, setProd]=useState("")
    const getSingle=async()=>{
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
    getSingle()
    },[])
    return ( <Container>
        <h1>{prod.name}</h1>
       <a href={`${process.env.REACT_APP_BE_URL}/products/${prod._id}/pdf`}><img src={prod.imageUrl} style={{height:"300px",width:"100%"}}></img></a>
<h3>Details</h3>

       <p>Category:{prod.category}</p>
       <p>Description:{prod.description}</p>
       <p>Brand:{prod.brand}</p>
       <p>Prce:{prod.price}$</p>


<ReviewsForm id={id}/> 
<ReviewsSection id={id}/>
    </Container> );
}
 
export default SinglePrpduct;