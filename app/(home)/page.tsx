import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { format, isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import AiReportButton from "./_components/ai-report-button";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");

  if (monthIsInvalid) {
    const currentMonth = format(new Date(), "MM");

    redirect(`/?month=${currentMonth}`);
  }

  const dashboard = await getDashboard(month);

  const user = await clerkClient().users.getUser(userId);

  return (
    <>
      <Navbar />

      <div className="flex flex-col gap-6 p-6 lg:h-full lg:overflow-hidden">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-0">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <div className="flex w-full items-center justify-between md:w-auto md:justify-normal md:gap-3">
            <AiReportButton
              month={month}
              hasPremiumPlan={
                user?.publicMetadata.subscriptionPlan === "premium"
              }
            />

            <TimeSelect />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:grid lg:h-full lg:grid-cols-[2fr_1fr] lg:overflow-hidden">
          <div className="flex flex-col gap-6 lg:overflow-hidden">
            <SummaryCards {...dashboard} />

            <div className="flex flex-col gap-6 lg:grid lg:h-full lg:grid-cols-3 lg:grid-rows-1 lg:overflow-hidden">
              <TransactionsPieChart {...dashboard} />

              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>

          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
};

export default Home;
