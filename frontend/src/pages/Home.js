import { useEffect, useState } from 'react';

import Post from "../components/Post";

const Home = () => {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/posts');
            const json = await response.json();

            if (response.ok) {
                setPosts(json);
            }
        }

        fetchPosts();
    }, []);

    return (
        <div className = "home">
            <div className = "posts">
                {posts && posts.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
}

export default Home;
