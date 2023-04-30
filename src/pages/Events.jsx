import Image from "next/image"
import data from "./data/data"
import Navbar from "@/components/Navbar"

function Events(){


console.log("aa gya", data)
return (
    <>

<Navbar/>


<div className="event"><p>Events in Bengluru</p></div>
    <div  id="parent">
 
    {data.length>0&&data.map((el)=>{
        return (
            <div key={el.id}>
                <Image id="img" src={el.img} width="250" height="425" alt={el.title}/>
                <h4 className="title">{el.title}</h4>
                <p className="stream">{el.streaming}</p>
                <p className="price"> Rs: {el.price} </p>
            </div>
        )
    })}
        
    </div>
   
    </>
)

}

export default Events

