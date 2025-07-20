import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <DashboardLayout user={transformedUser}>
      {children}
    </DashboardLayout>
  );
}