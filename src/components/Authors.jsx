import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../queries"
import SetBirthYear from "./SetBirthYear"

// eslint-disable-next-line react/prop-types
const Authors = ({authors, show}) => {
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })

  // eslint-disable-next-line react/prop-types
  if (show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {/* eslint-disable-next-line react/prop-types */}
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* eslint-disable-next-line react/prop-types */}
      <SetBirthYear/>
    </div>
  )
}

export default Authors