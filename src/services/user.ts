import { db } from "../db.ts";
import bcrypt from "bcrypt";
interface User {
  id?: string;
  username: string;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
}
export const createUserService = async (
  username: string,
  email: string,
  password: string
): Promise<User | null> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const response = await db.query(
    `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`,
    [username, email, hashedPassword]
  );
  return response.rows[0];
};

export const getUsersService = async () => {
  const response = await db.query("SELECT * FROM users");
  return response.rows;
};

export const updateUserService = async (
  id: string,
  username: string,
  email: string,
  password: string,
  firstname: string,
  lastname: string
) => {
  const hashedPassword = bcrypt.hash(password, 10);
  const { rows } = await db.query(
    `UPDATE users 
     SET username = $1, email = $2, password = $3, firstname = $4, lastname = $5 
     WHERE id = $6 
     RETURNING *`,
    [username, email, hashedPassword, firstname, lastname, id]
  );

  return rows[0];
};

export const getUserByIdService = async (id: string): Promise<User | null> => {
  const response = await db.query(`SELECT * FROM users WHERE id = ${id}`);
  return response.rows[0];
};

export const deleteUserService = async (id: string): Promise<User | null> => {
  const response = await db.query("DELETE FROM account WHERE userid = $1", [
    id,
  ]);
  await db.query("DELETE FROM users WHERE id = $1", [id]);

  return response.rows[0];
};

export const getUserAccountsService = async (
  id: string
): Promise<User[] | null> => {
  const response = await db.query(
    `SELECT * FROM accounts WHERE user_id = ${id}`
  );
  return response.rows;
};

export const getUserTransactionsService = async (
  id: string
): Promise<User[] | null> => {
  const response = await db.query(
    `SELECT * FROM transactions WHERE user_id = ${id}`
  );
  return response.rows;
};
