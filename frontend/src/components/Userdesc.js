const Userdesc = ({ user }) => {
    return (
        <div className = "post__author">
            <h4>{user.displayname}</h4>
        </div>
    );
}

export default Userdesc;