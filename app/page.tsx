import { auth } from "@clerk/nextjs/server";
import { HomePage } from "@/components/HomePage";

export default async function Home() {
  let user = null;
  
  try {
    const { userId } = auth();
    if (userId) {
      // In a real app, you'd fetch user data from your database
      user = {
        id: userId,
        firstName: 'User',
        lastName: '',
        email: 'user@example.com',
        role: 'user'
      };
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    // Continue with user as null for public page
  }

  return <HomePage user={user} />;
}