import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createUser = async (email: string, password: string, bio: string, username: string, image: string,) => {
  return await prisma.users.create({
    data: {
      email: email,
      password: password,
      bio: bio,
      followers: 0,
      following: 0,
      username: username,
      image: image,
    }
  })
};

export const findUser = async (username: string) => {
  return await prisma.users.findUnique({
    where: {
      username: username
    }
  })
};
