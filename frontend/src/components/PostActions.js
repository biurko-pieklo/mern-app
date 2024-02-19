import { useAuthContext } from "../hooks/useAuthContext";
import { usePostsContext } from "../hooks/usePostsContext";

const PostActions = ({ post, author }) => {
    const { dispatch } = usePostsContext();
    const { user } = useAuthContext();

    const handleDelete = async () => {
        if (!user) {
            return;
        }

        const response = await fetch('/api/posts/' + post._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
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
            {author.username === user.username && <button className = "material-symbols-rounded" onClick={handleDelete}>delete</button>}
        </div>
    );
}

export default PostActions;