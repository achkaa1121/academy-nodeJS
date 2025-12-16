import {
  createUserService,
  updateUserService,
  getUsersService,
  getUserByIdService,
  deleteUserService,
  getUserAccountsService,
  getUserTransactionsService,
} from "../services/user.js";
interface User {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
}
import { Request, Response } from "express";

interface CreateUserBody {
  username: string;
  email: string;
  password: string;
}

export const createUser = async (
  req: Request<{}, {}, CreateUserBody>,
  res: Response
): Promise<void> => {
  const { username, email, password } = req.body;

  const user = await createUserService(username, email, password);

  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id, username, email, password, firstname, lastname } = req.body;

  const user = await updateUserService(
    id,
    username,
    email,
    password,
    firstname,
    lastname
  );

  res.json(user);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await getUsersService();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const user = await getUserByIdService(id);
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const user = await deleteUserService(id);
  res.json(user);
};

export const getUserAccounts = async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const accounts = await getUserAccountsService(id);
  res.json(accounts);
};
