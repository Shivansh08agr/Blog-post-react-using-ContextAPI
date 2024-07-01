import React from 'react'
import Feed from './Feed'

const Home = ({posts, fetchError, isLoading}) => {
  return (
    <main className='Home'>
      
      {!fetchError && isLoading && <p className='statusMsg'>Loading Posts...</p>}
      {!isLoading && fetchError && <p className= 'statusMsg' style={{color: "red"}}>{fetchError}</p>}
      {!isLoading && !fetchError && (posts.length? 
        (<Feed posts = {posts} />) : (
          <p className='statusMsg'>No Post to display</p>
        ))}
    </main>
  )
}

export default Home