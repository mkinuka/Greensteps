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
      <img className="rounded-full" src={user.picture} alt={user.name} />
      <h3 className="font-bold text-black">{user.name}</h3>
    </div>
  );
};