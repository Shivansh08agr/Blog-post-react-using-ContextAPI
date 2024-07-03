import React from 'react'
import Feed from './Feed'
import { useContext } from 'react'
import DataContext from "../context/DataContext"

const Home = () => {
  const { posts, searchResults } = useContext(DataContext);
  return (
    <main className='Home'>
      {(posts.length ?
        (<Feed posts={searchResults} />) : (
          <p className='statusMsg'>No Post to display</p>
        ))}
    </main>
  )
}

export default Home