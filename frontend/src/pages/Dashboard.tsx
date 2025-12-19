import { useState, useEffect } from "react";
import { Leaf } from 'lucide-react';

export const DashBoard = () => {
  const [totalEmissions, setTotalEmissions] = useState(0);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodaysTotalEmissions();
    fetchUserName();
  }, []);

  const fetchTodaysTotalEmissions = async () => {
    try {
      const transportResponse = await fetch('http://localhost:3000/transport/todayjourneys', 
        { credentials: 'include' });
      const transportData = await transportResponse.json();
      const transportEmissions = transportData.reduce((sum: number, journey: any) => sum + journey.emissions, 0);

      const foodResponse = await fetch('http://localhost:3000/food/todaysmeals', 
        { credentials: 'include' });
      const foodData = await foodResponse.json();
      const foodEmissions = foodData.totalEmissions || 0;

      const total = transportEmissions + foodEmissions;
      setTotalEmissions(total);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch emissions:', error);
      setLoading(false);
    }
  };

  const fetchUserName = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/me', 
        { credentials: 'include' });
      const data = await response.json();
      setUserName(data.user?.name || 'User');
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUserName('User');
    }
  };

  return (
    <>
      <div className="mr-10vw ml-10vw mt-2vh">
        <h1 className="text-black font-semibold text-4xl mb-2">Dashboard</h1>
        <p className="text-gray-600 text-xl mb-8">Welcome, {userName}!</p>
        
        <section className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Today's Total Emissions</h2>
              <p className="text-gray-600">All categories combined</p>
            </div>
            <div className="flex items-center gap-4">
              <Leaf size={48} color="#059669" />
              <div className="text-right">
                {loading ? (
                  <p className="text-3xl font-bold text-gray-400">Loading...</p>
                ) : (
                  <>
                    <p className="text-5xl font-bold text-green-600">{totalEmissions.toFixed(2)}</p>
                    <p className="text-gray-600 text-lg">kg CO₂e</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Quick Stats</h3>
            <p className="text-gray-600">Track your carbon footprint across all activities</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Environmental Impact</h3>
            <p className="text-gray-600">See how your choices affect the planet</p>
          </div>
        </section>
      </div>
    </>
  );
};
