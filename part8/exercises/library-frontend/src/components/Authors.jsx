import { useState } from "react"
import { ALL_AUTHORS, EDIT_BORN } from "./queries"
import { useMutation } from '@apollo/client/react'

const Authors = ({show, authors}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  
  const [editBorn] = useMutation(EDIT_BORN, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  if (!show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()

    editBorn({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  return (
      <div>
        <div>
          <h2>authors</h2>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>born</th>
                <th>books</th>
              </tr>
              {authors.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.born}</td>
                  <td>{a.bookCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3>Set birthyear</h3>
          <form onSubmit={submit}>
            <div>
              name 
              <select 
                value={name}
                onChange={({ target }) => setName(target.value)}
              >
                {authors.map((a) => (
                  <option value={a.name}>{a.name}</option>
                ))}
                
              </select>
            </div>
            <div>
              born 
              <input
                value={born}
                onChange={({ target }) => setBorn(Number(target.value))}
              />
            </div>  
            <button type="submit">update Author</button>     
          </form>
        </div>
      </div>
  )
}

export default Authors
