import { useSelector } from "react-redux";

export default function withGuard(Component) {//this pure js so useSelector not understand it
    const Wrapper =  ((props)=>{//this react component access children
        const {isLoggin} = useSelector(state => state.auth);
        return isLoggin ?  <Component {...props} /> : <div>Please login first!</div>//return this accessed children 
    })  
    return Wrapper;

}

