import bcryptjs from 'bcrypt';

const hash = async (data: string): Promise<string> => {
  return bcryptjs.hash(data, 10);
};

const compare = async (hash: string, data: string): Promise<boolean> => {
  return bcryptjs.compare(hash, data);
};

const bcrypt = {
  hash,
  compare
}

export default bcrypt