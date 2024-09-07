import React, { cloneElement } from 'react'

export default function Loading({isLoading , error , children}) {
    // console.log(children.type.render.displayName);
    const elementType = children.type.render.displayName;

    const renderHandler =()=>{
        if(elementType === 'Button'){
            // children is item i want to clone which is button ,
            //  disabled is props , loading text is added as children for button 
            const clonedButton = cloneElement(children, {disabled:true}, 'Loading ..');
            return (
                <>
                    {
                        isLoading 
                        ? 
                        clonedButton 
                        : error ? <>
                                    {children}
                                    <p> <br />{error}</p>
                                  </>
                                :
            
                                (children)
                    }
                </>
            )

        }
        return ( 
            // if not button
            <>
                {
                    isLoading 
                    ? 
                        <p>
                            Loading please wait ...
                        </p>
                        
                    : error ? 
                                <p>
                                    {error}
                                </p>
                            :
        
                            (children)
                }
            </>
          )


    }
  return renderHandler();
}
