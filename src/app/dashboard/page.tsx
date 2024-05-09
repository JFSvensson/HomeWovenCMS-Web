'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/ui/button'
import { Article } from '@/types/ArticleTypes'
import { File } from '@/types/FileTypes'

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { logout } = useAuth()
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
      const response = await fetch(API_ARTICLE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })

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

  const handleLogout = async () => {
    try {
      logout()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main>
      <div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>

      <form onSubmit={handleSubmit} className='bg-white text-black p-6 rounded shadow-md'>
        <p>This is the Dashboards where you controll and create new articles.</p>
        <br />

        <div className='mb-4'>
        <label htmlFor="title" className='block text-sm font-bold mb-2'>Title</label>

        <textarea value={article?.title} onChange={(e) => 
          setArticle({
            id: '',
            title: e.target.value,
            body: article?.body || '',
            imageUrl: '',
            imageText: article?.imageText || ''
          })} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
        </div>

        <div className='mb-4'>
        <label htmlFor="body" className='block text-sm font-bold mb-2'>Body</label>
        <textarea value={article?.body} onChange={(e) => 
          setArticle({
            id: '',
            title: article?.title || '',
            body: e.target.value,
            imageUrl: '',
            imageText: article?.imageText || ''
          })} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
        </div>
        
        <div className='mb-4'>
        <label htmlFor="file" className='block text-sm font-bold mb-2'>Upload Image</label>
        <input type="file" onChange={(e) => 
          setFile({
            id: '',
            url: '',
            description: file?.description || '',
          })} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
        </div>
        
        <div className='mb-4'>
        <label htmlFor="imageText" className='block text-sm font-bold mb-2'>Image Text</label>
        <textarea value={article?.imageText} onChange={(e) => 
          setArticle({
            id: '',
            title: article?.title || '',
            body: article?.body || '',
            imageUrl: '',
            imageText: e.target.value,
          })} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />        
        </div>
        
        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Submit</button>
      </form>

      <br />
      
      <div className='bg-white text-black p-6 rounded shadow-md'>
        <h2>This is your published articles</h2>
        <ul>
        {articles && Object.values(articles).map((article) => (
          <li key={article.id}>
            <p>{article.id} - {article.title}</p>
            {/* <Image src={article.imageUrl} alt={article.imageText} width="100" height="100" /> */}
            <Image src="/TestImage.jpg" alt="Freja walking in forest." width={100} height={100} />
          </li>
        ))}
        </ul>
      </div>
    </main>
  )
}
