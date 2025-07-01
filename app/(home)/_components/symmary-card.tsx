import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { canUserAddTransaction } from "@/app/_data/can-user-add-transaction";
import { formatCurrency } from "@/app/utils/currency";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
}

const SummaryCard = async ({
  icon,
  title,
  amount,
  size = "small",
}: SummaryCardProps) => {
  const userCanAddTransaction = await canUserAddTransaction();

  return (
    <Card className={`${size === "large" ? "bg-white bg-opacity-5" : ""}`}>
      <CardHeader className="flex-row items-center gap-4">
        {icon}
        <p
          className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
        >
          {title}
        </p>
      </CardHeader>

      <CardContent className="flex flex-col justify-between gap-6 md:flex-row md:gap-0">
        <p
          className={`${size === "small" ? "text-lg font-bold md:text-xl lg:text-2xl" : "text-2xl md:text-3xl lg:text-4xl"} font-bold`}
        >
          {formatCurrency(amount)}
        </p>

        {size === "large" && (
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
