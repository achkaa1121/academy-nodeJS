import { db } from "../db.js";

export const createAccountService = async (
  user_id,
  account_number,
  balance
) => {
  console.log(user_id, account_number, balance);
  const response = await db.query(
    `INSERT INTO account (userid, number, balance) VALUES ($1, $2, $3) RETURNING *`,
    [user_id, account_number, balance]
  );
  return response.rows[0];
};
export const updateAccountService = async (account_number, balance) => {
  const response = await db.query(
    `UPDATE account SET balance = ${balance}  WHERE account_number::text = $1`[
      account_number
    ]
  );

  return response[0];
};

export const deleteAccountService = () => {};
export const getAllAccountsService = () => {};
export const getAccountByNumberService = () => {};
export const createTransactionService = () => {};
export const getTransactionsService = () => {};
export const getTransactionsByUserIdService = () => {};
export const getTransactionsByAccountNumberService = () => {};
