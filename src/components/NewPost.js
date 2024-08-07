import React from "react";
import { useContext, useState } from 'react'
import DataContext from "../context/DataContext"
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const { posts, setPosts } = useContext(DataContext);
  const navigate = useNavigate();
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const id = posts.length ? (parseFloat(posts[posts.length - 1].id) + 1).toString() : '1';
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPost = [...posts, newPost];
    localStorage.setItem("savedBlogs", JSON.stringify(allPost));
    setPosts(allPost);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  }
  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
