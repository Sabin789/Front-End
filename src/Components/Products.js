import { useEffect, useState } from "react"
import { Button, Col,Row ,Card} from "react-bootstrap"
import ProductModal from "./ProductModal"
import { Link } from "react-router-dom";
const Products = () => {
let [prod, setProd]=useState("")
const [id,setId]=useState("")
const [show, setShow] = useState(false);
const [pages,setPages]=useState([])
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const showAndSet=(i)=>{
    setId(i)
    handleShow()
}

const fetchProd= async()=>{
    let url=process.env.REACT_APP_BE_URL+"/products"//?offset=0&limit=1"

    try{
        let res=await fetch(url)

        const data=await res.json()

        const allProducts=data.allProducts
     const links=data.links
  
        setProd(allProducts)
        setPages(pages.push(links))
        console.log(pages)
     
    }catch(err){
        console.log(err)
    }
}
const deleteProd=async(id)=>{
    let url=process.env.REACT_APP_BE_URL+"/products/"+id
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
useEffect(()=>{

    fetchProd()
   console.log(prod)
},[])
    return ( <>
     <Row className="mt-5">
    {prod==="" ?"Loading": prod.map((m)=>{
        
        return <>
    
        <Col sm={12} md={4}  lg={3} key={m._id}>
      <Card style={{ width: '18rem' }}>
     <Link to={"/details/"+m._id}> <Card.Img variant="top"style={{ height: '14rem' }}  src={m.imageUrl}/></Link>
      <Card.Body>
        <Card.Title>{m.name}</Card.Title>
        <Card.Text className="mt-5">
          Description:{m.description}
          <br/>
          Price:{m.price}$
          <br/>
          Category:{m.category}
          <br/>
          Brand:{m.brand}
        </Card.Text>
        <Button variant="info" onClick={()=>showAndSet(m._id)} >Edit</Button>
      <Button variant="danger" onClick={()=>deleteProd(m._id)}>Delete</Button>
      </Card.Body>
    </Card>
      </Col>
     <ProductModal handleClose={handleClose} show={show} id={id}/>
 
      </>
   
    })}

    </Row> 
    </> );
}
 
export default Products;