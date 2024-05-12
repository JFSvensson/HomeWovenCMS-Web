'use client'

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react'
import { Article } from '@/types/ArticleTypes'

interface Props {
  children: ReactNode
}

type ArticlesContextType = {
  articles: Article[]
  fetchAllArticles: () => void
}

const defaultArticleValue: ArticlesContextType = {
  articles: [],
  fetchAllArticles: () => {},
}

export const ArticlesContext = React.createContext<ArticlesContextType>(defaultArticleValue)

export const ArticlesProvider: React.FC<Props> = ({ children }) => {
  const [articles, setArticles] = useState([])

  const fetchArticles = async () => {
    const API_ARTICLE_URL = 'https://svenssonom.se/homewovencms/api/v1/articles'

    try {
      const response = await fetch(API_ARTICLE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      const data = await response.json()
      setArticles(data)
    } catch (error) {
      console.error('Failed to fetch articles:', error)
    }
  }

  const debounce = (func: any, delay: any) => {
    let debounceTimer: any
    return function(this: any) {
      const context: any = this
      const args = arguments
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => func.apply(context, args), delay)
    }
  }

 const fetchAllArticles = debounce(fetchArticles, 5000)

  useEffect(() => {
    fetchAllArticles()
  })

  return (
    <ArticlesContext.Provider value={{ articles, fetchAllArticles }}>
      {children}
    </ArticlesContext.Provider>
  )
}

export const useArticles = () => useContext(ArticlesContext)
