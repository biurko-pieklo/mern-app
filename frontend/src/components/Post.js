import { useEffect, useState } from "react";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import Userdesc from "./Userdesc";
import PostActions from "./PostActions";
import { useAuthContext } from "../hooks/useAuthContext";

const Post = ({ post }) => {
    const [author, setAuthor] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchAuthor = async () => {
            const response = await fetch('/api/users/' + post.userId);
            const json = await response.json();

            if (response.ok) {
                setAuthor(json);
            }
        }

        fetchAuthor();
    }, [post.userId]);

    const createdDate = formatDistanceToNow(new Date(post.createdAt), {
        addSuffix: true,
    });

    return (
        <div className = "post">
            <div className = "post__header">
                {author && <Userdesc key = {post.userId} user = {author} />}
                {author && user && <PostActions post = {post} author = {author} />}
            </div>
            <div className = "post__content">
                <p>{post.content}</p>
            </div>
            <div className = "post__footer">
                <p>{createdDate}</p>
            </div>
        </div>
    );
}

export default Post;
