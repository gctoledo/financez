import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import AddTransactionButton from "../_components/add-transaction-button";
import { transactionColumns } from "../transactions/_columns";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import { sanitizeTransaction } from "../utils/sanitize-transaction";

const TransactionsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const transactions = await db.transaction
    .findMany({
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

  return (
    <>
      <Navbar />

      <div className="flex flex-col gap-6 p-6 lg:h-full lg:overflow-hidden">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>

        <ScrollArea className="hidden lg:block">
          <DataTable columns={transactionColumns} data={transactions} />
        </ScrollArea>

        <div className="block lg:hidden">
          <DataTable columns={transactionColumns} data={transactions} />
        </div>
      </div>
    </>
  );
};

export default TransactionsPage;
