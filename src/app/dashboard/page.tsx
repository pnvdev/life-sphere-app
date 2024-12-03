"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

import supabase from "@/db/api/client";

function DashboardPage() {
  const [user, setUser] = useState<{
    id: string;
    email: string | undefined;
  } | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: {user},
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
      } else {
        setUser({
          id: user.id,
          email: user.email,
        });
      }
    };

    fetchUser();
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <button
        className="logout-button"
        type="button"
        onClick={async () => {
          const {error} = await supabase.auth.signOut();

          if (error) console.error("Error during logout:", error.message);
          router.push("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default DashboardPage;
