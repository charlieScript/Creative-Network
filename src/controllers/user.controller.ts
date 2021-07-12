import joi from 'joi';
import bcrypt from '../helpers/bcrypt';
import { signPayload } from '../helpers/jwt';
import { createUser, findUser} from '../services/user.service'

// Interface for expected response
interface IHelperResponse {
  success: boolean;
  status: number;
  data?: { token: string; };
  error?: string;
  message?: string;
}

export const signupController = async (email: string, password: string, bio: string, username: string, image: string): Promise<IHelperResponse> => {
  const validationSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5),
    bio: joi.string().required(),
    image: joi.string().uri().required(),
    username: joi.string().required(),
  });

  const validationResult = validationSchema.validate({ email, password, bio, image, username})
  if (validationResult.error) {
    return {
      success: false,
      status: 400,
      error: validationResult.error.message,
    };
  }

  // check for existing user
  const existingUser = await findUser(username);
  if (existingUser) {
    return {
      success: false,
      status: 400,
      error: 'Invalid username and/or password.',
    };
  }
  const hashPassword = await bcrypt.hash(password)
  const user = await createUser(email, bio, image, hashPassword, username);
  return {
    success: true,
    status: 200,
    message: 'Account successfully created',
    data: { token: signPayload({ id: user.username }) },
  };
}


export const loginController = async (username: string, password: string): Promise<IHelperResponse> => {
  const validationSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().min(5),
  });

  const validationResult = validationSchema.validate({ username, password });
  if (validationResult.error) {
    return {
      success: false,
      status: 400,
      error: validationResult.error.message,
    };
  }

  const user = await findUser(username);
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
  }
}