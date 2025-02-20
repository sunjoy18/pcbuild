'use client'

import './RecentNews.css'
import Image from 'next/image'
import GPU from './images/product/GPU.jpg'

const news = [
  {
    title: 'NVIDIA RTX 5070 vs RTX 4090',
    description: 'NVIDIA admits RTX 5070 no match for RTX 4090 without DLSS - Performance comparison and detailed analysis.',
    image: GPU,
    link: 'https://indianexpress.com/article/technology/tech-news-technology/nvidia-admits-the-obvious-says-rtx-5070-no-match-for-rtx-4070-without-dlss-9782218/'
  },
  {
    title: 'Setting Up Your Home Office',
    description: 'Tips and tricks for creating the perfect workspace at home.',
    image: GPU,
    link: 'https://indianexpress.com/article/technology/tech-news-technology/nvidia-admits-the-obvious-says-rtx-5070-no-match-for-rtx-4070-without-dlss-9782218/'
  },
  {
    title: 'Virtual Reality: The Next Big Thing',
    description: 'How VR is changing the way we work, play, and learn.',
    image: GPU,
    link: 'https://indianexpress.com/article/technology/tech-news-technology/nvidia-admits-the-obvious-says-rtx-5070-no-match-for-rtx-4070-without-dlss-9782218/'
  },
]

const RecentNews = () => {
  return (
    <section className="recent-news">
      <div className="container">
        <h2 className="section-title">Recent News</h2>
        <div className="news-grid">
          {news.map((item, index) => (
            <div key={index} className="news-item">
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={250}
                className="news-image"
                priority
              />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a 
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecentNews

