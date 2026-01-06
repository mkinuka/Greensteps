import { useState, useEffect } from "react";
import { Trash2, Car, User, LogOut } from "lucide-react";

interface SavedCar {
  _id: string;
  name: string;
  fuelType: "petrol" | "diesel" | "hybrid" | "electric";
  fuelConsumption: number;
  createdAt: string;
}

export const Settings = () => {
  const [savedCars, setSavedCars] = useState<SavedCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchSavedCars();
  }, []);

  const fetchSavedCars = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/transport/fetchcars",
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSavedCars(data);
      } else {
        console.error("Failed to fetch saved cars");
      }
    } catch (error) {
      console.error("Error fetching saved cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCar = async (carId: string) => {
    setDeleteLoading(carId);
    try {
      const response = await fetch(
        `http://localhost:3000/transport/deletecars/${carId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setSavedCars(savedCars.filter((car) => car._id !== carId));
      } else {
        console.error("Failed to delete car");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Är du säker på att du vill ta bort ditt konto? Detta kan inte ångras."
      )
    ) {
      try {
        const response = await fetch("http://localhost:3000/api/user/delete", {
          method: "DELETE",
          credentials: "include",
        });

        if (response.ok) {
          // Clear any stored tokens and redirect
          localStorage.clear();
          window.location.href = "/";
        } else {
          console.error("Failed to delete account");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 p-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-green-800 mb-8">
            Inställningar
          </h1>
          <div className="text-center py-8">
            <p className="text-green-600">Laddar...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8">
          Inställningar
        </h1>

        {/* User Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <User className="mr-2" size={24} />
            Konto
          </h2>
          <div className="space-y-4">
            <button
              onClick={handleLogout}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              <LogOut className="mr-2" size={20} />
              Logga ut
            </button>
            <button
              onClick={handleDeleteAccount}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
            >
              <Trash2 className="mr-2" size={20} />
              Ta bort konto
            </button>
          </div>
        </div>

        {/* Saved Cars Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <Car className="mr-2" size={24} />
            Sparade bilar ({savedCars.length})
          </h2>

          {savedCars.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Du har inga sparade bilar ännu.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedCars.map((car) => (
                <div
                  key={car._id}
                  className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-all relative"
                >
                  <button
                    onClick={() => deleteCar(car._id)}
                    disabled={deleteLoading === car._id}
                    className="absolute top-2 right-2 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {deleteLoading === car._id ? (
                      <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2 pr-8">
                    {car.name}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Fuel Type:</span>{" "}
                      {car.fuelType.charAt(0).toUpperCase() +
                        car.fuelType.slice(1)}
                    </p>
                    <p>
                      <span className="font-medium">Consumption:</span>{" "}
                      {car.fuelConsumption}{" "}
                      {car.fuelType === "electric" ? "kWh/10km" : "L/10km"}
                    </p>
                    <p className="text-xs text-gray-400">
                      Added: {new Date(car.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
