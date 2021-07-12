import bcryptjs from 'bcrypt';

const hash = async (data: string): Promise<string> => {
  return bcryptjs.hash(data, 10);
};

const compare = async (data: string, hash: string): Promise<boolean> => {
  return bcryptjs.compare(data, hash);
};

const bcrypt = {
  hash,
  compare
}

export default bcrypt