import joi from 'joi';
import bcrypt from '../helpers/bcrypt';
import { signPayload } from '../helpers/jwt';
import { createUser, findUser, getUserByUsername, createArticle, getAllArticle, followUser } from '../services/user.service';

// Interface for expected response
interface IHelperResponse {
  success: boolean;
  status: number;
  data?: { token: string; };
  response?: {};
  error?: string;
  message?: string;
}


export const signupController = async (email: string, password: string, bio: string, username: string, image: string): Promise<IHelperResponse> => {
  const validationSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5),
    bio: joi.string().required(),
    image: joi.string().required(),
    username: joi.string().required(),
  });

  const validationResult = validationSchema.validate({ email, password, bio, image, username });
  if (validationResult.error) {
    return {
      success: false,
      status: 400,
      error: validationResult.error.message,
    };
  }

  // check for existing user
  const existingUser = await findUser(email);

  if (existingUser) {
    return {
      success: false,
      status: 400,
      error: 'Invalid username and/or password.',
    };
  }
  const hashPassword = await bcrypt.hash(password);
  const user = await createUser(email, hashPassword, bio, username, image);
  return {
    success: true,
    status: 200,
    message: 'Account successfully created',
    data: { token: signPayload({ id: user.username }) },
  };
};


export const loginController = async (email: string, password: string): Promise<IHelperResponse> => {
  const validationSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5),
  });

  const validationResult = validationSchema.validate({ email, password });
  if (validationResult.error) {
    return {
      success: false,
      status: 400,
      error: validationResult.error.message,
    };
  }

  const user = await findUser(email);

  if (!user) {
    return { success: false, status: 401, error: 'Incorrect username and/or password.' };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return { success: false, status: 401, error: 'Incorrect username and/or password.' };
  }

  return {
    success: true,
    status: 200,
    message: 'Login successful',
    data: { token: signPayload({ id: user.username }) },
  };
};

export const getUserController = async (username: string): Promise<IHelperResponse> => {
  const validationSchema = joi.object({
    username: joi.string().required(),
  });

  const validationResult = validationSchema.validate({ username });
  if (validationResult.error) {
    return {
      success: false,
      status: 400,
      error: validationResult.error.message,
    };
  }

  const user = await getUserByUsername(username);

  if (!user) {
    return { success: false, status: 404, error: 'User not found' };
  }

  return {
    success: true,
    status: 200,
    message: 'User found',
    response: {
      email: user.email,
      bio: user.bio,
      image: user.image
    },
  };
};


export const createArticleController = async (title: string, description: string, body: string, tagList: string, author: string): Promise<IHelperResponse> => {
  const validationSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    body: joi.string().required(),
    tagList: joi.string().required(),
    author: joi.string().required(),
  });

  const validationResult = validationSchema.validate({ title, description, body, tagList, author });
  if (validationResult.error) {
    return {
      success: false,
      status: 400,
      error: validationResult.error.message,
    };
  }

  const article = await createArticle(title, description, body, tagList, author);

  if (!article) {
    return { success: false, status: 404, error: 'User not found' };
  }

  return {
    success: true,
    status: 200,
    message: 'Article created',
    response: {
      author: article.author
    }
  };
};


export const getAllArticleController = async (): Promise<IHelperResponse> => {

  const article = await getAllArticle();

  if (article.length !== 0 && !article) {
    return { success: false, status: 404, error: 'No article was found' };
  }

  return {
    success: true,
    status: 200,
    message: 'Articles returned',
    response: {
      "articles": article,
      "articlesCount": article.length
    },
  };
};


export const followController = async (follower: string, followee: string): Promise<IHelperResponse> => {
  const validationSchema = joi.object({
    follower: joi.string().required(),
    followee: joi.string().required(),
  });

  const validationResult = validationSchema.validate({ follower, followee });
  if (validationResult.error) {
    return {
      success: false,
      status: 400,
      error: validationResult.error.message,
    };
  }

  const user = await followUser(follower, followee);

  if (!user) {
    return { success: false, status: 404, error: 'User not found' };
  }

  return {
    success: true,
    status: 200,
    message: `${user.follower} followed ${user.followee}`
  };
};