import React from 'react'

export default function Loading({isLoading , error , children}) {
  return (
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
