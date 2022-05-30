import React from 'react'
import './bibtex.scss'

export default function BibTeX({ title, date }) {
  const written = new Date(date)
  const bibtexTitle = `${title[0].toUpperCase()}${title.slice(1).toLowerCase()}`

  let url = ""
  if (typeof window !== 'undefined') {
    url = new URL(window.location.href)
    url.hash = ""
  }

  const year = written.getUTCFullYear()
  const tag = `${year}${written.getUTCMonth() + 1}${title[0]}`
  const month = written.toLocaleDateString('en-us', { month: 'long' })
  const today = new Date();
  const accessed = today.toLocaleDateString('en-gb', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  const entry = `@misc{Pittman${tag},
    author = {Pittman, Cameron},
    title = {${bibtexTitle}},
    journal = {Hurtling through Space},
    url = {${url}},
    year = {${year}},
    month = {${month}},
    accessed = {${accessed}}
}`
  return <pre>{entry}</pre>
}
