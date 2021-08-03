import { useState, useMemo } from 'react'

//only store while the user is using the application

function App() {
  const [info, setInfo] = useState({ firstName: '', lastName: '', age: 0 })
  if (!Object.keys(localStorage).includes('num')) {
    localStorage.setItem('num', 1)
  }
  const num = parseInt(localStorage.getItem('num'))

  const handleSubmitInfo = (e) => {
    e.preventDefault()
    sessionStorage.setItem(`firstName${num}`, info.firstName)
    sessionStorage.setItem(`lastName${num}`, info.lastName)
    sessionStorage.setItem(`ageName${num}`, info.age)
    setInfo({ firstName: '', lastName: '', age: 0 })
    localStorage.setItem('num', num+1)
  }

  let infos = Object.entries(sessionStorage)
  let groupInfos = []
  let group = []

  groupInfos = useMemo(() => {
    for (let i=0;i<infos.length-1;i++) {
      let sorted = true
      for (let j=0;j<infos.length-1;j++) {
        if (parseInt(infos[j][0][infos[j][0].length-1]) > parseInt(infos[j+1][0][infos[j+1][0].length-1])) {
          let temp = infos[j]
          infos[j] = infos[j+1]
          infos[j+1] = temp
          sorted = false
        }
      }
      if (sorted) {
        break
      }
    }
    for (let i=0;i<infos.length;i++) {
      group.push(infos[i])
      if (i%3===2) {
        groupInfos.push(group)
        group = []
      }
    }
    console.log(groupInfos)
    return groupInfos
  }, [num])


  return (
    <div>
      <form onSubmit={handleSubmitInfo}>
        <input type='text' value={info.firstName} onChange={e => setInfo({ ...info, firstName: e.target.value })} />
        <input type='text' value={info.lastName} onChange={e => setInfo({ ...info, lastName: e.target.value })} />
        <input type='number' value={info.age} onChange={e => setInfo({ ...info, age: parseInt(e.target.value) })} />
        <button type='submit'>Submit</button>
      </form>
      {groupInfos.map(group => {
        return (
          <div>
            <p>{group[0][1]}</p>
            <p>{group[1][1]}</p>
            <p>{group[2][1]}</p>
          </div>
        )
      })}
      <p>{num}</p>
    </div>
  )
}

export default App