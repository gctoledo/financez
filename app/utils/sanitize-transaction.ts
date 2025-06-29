import { Transaction } from "@prisma/client";

export type SanitizedTransaction = Omit<Transaction, "amount"> & {
  amount: number;
};

export const sanitizeTransaction = (
  transaction: Transaction,
): SanitizedTransaction => {
  return {
    ...transaction,
    amount: Number(transaction.amount),
  } as SanitizedTransaction;
};
