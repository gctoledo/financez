import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Home = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  return (
    <div>
      <p className="flex items-center justify-center text-blue-500">Home</p>
    </div>
  );
};

export default Home;
