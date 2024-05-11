'use client'

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react'
import Image from 'next/image'
import { ArticlesContext } from '@/context/ArticlesContext'
import { Article } from '@/types/ArticleTypes'

export default function NewsPage() {

  const [articles, setArticles] = useState<Article[] | null>(null)
  const { fetchAllArticles } = useContext(ArticlesContext)

  useEffect(() => {
    fetchAllArticles()
  })

  return (
      <div className='bg-white text-black p-6 rounded shadow-md'>
        <ul>
        {articles && Object.values(articles)
            .filter((article) => article.id !== undefined)
            .reverse()
            .map((article) => (
              <li key={article.id}>
              <div>
                <strong>{article.title}</strong>
                {/* <Image src={article.imageUrl} alt={article.imageText} width="100" height="100" /> */}
                <Image src="/TestImage.jpg" alt="Freja walking in forest." width={100} height={100} />
                {article.body}
                <br />
                <hr></hr>
              </div>
            </li>
          ))}
        </ul>
      </div>
  )
}
