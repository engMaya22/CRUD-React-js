import React from 'react'
import usePostDetails from '../hooks/use-post-details';
import Loading from '../components/Loading';

export default function Detail() {

  const {loading, error , record} = usePostDetails();
  return (
    <div>
      <Loading isLoading={loading} error={error}>
           
              <p>Title: {record?.title}</p>
              <p>Description: {record?.description}</p>
         {/* we need to ? for not error  throw when not object created yet in runtime*/}
      </Loading>
    </div>
  )
}
