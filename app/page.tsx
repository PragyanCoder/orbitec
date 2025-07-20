import { currentUser } from "@clerk/nextjs";
import { HomePage } from "@/components/HomePage";

export default async function Home() {
  const user = await currentUser();
  
  const transformedUser = user ? {
    id: user.id,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.emailAddresses[0]?.emailAddress || '',
    role: user.emailAddresses[0]?.emailAddress === 'pragyanpandey0106@gmail.com' ? 'admin' : 'user'
  } : null;

  return <HomePage user={transformedUser} />;
}