import React, { useEffect, useState } from "react";
import { useLazySearchBooksQuery } from "./store/googleBooks/googleBooks.api";
import "./index.css"
import { BiSearch } from 'react-icons/bi';
import BookList from "./components/bookList/BookList";
import { IItem } from "./models/models";

function App() {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<IItem[] | null>(null)
  const [firstQuery, setFirstQuery] = useState<boolean>(true)
  const [order, setOrder] = useState<string>("relevance")
  const [startIndex, setStartIndex] = useState<number>(0)
  const [limit, setLimit] = useState<number>(30)
  const [books, setBooks] = useState<IItem[] | null>(null)
  const [localLoading, setLocalLoading] = useState<boolean>(false)
  let [fetchBooks, { isLoading, data, isError }] = useLazySearchBooksQuery()

  useEffect(() => {
    setSelected([...(books ?? [])])
  }, [books])

  useEffect(() => {
    setBooks([...(books ?? []), ...(data?.items ?? [])])
  }, [data])

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setLocalLoading(true)
      setBooks(null)
      fetchBooks([search, "relevance", startIndex, limit])
      setStartIndex(30)
      setTimeout(() => {
        setFirstQuery(false)
      }, 700)
      setLocalLoading(false)
    }
  }

  const clickHandler = () => {
    setLocalLoading(true)
    setBooks(null)
    fetchBooks([search, "relevance", startIndex, limit])
    setStartIndex(30)
    setTimeout(() => {
      setFirstQuery(false)
      setLocalLoading(false)
    }, 700)
  }

  const selectCategoryHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value === "All" ? [...(books ?? [])] : [...(books ?? []).filter(book => book.volumeInfo.categories?.includes(event.target.value))])
  }

  const selectOrderHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    fetchBooks([search, event.target.value, startIndex, limit])
    setOrder(event.target.value)
  }

  const loadMoreBtnHandler = () => {
    setStartIndex(prev => prev + 30)
    console.log("startIndex", startIndex)
    fetchBooks([search, order, startIndex, limit])
  }

  console.log("localLoading", localLoading)

  return (
    <div className="App">
      {isError && <p className="errorMessage">Something went wrong</p>}
      <div className="inputContainer">
        <input onKeyDown={keyDownHandler} className="input" type="text" placeholder="Search for book..." value={search} onChange={e => setSearch(e.target.value)}
        />
        <button onClick={clickHandler} className="searchButton"><BiSearch /></button>
      </div>
      <div className="allSelects">
        <div>
          <span>Categories </span>
          <select onChange={selectCategoryHandler}>
            <option value="All">all</option>
            <option value="Art">art</option>
            <option value="Biography & Autobiography">biograpfy</option>
            <option value="Computers">computers</option>
            <option value="History">history</option>
            <option value="Medical">medical</option>
            <option value="Poetry">poetry</option>
          </select>
        </div>
        <div>
          <span>Sorting by </span>
          <select onChange={selectOrderHandler}>
            <option value="relevance">relevance</option>
            <option value="newest">newest</option>
          </select>
        </div>
      </div>
      {data && <div className="resultsFound"><span>Found {data?.totalItems} results</span></div>}
      <BookList localLoading={localLoading} isLoading={isLoading} data={data} selected={selected} firstQuery={firstQuery} />
      {data?.items.length !== undefined && !localLoading && <div><button onClick={loadMoreBtnHandler} className="loadMoreBtn">Load more</button></div>}
    </div>
  );
}

export default App;
