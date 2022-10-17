import { groq } from 'next-sanity'

export const BLOG_SUMMARIES_QUERY = groq`
*[_type == "blog-post" && defined(slug.current)]{
  _id,
  title,
  tags[]->{
    _id,
    title,
    description
  },
  author-> {
    name,
    image
  },
  "slug": slug.current,
  publishedAt
}
`

export const BLOG_BY_SLUG_QUERY = groq`
*[_type == "blog-post" && defined(slug.current) && slug.current == $slug][0] {
  _id,
  title,
  tags[]->{
    _id,
    title,
    description
  },
  author-> {
    name,
    image
  },
  "slug": slug.current,
  publishedAt,
  content
}
`
