import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import AddTransactionButton from "../_components/add-transaction-button";
import { transactionColumns } from "../transactions/_columns";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import { sanitizeTransaction } from "../utils/sanitize-transaction";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import TablePagination from "../_components/table-pagination";

interface TransactionsPageProps {
  searchParams: {
    page?: string;
  };
}

const TransactionsPage = async ({ searchParams }: TransactionsPageProps) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const PAGE_SIZE = 10;
  const page = Number(searchParams.page) || 1;

  const totalTransactions = await db.transaction.count({
    where: {
      userId,
    },
  });

  const transactions = await db.transaction
    .findMany({
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      where: {
        userId,
      },
      orderBy: {
        date: "desc",
      },
    })
    .then((transactions) => {
      return transactions.map((transaction) =>
        sanitizeTransaction(transaction),
      );
    });

  const userCanAddTransaction = await canUserAddTransaction();

  return (
    <>
      <Navbar />

      <div className="flex flex-col gap-6 p-6 lg:h-full lg:overflow-hidden">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        </div>

        <ScrollArea className="hidden lg:block">
          <DataTable columns={transactionColumns} data={transactions} />
          <TablePagination count={totalTransactions} pageSize={PAGE_SIZE} />
        </ScrollArea>

        <div className="block lg:hidden">
          <DataTable columns={transactionColumns} data={transactions} />
          <TablePagination count={totalTransactions} pageSize={PAGE_SIZE} />
        </div>
      </div>
    </>
  );
};

export default TransactionsPage;
