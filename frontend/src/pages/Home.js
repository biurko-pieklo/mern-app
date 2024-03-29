import { useEffect } from 'react';
import { usePostsContext } from '../hooks/usePostsContext'; 

import Post from "../components/Post";
import AddPostForm from '../components/AddPostForm';
import ChuckNorrisJoke from '../components/ChuckNorrisJoke';

const Home = () => {
    const {posts, dispatch} = usePostsContext();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/posts');
            const json = await response.json();

            if (response.ok) {
                dispatch({
                    type: 'SET_POSTS',
                    payload: json,
                });
            }
        }

        fetchPosts();
    }, [dispatch]);

    return (
        <div className = "home">
            <div className = "posts">
                {posts && posts.map((post) => (
                    <Post key = {post._id} post = {post} />
                ))}
            </div>
            <div className = 'sidebar'>
                <div className = 'sidebar__content'>
                    <AddPostForm />
                    <ChuckNorrisJoke />
                </div>
            </div>
        </div>
    );
}

export default Home;
