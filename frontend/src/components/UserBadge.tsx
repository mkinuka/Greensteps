import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export const UserBadge = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/me", {
          credentials: "include"
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
    <div className="flex items-center flex-col mt-4 w-fit">
      <img className="rounded-full size-16" src={user.picture} alt={user.name} />
      <h3 className="font-bold text-white text-xs">{user.name}</h3>
    </div>
    </div>
  );
};