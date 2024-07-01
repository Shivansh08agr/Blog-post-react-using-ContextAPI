import Layout from "./Layout";
import Home from "./Home";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import api from './api/posts';
import useWindowSize from "./Hooks/useWindowSize";
import useAxiosFetch from "./Hooks/useAxiosFetch";

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();
  const {width} = useWindowSize();

  const {data, fetchError,isLoading} = useAxiosFetch('http://localhost:3500/posts')

  useEffect(() => {
    setPosts(data);
  }, [data])

  useEffect(() => {
    const filteredResults = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase())
      || post.body.toLowerCase().includes(search.toLowerCase()));
    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  async function handleSubmit(e) {
    e.preventDefault();
    const id = posts.length ? (parseFloat(posts[posts.length - 1].id) + 1).toString() : '1';
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post('/posts', newPost);
      const allPost = [...posts, response.data];
      setPosts(allPost);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  async function handleEdit(id) {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      console.log(response.data, updatedPost);
      setPosts(posts.map(post=> post.id ===id? {...response.data}: post));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/posts/${id}`);
      const postList = posts.filter(post => post.id !== id);
      setPosts(postList);
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <Routes>
      {/* Use Routes instead of Switch */}
      <Route
        path="/"
        element={<Layout search={search} setSearch={setSearch} width={width}/>}
      >
        {/* Correct way to define routes */}
        <Route index element={<Home 
          posts={searchResults}
          fetchError = {fetchError}
          isLoading = {isLoading}
        />} />
        <Route path="post">
          <Route index element={<NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />} />
          <Route path=":id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        </Route>
        <Route path="edit/:id" element={<EditPost
            posts= {posts}
            handleEdit={handleEdit}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
          />} />
        <Route path="about" element={<About />} /> {/* Use element prop */}
        <Route path="*" element={<Missing />} />
        {/* Use element prop for 404 */}
      </Route>
    </Routes>
  );
}

export default App;
