import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'
import { ALL_AUTHORS, EDIT_BIRTH_YEAR } from '../queries'

// eslint-disable-next-line react/prop-types
const SetBirthYear = ({ setError }) => {
  const [bornYear, setBornYear] = useState(1)
  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  })
  const authorOptions = authors && authors.data && authors.data.allAuthors
    ? authors.data.allAuthors.map((a) => ({ value: a.name, label: a.name }))
    : []

  const [selectedAuthor, setSelectedAuthor] = useState(authorOptions[0])

  const [editAuthor, result] = useMutation(EDIT_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log('error: ', error)
      setError(error.toString())
    },
  })



  useEffect(() => {
    if (result.data && !result.data.editAuthor) {
      setError('name not found')
    }
  }, [result.editAuthor]); // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    const name = selectedAuthor.value
    let born = bornYear ? Number(bornYear) : 0
    console.log('update author...', name, ' born: ', born)

    await editAuthor({ variables: { name, setBornTo: born } })
    setSelectedAuthor(authorOptions[0])
    setBornYear(1)
  }

  return (
    <div>
      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            defaultValue={selectedAuthor}
            onChange={setSelectedAuthor}
            options={authorOptions}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={bornYear}
            onChange={({ target }) => setBornYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirthYear