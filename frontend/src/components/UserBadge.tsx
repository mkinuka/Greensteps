import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

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

  // Truncate name if longer than 15 characters
  const truncateName = (name: string, maxLength: number = 15) => {
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength) + '...';
  };

  return (
    <div className="flex items-center justify-between gap-3 bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors max-[1200px]:p-2 w-64 max-[1200px]:w-52">
      <img className="rounded-full w-10 h-10 max-[1200px]:w-8 max-[1200px]:h-8" src={user.picture} alt={user.name} />
      <div className="flex-1 min-w-0">
        <h3 
          className="text-white font-bold text-sm max-[1200px]:text-xs truncate" 
          title={user.name}
        >
          {truncateName(user.name)}
        </h3>
        <p className="text-gray-400 text-xs max-[1200px]:text-[10px] truncate" title={user.email}>
          {user.email}
        </p>
      </div>
      <button className="p-2 rounded-lg bg-gray-700 transition-colors duration-200 hover:bg-gray-600 max-[1200px]:p-1.5 flex-shrink-0">
        <LogOut size={20} color="white" className="max-[1200px]:w-4 max-[1200px]:h-4" />
      </button>
    </div>
  );
};