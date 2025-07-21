import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardPage } from "@/components/dashboard/DashboardPage";

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = {
    id: userId,
    firstName: 'User',
    lastName: '',
    email: 'user@example.com',
    role: 'user'
  };

  return <DashboardPage user={user} />;
}