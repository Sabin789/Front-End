import { useEffect, useState } from "react";
import { Container,Button } from "react-bootstrap";
import ReviewModal from "./ReviewModal";

const ReviewsSection = ({id}) => {

const[rev,setRev]=useState([])
const[rid,setRid]=useState("")
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const showAndSet=(i)=>{
    setRid(rid)
    handleShow()
}
const getRevs=async()=>{
    let url=process.env.REACT_APP_BE_URL+"/products/"+id+"/reviews"  

    try{
     const res=await fetch(url)

     if(res.ok){

        const data=await res.json()
        console.log(data)
        setRev(data)
     }
    }catch(err){

    }
}
useEffect(()=>{
    getRevs()
},[])
const deleteProd=async(reid)=>{
    let url=process.env.REACT_APP_BE_URL+"/products/"+id+"/reviews/"+reid
    try{
     let res= await fetch(url,
        {
            method:"DELETE",    
            headers:{
              "Content-Type":"application/json"
      
            },
          
          })
          if(res.ok){
            console.log("deleted")
          }
    }catch(err){
        console.log(err)
    }
}

    return ( <Container>
        {rev===""?"Loading": rev.map((r)=>{
            return<>
                <h3>{r.comment}</h3>
                <h3>{r.rate}</h3>
                <Button variant="info" onClick={()=>showAndSet(r._id)}>Edit</Button>
                <Button variant="danger" onClick={()=>deleteProd(r._id)}>Delete</Button>
                <ReviewModal handleClose={handleClose} show={show} id={id} rid={r._id}/>
                </>
        })}

    </Container> );
}
 
export default ReviewsSection;