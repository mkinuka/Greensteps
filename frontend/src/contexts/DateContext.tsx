import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface DateContextType {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  formatDateForDisplay: (date: string) => string;
}

const DateContext = createContext<DateContextType | undefined>(undefined);

interface DateProviderProps {
  children: ReactNode;
}

export const DateProvider: React.FC<DateProviderProps> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const formatDateForDisplay = (date: string): string => {
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    if (date === today) return "Today's";
    if (date === yesterday) return "Yesterday's";

    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year:
        dateObj.getFullYear() !== new Date().getFullYear()
          ? "numeric"
          : undefined,
    });
  };

  return (
    <DateContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        formatDateForDisplay,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export const useDate = (): DateContextType => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDate must be used within a DateProvider");
  }
  return context;
};
