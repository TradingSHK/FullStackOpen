import { useState } from 'react'
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { useMutation } from '@apollo/client/react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';
import { AUTHORUPDATEERROR } from '../const';

const SetBirthyear = ({ allAuthors, setError }) => {
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      let errorMessage = AUTHORUPDATEERROR;
      if (error instanceof CombinedGraphQLErrors) {
        errorMessage = error.errors.map(e => e.message).join(', ')
      }
      setError(errorMessage)
    }
  }) 

  const handleSubmit = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name: selectedAuthor, setBornTo: parseInt(born) }})
    setSelectedAuthor('')
    setBorn('')
  }

  return (
    <>
      <h3>Set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="author-name">author</label>
        <select
          id="author-name"
          name="name"
          value={selectedAuthor}
          onChange={({ target }) => setSelectedAuthor(target.value)}
        >
          <option value="">Select...</option>
          {allAuthors.map((author) => (
            <option key={author.id} value={author.name}>{author.name}</option>
          ))}
        </select>
        { selectedAuthor &&
          <>
            <div>
            <label htmlFor="author-born">born</label>
            <input
              id="author-born"
              type="number"
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
            </div>
            <button type="submit">Update author</button>
          </>
        }
      </form>
    </>
  )
}

export default SetBirthyear