import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createUser = async (email: string, password: string, bio: string, username: string, image: string,) => {
  return await prisma.users.create({
    data: {
      email: email,
      password: password,
      bio: bio,
      username: username,
      image: image,
      followers: 0,
      following: 0
    }
  });
};

export const findUser = async (email: string) => {
  return await prisma.users.findUnique({
    where: {
      email: email
    }
  });
};

export const getUserByUsername = async (username: string) => {
  return await prisma.users.findUnique({
    where: {
      username: username
    }
  });
}


export const createArticle = async (title: string, description: string, body: string, tagList: string, author: string) => {
  return await prisma.articles.create({
    data: {
      title,
      body,
      description,
      favoritesCount: 0,
      author,
      tagList,
    }
  })
}

export const getAllArticle = async () => {
  return await prisma.articles.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export const followUser = async (follower: string, followee: string) => {
  // check if the followee exists
  // disallow follow yourself
  if (follower === followee) {
    return 
  }

  const user = await prisma.users.findFirst({
    where: {
      username: followee
    }
  })

  if (user) {
    return await prisma.follow.create({
      data: {
        follower: follower,
        followee: user?.username
      }
    })
  }
}