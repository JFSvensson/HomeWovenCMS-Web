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
  const [file, setFile] = useState({
    id: '',
    url: '',
    description: ''
  })
  const [article, setArticle] = useState({
    id: '',
    title: '',
    body: '',
    imageUrl: 'http://www.dn.se/',
    imageText: '',
    owner: ''
  })
  const [articles, setArticles] = useState<Article[] | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

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
      setArticles(data)
    } catch (error) {
      console.error(error)
    }
  }

  async function editArticle(id: string) {
    try {
      const response = await fetch(API_ARTICLE_URL + '/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      const data = await response.json()
      setSelectedArticle(data || null)
    } catch (error) {
      console.error(error)
    }
  }

  const saveChanges = async () => {
    try {
      console.log(selectedArticle)
      if (!selectedArticle) return
      await fetch(API_ARTICLE_URL + `/${selectedArticle.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(selectedArticle),
      })
      // Refresh the list of articles or handle the updated article
    } catch (error) {
      console.error('Failed to update article:', error)
    }
  }

  const updateArticle = (property: keyof Article, value: string) => {
    setArticle(prevArticle => ({
      ...prevArticle,
      [property]: value
    }))
  }

  const updateFile = (property: keyof File, value: string) => {
    setFile(prevFile => ({
      ...prevFile,
      [property]: value
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const articleData = {
      title: article.title,
      body: article.body,
      imageUrl: article.imageUrl,
      imageText: article.imageText,
      owner: article.owner
    }
    // if (file) {
    //   formData.append('file', file)
    // }

    try {
      await fetch(API_ARTICLE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(articleData)
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
          <textarea value={article?.title} 
            onChange={(e) => updateArticle('title', e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
          />
        </div>

        <div className='mb-4'>
          <label htmlFor="body" className='block text-sm font-bold mb-2'>Body</label>
          <textarea 
            value={article?.body} 
            onChange={(e) => updateArticle('body', e.target.value)} 
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
          />
        </div>
        
        <div className='mb-4'>
          <label htmlFor="file" className='block text-sm font-bold mb-2'>Upload Image</label>
          <input 
            type="file" onChange={(e) => updateFile('url', e.target.value)} 
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
          />
        </div>
        
        <div className='mb-4'>
          <label htmlFor="imageText" className='block text-sm font-bold mb-2'>Image Text</label>
          <textarea 
            value={article?.imageText} 
            onChange={(e) => updateArticle('imageText', e.target.value)} 
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
          />
        </div>
        
        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Submit</button>
      </form>

      <br />
      
      {selectedArticle ? (
        <div  className='bg-white text-black p-6 rounded shadow-md'>
          <label htmlFor="title" className='block text-sm font-bold mb-2'>Title</label>
          <textarea value={selectedArticle.title} onChange={(e) => setSelectedArticle({...selectedArticle, title: e.target.value})} 
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />

          <label htmlFor="body" className='block text-sm font-bold mb-2'>Body</label>
          <textarea value={selectedArticle.body} onChange={(e) => setSelectedArticle({...selectedArticle, body: e.target.value})} 
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
          <Image src="/TestImage.jpg" alt="Freja walking in forest." width={100} height={100} />
          {/* Add more fields as needed */}
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={() => { 
              if (window.confirm('Do you want to save the changes?')) {
                saveChanges()
              }
              setSelectedArticle(null)
              fetchArticles()
            }}>Back to list</button>
          <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={saveChanges}>Save Changes</button>
        </div>
      ) : (
        <div className='bg-white text-black p-6 rounded shadow-md'>
          <h2>This is your published articles</h2>
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
                  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' 
                    onClick={() => editArticle(article.id)}>Edit</button>
                  {/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' 
                    onClick={() => deleteArticle(article.id)}>Delete</button> */}
                </div>
              </div>
            </li>
          ))}
          </ul>
        </div>
      )}
    </main>
  )
}
