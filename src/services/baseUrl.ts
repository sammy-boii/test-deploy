const BASE_API_URL = process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_DEV_API_URL : process.env.NEXT_PUBLIC_PROD_API_URL

export default BASE_API_URL