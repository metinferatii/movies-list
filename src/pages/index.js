import React, { useState } from "react"
import MoviesList from "../components/MoviesList"

export default function Home(data) {
  const [searchValue, setSearchValue] = useState('Iron_Man');

  return (
    <main
      className="flex flex-col items-center justify-between min-h-screen p-24 bg-white"
    >
    <MoviesList data={data} />
    </main>
  )
}


export async function getServerSideProps (searchValue) {

  const res = await fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_API_KEY}`)
  const data = await res.json()

  return {
    props: {
      user: data
    }
  }
}
