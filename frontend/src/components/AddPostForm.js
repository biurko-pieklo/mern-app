import { useEffect, useState } from "react";
import { usePostsContext } from '../hooks/usePostsContext';
import { useAuthContext } from "../hooks/useAuthContext";

const AddPostForm = () => {
    const { dispatch } = usePostsContext();
    const [content, setContent] = useState('');
    const { user } = useAuthContext();
    const [userId, setUserId] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (!user) {
            return;
        }

        const fetchUserId = async () => {
            const response = await fetch('/api/users/getByUsername/' + user.username);
            const json = await response.json();

            if (response.ok) {
                setUserId(json);
            }
        }

        fetchUserId();
    });


    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in');
            return ;
        }

        const post = {content, userId};

        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        } else {
            setContent('');
            setError(null);
            setSuccess('Post added!');

            dispatch({
                type: 'CREATE_POST',
                payload: json
            });

            setTimeout(() => {
                setSuccess(null);
            }, 1500);
        }
    }

    return (
        <form className = "create" onSubmit = {handleSubmit}>
            <h4>Add a new post</h4>
            <textarea
                placeholder = "Post content..."
                onChange = {(e) => setContent(e.target.value)}
                value = { content }
            ></textarea>

            <button type = "submit">Add post</button>
            { error && <div className = "error">{error}</div> }
            { success && <div className = "success">{success}</div> }
        </form>
    );
}

export default AddPostForm;
