"use client"
import Navbar from '@/components/navbar'
import SearchResults from '@/components/SearchResults'

import { use } from 'react';

type Params = Promise<{ query: string }>


const SearchPage = (props:{params:Params}) => {
    const params=use(props.params);
    const query=params.query
  return (
   <>
   <Navbar/>
   <SearchResults query={query}/>
   </>
  )
}

export default SearchPage
