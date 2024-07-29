export interface CategoriesI {
  _id: string
  name: string
}

export interface BlogDataI {
  _id: string
  title: string
  content: string
  authorName: string
  author: string
  category: CategoriesI
  createdAt: string
  updatedAt: string
  tags: string[]
}

export interface UserDataI {
  getProfile: {
    _id: string
    first_name: string
    last_name: string
    email: string
    username: string
    phone_number: string
    country: string
    Address: string
    profile_picture: string
    bio: string
    Socials: string[]
    following: string[]
    follower: string[]
  }
}

export interface UserFollowingI {
  userFollowings: {
    _id: string
    first_name: string
    last_name: string
    email: string
    username: string
    profile_picture: string
    following: string[]
    follower: string[]
  }[]
}
