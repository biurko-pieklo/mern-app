import { usePostsContext } from "../hooks/usePostsContext";

const PostActions = ({ post }) => {
    const { dispatch } = usePostsContext();

    const handleDelete = async () => {
        const response = await fetch('/api/posts/' + post._id, {
            method: 'DELETE'
        });

        const json = await response.json();

        if (response.ok) {
            dispatch({
                type: 'DELETE_POST',
                payload: json
            });
        }
    }

    return (
        <div className = "post__actions">
            <button onClick={handleDelete}>delete</button>
        </div>
    );
}

export default PostActions;