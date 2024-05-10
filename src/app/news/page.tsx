'use client'

import React, { createContext, useState, useEffect, ReactNode } from 'react'
import Image from 'next/image'
import { Article } from '@/types/ArticleTypes'

export default function NewsPage() {

  const [articles, setArticles] = useState<Article[] | null>(null)
  
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
      console.log(data)
      setArticles(data)
    } catch (error) {
      console.error('Failed to fetch articles:', error)
    }
  }
  
  useEffect(() => {
    fetchArticles()
  }, [])
  

  return (
      <div  className='bg-white text-black p-6 rounded shadow-md'>
        <ul>
        {articles && Object.values(articles)
            .filter((article) => article.id !== undefined)
            .map((article) => (
              <li key={article.id}>
              <div>
                {article.title}
                {/* <Image src={article.imageUrl} alt={article.imageText} width="100" height="100" /> */}
                <Image src="/TestImage.jpg" alt="Freja walking in forest." width={100} height={100} />
                <div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
  )
}
