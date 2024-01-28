import { useEffect, useState } from "react";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import Userdesc from "./Userdesc";
import PostActions from "./PostActions";

const Post = ({ post }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('/api/users/' + post.userId);
            const json = await response.json();

            if (response.ok) {
                setUser(json);
            }
        }

        fetchUser();
    }, [post.userId]);

    const createdDate = formatDistanceToNow(new Date(post.createdAt), {
        addSuffix: true,
    });

    return (
        <div className = "post">
            <div className = "post__header">
                {user && <Userdesc key = {post.userId} user = {user} />}
                <PostActions post = {post}/>
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
