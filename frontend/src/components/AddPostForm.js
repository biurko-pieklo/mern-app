import { useState } from "react";

const AddPostForm = () => {
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('65889567ae87b18866fecf05');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    const handleSubmit = async(e) => {
        e.preventDefault();

        const post = {content, userId};

        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        } else {
            setContent('');
            setError(null);
            setSuccess('Post added!');

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
                value = {content}
            ></textarea>

            <button type = "submit">Add post</button>
            {error && <div className = "error">{error}</div>}
            {success && <div className = "success">{success}</div>}
        </form>
    );
}

export default AddPostForm;
