import React from 'react'

const ClientComponent = ({id,docId,data}) => {
  return (
    <div>
        {data?.map((g,gdx)=>{
        return(
            <div key={gdx}>{g?.id}  {g?.title}</div>
        )
      })}
    </div>
  )
}

export default ClientComponent