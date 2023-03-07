import { useEffect, useState } from "react"
import { Button, Col,Row ,Card} from "react-bootstrap"

const Products = () => {
let [prod, setProd]=useState("")
const fetchProd= async()=>{
    let url=process.env.REACT_APP_BE_URL+"/products/"

    try{
        let res=await fetch(url)
    

            const data=await res.json()
           setProd(data)
        
   
    }catch(err){
        console.log(err)
    }
}

useEffect(()=>{

    fetchProd()
    console.log(prod.imageUrl)
},[])
    return ( <>
    <Row className="mt-5">
    {prod==="" ?"Loading": prod.map((m)=>{
        return <>
    
        <Col sm={12} md={4}  lg={3}key={m._id}>
      {/* <img className="prod-pic" src={m.imageUrl}alt="product-pic"></img>
      <p>{m.name}</p> */}


      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top"  src={m.imageUrl}/>
      <Card.Body>
        <Card.Title>{m.name}</Card.Title>
        <Card.Text className="mt-5">
          Description:{m.description}
          <br/>
          Price:{m.price}
        </Card.Text>
        <Button variant="info">Edit</Button>
      <Button variant="danger">Delete</Button>
      </Card.Body>
    </Card>
      </Col>


      </>
      
    })}
    </Row>
    </> );
}
 
export default Products;