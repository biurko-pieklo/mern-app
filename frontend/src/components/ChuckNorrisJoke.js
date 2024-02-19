import { useState } from "react";

const ChuckNorrisJoke = () => {
    const [joke, setJoke] = useState('');

    const fetchJoke = async () => {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const json = await response.json();

        if (response.ok) {
            setJoke(json.value)
        }
    }

    if (!joke) {
        fetchJoke();
    }

    return (
        <div>
            <h4>Random Chuck Norris joke</h4>
            <p>{joke}</p>
        </div>
    )
}

export default ChuckNorrisJoke;