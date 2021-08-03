import React, { useState, useMemo, useEffect } from 'react'

import Info from './Info'

export default function Login({ counter }) {
    const [info, setInfo] = useState({ username: '', password: '' })
    const [authCounter, setAuthCounter] = useState(0)
    
    useEffect(() => {
        if (!Object.keys(sessionStorage).includes('passed')) {
            console.log('passed not found')
            sessionStorage.setItem('passed', false)
        }
    }, [])
    
    let passed = useMemo(() => {
        console.log( sessionStorage.getItem('passed') === 'true' ? true : false )
        return sessionStorage.getItem('passed') === 'true' ? true : false 
    }, [authCounter])

    let infos = useMemo(() => {
        let infos = Object.entries(localStorage).filter(info => info[0] !== 'id')
        for (let i=0;i<infos.length-1;i++) {
            let sorted = true
            for (let j=0;j<infos.length-1;j++) {
                if (parseInt(infos[j][0][infos[j][0].length-1]) > parseInt(infos[j+1][0][infos[j+1][0].length-1])) {
                    const temp = infos[j]
                    infos[j] = infos[j+1]
                    infos[j+1] = temp
                    sorted = false
                }
            }
            if (sorted) {
                break
            }
        }
        const groupedInfos = []
        let group = []
        let arrangedGroup = []
        for (let i=0;i<infos.length;i++) {
            group.push(infos[i])
            if (i%2===1) {
                if (group[0][0].includes('password')) {
                    arrangedGroup.push(group[1])
                    arrangedGroup.push(group[0])
                } else {
                    arrangedGroup = group
                }
                groupedInfos.push(arrangedGroup)
                group = []
                arrangedGroup = []
            }
        }
        return groupedInfos
    }, [counter])


    const handleSubmit = (e) => {
        e.preventDefault()
        for (let i=0;i<infos.length;i++) {
            if (infos[i][0][1] === info.username && infos[i][1][1] === info.password) {
                sessionStorage.setItem('passed', true)
                setAuthCounter(authCounter + 1)
            }
        }
        setInfo({ username: '', password: '' })
    }

    const handleLogOut = () => {
        sessionStorage.setItem('passed', false)
        setAuthCounter(authCounter + 1)
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username: </label>
                <input id='username' type='text' value={info.username} onChange={e => setInfo({ ...info, username: e.target.value })} />
                <label htmlFor='password'>Password: </label>
                <input id='password' type='text' value={info.password} onChange={e => setInfo({ ...info, password: e.target.value })}/>
                <button type='submit'>Submit</button>
            </form>
           { passed ? <Info /> : <p>Login Not Passed</p> }
           <button onClick={handleLogOut}>Log Out</button>
        </div>
    )
}
