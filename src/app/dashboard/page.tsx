'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'
import { Article } from '@/types/ArticleTypes'
import { File } from '@/types/FileTypes'

export default function Home() {
  const router = useRouter()
  const { user } = useAuth()
  const [file, setFile] = useState<File | null>(null)
  const [article, setArticle] = useState<Article | null>(null)
  const [articles, setArticles] = useState<Article[] | null>(null)


  const API_ARTICLE_URL = 'https://svenssonom.se/homewovencms/api/v1/articles'

  useEffect(() => {
    let isMounted = true
  
    // If the user is not authenticated, redirect to the login page
    if (!user && isMounted) {
      router.push('/login')
    } else {
      fetchArticles()
    }
  
    // Cleanup function
    return () => {
      isMounted = false
    }
  }, [user, router])

  const fetchArticles = async () => {
    try {
      const response = await fetch(API_ARTICLE_URL)
      const data = await response.json()
      console.log('The articles: ', data)
      // Set the articles state
      setArticles(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('article', JSON.stringify(article))
    // if (file) {
    //   formData.append('file', file)
    // }

    try {
      await fetch(API_ARTICLE_URL, {
        method: 'POST',
        body: formData
      })
      fetchArticles()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <textarea value={article?.title} onChange={(e) => 
          setArticle({
            id: '',
            title: e.target.value,
            body: article?.body || '',
            imageUrl: '',
            imageText: article?.imageText || ''
          })} />

        <textarea value={article?.body} onChange={(e) => 
          setArticle({
            id: '',
            title: article?.title || '',
            body: e.target.value,
            imageUrl: '',
            imageText: article?.imageText || ''
          })} />

        <input type="file" onChange={(e) => 
          setFile({
            id: '',
            url: '',
            description: file?.description || '',
          })} />

        <textarea value={article?.imageText} onChange={(e) => 
          setArticle({
            id: '',
            title: article?.title || '',
            body: article?.body || '',
            imageUrl: '',
            imageText: e.target.value,
          })} />        
        <button type="submit">Submit</button>
      </form>

      <h2>Articles</h2>
      <ul>
      {articles && articles.map((article) => (
        <li key={article.id}>
          <p>{article.title}</p>
          <Image src={article.imageUrl} alt={article.imageText} />
        </li>
      ))}
      </ul>
    </main>
  )
}
