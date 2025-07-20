import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { DashboardPage } from "@/components/dashboard/DashboardPage";

export default async function Dashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const transformedUser = {
    id: user.id,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.emailAddresses[0]?.emailAddress || '',
    role: user.emailAddresses[0]?.emailAddress === 'pragyanpandey0106@gmail.com' ? 'admin' : 'user'
  };

  return <DashboardPage user={transformedUser} />;
}