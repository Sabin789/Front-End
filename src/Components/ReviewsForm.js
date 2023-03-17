import { useState } from 'react';
import {Button,Form }from 'react-bootstrap';



const ReviewsForm = ({id}) => {
    const[comment,setComment]=useState("")
    const[rate,setRating]=useState("")
    const newReview={comment,rate}
  

    const postRev=async(review)=>{
        let url=process.env.REACT_APP_BE_URL+"/products/"+id+"/reviews"  
        try{
            const res= await fetch(url,{
                method:"POST",
                headers:{
                  "Content-Type":"application/json"
          
                },
                body:JSON.stringify(review)
    
              })
             
     
              const jsonRes=await res.json()
              console.log(jsonRes)
            
              
        }catch(err){
            console.log(err)
        }
    }


    const submitReview=(e)=>{
        e.preventDefault()
        postRev(newReview)
    }
    return ( <Form>
   

     
 
        
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Review</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Tell us what you think"
          value={comment.value}
          onChange={(e)=>{setComment(e.target.value)}}
           
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Rating</Form.Label>
          <Form.Control 
          type="number" 
          placeholder="Rate our product"
          value={rate.value}
          onChange={(e)=>{setRating(e.target.value)}}
          />
        </Form.Group>
       <Button type='submit' variant='primary' onClick={(e)=>submitReview(e)}>Submit</Button>
     
      </Form> );
}
 
export default ReviewsForm;