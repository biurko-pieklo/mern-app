import { useState } from 'react';
import { useRegister } from '../hooks/useRegister';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {register, isLoading, error} = useRegister();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await register(username, password);
    }

    return (
        <form className='register' onSubmit={handleSubmit}>
            <h2>Register</h2>

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

            <button disabled = {isLoading}>Register</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Register;