import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useContext } from 'react';
import DataContext from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';

const EditPost = () => {
    const { posts, setPosts } = useContext(DataContext);
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const navigate = useNavigate();

    function handleEdit(id) {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        setPosts(posts.map(post => post.id === id ? { ...updatedPost } : post));
        const allPosts = posts.map(post => post.id === id ? { ...updatedPost } : post);
        localStorage.setItem("savedBlogs", JSON.stringify(allPosts));
        setEditTitle('');
        setEditBody('');
        navigate('/');
    }

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])

    return (
        <main className="NewPost">
            <>
                <h2>Edit Post</h2>
                <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="postTitle">Title:</label>
                    <input
                        id="postTitle"
                        type="text"
                        required
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <label htmlFor="postBody">Post:</label>
                    <textarea
                        id="postBody"
                        required
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}
                    />
                    <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
                </form>
            </>
        </main>
    )
}

export default EditPost