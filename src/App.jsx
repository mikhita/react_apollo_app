import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'



const App = () => {
  const [page, setPage] = useState('authors')
  const result = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS, {
    variables: { author: result.data?.allAuthors[0]?.name },
    skip: !page, 
  });
  

  if (result.loading || resultBooks.loading) {
    return <div>loading...</div>;
  }
  // eslint-disable-next-line no-unused-vars
  const authors = result.data ? result.data.allAuthors : [];
  // eslint-disable-next-line no-unused-vars
  const books = resultBooks.data ? resultBooks.data.allBooks : [];
  console.log(books)


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors authors={authors} show = {page !== 'authors'}  />

      <Books books={books} show={page !== 'books'} />

      <NewBook show={page !== 'add'} />
    </div>
  )
}

export default App