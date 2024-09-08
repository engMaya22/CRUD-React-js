import { cloneElement, useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function WithGuard({children}) {
    const {isLoggin} = useSelector((state)=>state.auth)
    // const navigate = useNavigate();
    // useEffect(()=>{
    //     if(!isLoggin){
    //         navigate('/')
    //     }

    // },[isLoggin , navigate])
    // const newElement = cloneElement(children , {tit:'tes'})
  return isLoggin? children : <div style={{color:'red'}}>please login</div>
}
