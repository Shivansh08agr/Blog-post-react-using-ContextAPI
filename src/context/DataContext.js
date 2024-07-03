import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState(
        JSON.parse(localStorage.getItem("savedBlogs")) || []
    );
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const filteredResults = posts.filter((post) =>
            ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase()));

        setSearchResults(filteredResults.reverse());
    }, [posts, search])

    return (
        <DataContext.Provider value={{
            search, setSearch, searchResults, setSearchResults, posts, setPosts
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;