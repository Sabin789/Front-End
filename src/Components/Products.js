import { useEffect, useState } from "react"

const Products = () => {
let [prod, setProd]=useState("")
const fetchProd= async()=>{
    let url="https://amazon-backend-production-58aa.up.railway.app/products/"
    console.log(process.env.REACT_APP_BE_URL)
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
    {prod==="" ?"Loading": prod.map((m)=>{
        return <>
       < div key={m._id}>
      <img src={m.imageUrl}alt="product-pic"></img>
      <p>{m.name}</p>
      <button >Delete</button>
      </div>
      </>
      
    })}
    </> );
}
 
export default Products;