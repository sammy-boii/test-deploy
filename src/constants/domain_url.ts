export const BLOGS_DOMAIN_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/blogs'
    : 'https://codynn.com/blogs'
