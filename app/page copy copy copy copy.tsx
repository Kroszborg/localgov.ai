import { redirect } from "next/navigation";
import { auth } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth.config";
import SearchInterface from "@/components/search-interface";
import UserSidebar from "@/components/user-sidebar";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row">
      <UserSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-3xl font-bold tracking-tight">
            Ask about your local laws
          </h1>
          <SearchInterface />
        </div>
      </main>
    </div>
  );
}
