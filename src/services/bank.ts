import { db } from "../db.ts";
interface Account {
  account_number: string;
  balance?: number;
  user_id?: string;
}
export const createAccountService = async (
  user_id: string,
  account_number: string,
  balance: number
) => {
  console.log(user_id, account_number, balance);
  const response = await db.query(
    `INSERT INTO account (userid, number, balance) VALUES ($1, $2, $3) RETURNING *`,
    [user_id, account_number, balance]
  );
  return response.rows[0];
};
export const updateAccountService = async (
  account_number: string,
  balance: number
): Promise<Account | null> => {
  const response = await db.query(
    `UPDATE account 
     SET balance = $1 
     WHERE account_number::text = $2 
     RETURNING *`,
    [balance, account_number]
  );

  return response.rows[0] || null;
};

export const deleteAccountService = () => {};
export const getAllAccountsService = () => {};
export const getAccountByNumberService = () => {};
export const createTransactionService = () => {};
export const getTransactionsService = () => {};
export const getTransactionsByUserIdService = () => {};
export const getTransactionsByAccountNumberService = () => {};
