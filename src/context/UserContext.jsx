import { createContext, useEffect, useState } from "react";
export let UserContext =createContext(0);

 export default function UserContextProvider(props){
 
    const [userLogin , setuserLogin]=useState(null)
    useEffect(()=>{
        if(localStorage.getItem('userToken') !== null)
                {
                        setuserLogin(localStorage.getItem('userToken'))
                }
    },[])

    return <UserContext.Provider value={{userLogin , setuserLogin}}>
            {props.children}
    </UserContext.Provider>

}