import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(username, password);
    }

    return (
        <form className='login' onSubmit={handleSubmit}>
            <h2>Log in</h2>

            <input
                type = 'username'
                placeholder = 'Username'
                onChange = {(e) => setUsername(e.target.value)}
                value = {username}
            />
            <input
                type = 'password'
                placeholder = 'Password'
                onChange = {(e) => setPassword(e.target.value)}
                value = {password}
            />

            <button disabled={isLoading}>Log in</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Login;