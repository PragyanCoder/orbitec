import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <DashboardLayout user={user}>
      {children}
    </DashboardLayout>
  );
}