import React, { useState } from 'react'

export default function Registration({ counter, setCounter }) {
    if (!Object.keys(localStorage).includes('id')) {
        localStorage.setItem('id', 1)    
    }
    let id = parseInt(localStorage.getItem('id'))
    const [info, setInfo] = useState({ username: '', password: '' })
    
    // localStorage.removeItem('person1')

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem(`username${id}`, info.username)
        localStorage.setItem(`password${id}`, info.password)
        localStorage.setItem('id', id + 1)
        setInfo({ username: '', password: '' })
        setCounter(counter + 1)
    }
    
    return (
        <div>
            <h1>Registration</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username: </label>
                <input id='username' type='text' value={info.username} onChange={e => setInfo({ ...info, username: e.target.value })} />
                <label htmlFor='password'>Password: </label>
                <input id='password' type='text' value={info.password} onChange={e => setInfo({ ...info, password: e.target.value })}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
