import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(email, password);
    }

    return (
        <form className='login' onSubmit={handleSubmit}>
            <h2>Log in</h2>

            <input
                type = 'email'
                placeholder = 'Username'
                onChange = {(e) => setEmail(e.target.value)}
                value = {email}
            />
            <input
                type = 'password'
                placeholder = 'Password'
                onChange = {(e) => setPassword(e.target.value)}
                value = {password}
            />

            <button>Log in</button>
        </form>
    )
}

export default Login;