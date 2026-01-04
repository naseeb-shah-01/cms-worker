interface DayStripProps {
    day: string | Date;
    totalHours?: number;
    noShift?: number;
  }
  
  export const DayStrip = ({ day, totalHours,noShift }: DayStripProps) => {
    const date = new Date(day);
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    const dayNumber = date.getDate();
    const isToday = new Date().toDateString() === date.toDateString();
  
    return (
      <div className="flex items-center justify-between px-2 py-1 text-sm">
        {/* Date info */}
        <div className="flex items-center space-x-2">
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            isToday 
              ? "bg-black text-white" 
              : "bg-gray-100 text-gray-900"
          }`}>
            {dayNumber}
          </span>
          <span className={`font-medium ${
            isToday ? "text-black" : "text-gray-900"
          }`}>
            {weekday}
          </span>
        </div>
  
        {/* No of shifts */}
        <div className="flex items-center space-x-1">
          <span className={`font-bold ${
            isToday ? "text-black" : "text-gray-900"
          }`}>
            {noShift || 0}
          </span>
          <span className="text-gray-600 text-xs">Shifts</span> 
          </div>
        <div className="flex items-center space-x-1">
          <span className={`font-bold ${
            isToday ? "text-black" : "text-gray-900"
          }`}>
            {totalHours || 0}
          </span>
          <span className="text-gray-600 text-xs">hrs</span>
        </div>
      </div>
    );
  };