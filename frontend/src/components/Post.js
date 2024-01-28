import { useEffect, useState } from "react";

import Userdesc from "./Userdesc";

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
    }, []);

    const createdDate = new Date(post.createdAt);

    return (
        <div className = "post">
            {user && <Userdesc key = {post.userId} user = {user} />}
            <div className = "post__content">
                <p>{post.content}</p>
            </div>
            <div className = "post__footer">
                <p>{createdDate.toUTCString()}</p>
            </div>
        </div>
    );
}

export default Post;
