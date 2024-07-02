import React from 'react'
import Feed from './Feed'
import { useContext } from 'react'
import  DataContext from "./context/DataContext"

const Home = () => {
  const {posts, searchResults, fetchError, isLoading}= useContext(DataContext);
  return (
    <main className='Home'>
      
      {!fetchError && isLoading && <p className='statusMsg'>Loading Posts...</p>}
      {!isLoading && fetchError && <p className= 'statusMsg' style={{color: "red"}}>{fetchError}</p>}
      {!isLoading && !fetchError && (posts.length? 
        (<Feed posts = {searchResults}/>) : (
          <p className='statusMsg'>No Post to display</p>
        ))}
    </main>
  )
}

export default Home