import { RequestHandler } from 'express';
import { createArticleController, followController, getAllArticleController, getUserController, loginController, signupController } from '../controllers/user.controller';
import logger from '../utils/logger';

/**
 * @desc    signup
 * @route   POST /api/v1/users/signup
 * @access  Public
 */
export const signup: RequestHandler = async (req, res) => {
  try {
    const { email, password, bio, image, username} = req.body;
    const { success, error, status, data, message } = await signupController(email, password, bio, username, image);
    if (!success) {
      return res.status(status).json({ success, error });
    }
    return res.status(status).json({ success, data, message });
  } catch (error) {
    logger.error(error);
    console.log(error);
    
    return res.json({
      success: false,
      error: 'Internal server error',
    });
  }
};

/**
 * @desc    login
 * @route   POST /api/v1/users/login
 * @access  Public
 */
export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { success, error, status, data, message } = await loginController(email, password);
    if (!success) {
      return res.status(status).json({ success, error });
    }
    return res.status(status).json({ success, data, message });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      error: 'Internal server error',
    });
  }
};

/**
 * @desc    getUser
 * @route   POST /api/v1/users/:username
 * @access  Public
 */
export const getUser: RequestHandler = async (req, res) => {
  try {
    const { username } = req.params;
    const { success, error, status, data, message, response } = await getUserController(username);
    if (!success) {
      return res.status(status).json({ success, error });
    }
    return res.status(status).json({ success, data, message,  response});
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      error: 'Internal server error',
    });
  }
};

/**
 * @desc    getUser
 * @route   POST /api/v1/users/:username
 * @access  Public
 */
export const createArticle: RequestHandler = async (req, res) => {
  try {
    const { title, description, body, tagList  } = req.body;
    //@ts-ignore
    const author = req.user.id
    
    const { success, error, status, data, message, response } = await createArticleController(title, description, body, tagList, author );
    if (!success) {
      return res.status(status).json({ success, error });
    }
    return res.status(status).json({ success, data, message, response });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      error: 'Internal server error',
    });
  }
};

/**
 * @desc    get all articles
 * @route   POST /api/v1/articles/
 * @access  Public
 */
export const getAllArticle: RequestHandler = async (req, res) => {
  try {
  
    const { success, error, status, data, message, response } = await getAllArticleController()
    if (!success) {
      return res.status(status).json({ success, error });
    }
    return res.status(status).json({ success, data, message, response });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      error: 'Internal server error',
    });
  }
};

/**
 * @desc    follow a user
 * @route   POST /api/v1/profiles/:username
 * @access  Private
 */
export const followUser: RequestHandler = async (req, res) => {
  try {
    const followee = req.params.id
    //@ts-ignore
    const follower = req.user.id
    const { success, error, status, data, message } = await followController(follower, followee);
    if (!success) {
      return res.status(status).json({ success, error });
    }
    return res.status(status).json({ success, data, message });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      error: 'Internal server error',
    });
  }
};