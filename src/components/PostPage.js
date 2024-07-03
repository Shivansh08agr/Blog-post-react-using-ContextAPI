import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useContext } from 'react'
import DataContext from "../context/DataContext"
import { useNavigate } from "react-router-dom";

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find(post => post.id === id);
  const navigate = useNavigate();

  function handleDelete(id) {
    const postList = posts.filter(post => post.id !== id);
    setPosts(postList);
    localStorage.setItem("savedBlogs", JSON.stringify(postList));
    navigate('/');
  }
  return (
    <main className='PostPage'>
      <article className='post'>
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={`/edit/${post.id}`}><button className='editButton'>Edit Post</button></Link>
            <button className='deleteButton' onClick={() => handleDelete(post.id)}>Delete Post</button>
          </>
        }
        {!post &&
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to='/'>Visit Our Homepage</Link>
            </p>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage