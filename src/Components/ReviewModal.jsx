import { useEffect, useState } from "react";
import { Modal,Button,Form } from "react-bootstrap";


const ReviewModal = ({show,handleClose,id,rid}) => {
const [rev,setRev]=useState("")
    const getSingle=async(id)=>{
        let url=process.env.REACT_APP_BE_URL+"/products/"+id+"/reviews/"+rid
        try{
            let res =await fetch(url)
            if(res.ok){
                console.log(id)
               let jsonRes=await res.json()
               setRev(jsonRes)
            
              console.log(rev)
    
            }
        }catch(err){
            console.log(err)
        }
    }

    const updateRev=async(newRev)=>{
        const url=process.env.REACT_APP_BE_URL+"/products/"+id+"/reviews/"+rid
        try{
         let res=await fetch(url,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
        
              },
              body:JSON.stringify(newRev)
    
            })
       
           if(res.ok){
            setRev(newRev)
         
           }
         
        
        }catch(err){
            console.log.log(err)
        }
    }

    
    useEffect(()=>{
     getSingle(id)
     
    },[show])
    return (  <>

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Comment</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Comment" 
         value={rev.comment}
        onChange={(e)=>setRev({
            ...rev,
            comment: e.target.value,
          })}
      />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Rate</Form.Label>
        <Form.Control 
        type="number" 
        placeholder="Rate" 
        value={rev.rate}
        onChange={(e)=>setRev({
            ...rev,
            rate: e.target.value,
          })}
      />
      </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>updateRev(rev)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>);
}
 
export default ReviewModal;