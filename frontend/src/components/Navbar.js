import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleLogout = () => {
        logout();
    }

    return(
        <header>
            <div className = "container">
                <Link to = "/">
                    <h1>SM</h1>
                </Link>
                {!user && (
                    <nav>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </nav>
                )}
                {user && (
                    <nav>
                        <span>{user.displayname && user.displayname || user.username && user.username}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </nav>
                )}
            </div>
        </header>
    );
}

export default Navbar;
