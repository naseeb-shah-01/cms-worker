
"use client";

import { DayHours } from "@/app/types/admin/workers/view/worker";
import { DailyHours } from "@/app/types/worker";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";



interface HoursChartProps {
  data: DayHours[];
}

const HoursChart: React.FC<HoursChartProps> = ({ data }) => {
  // Format data for chart
  const chartData = data.map((day) => ({
    date: new Date(day._id).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
    }),
    fullDate: day._id,
    hours: parseFloat(day.totalHours.toFixed(2)),
    entriesCount: day.entries.length,
    // Calculate if there are open sessions (without closeTime)
    hasOpenSessions: day.entries.some((entry) => !entry.closeTime),
  }));

  // Sort by date
  chartData.sort((a, b) => new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime());

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
          <p className="font-medium text-gray-900">{data.fullDate}</p>
          <p className="text-sm text-gray-600">
            Total Hours: <span className="font-semibold text-gray-900">{data.hours} hrs</span>
          </p>
          <p className="text-sm text-gray-600">
            Sessions: <span className="font-semibold text-gray-900">{data.entriesCount}</span>
          </p>
          {data.hasOpenSessions && (
            <p className="text-xs text-amber-600 mt-1">⚠️ Contains open sessions</p>
          )}
        </div>
      );
    }
    return null;
  };

  // Calculate max hours for Y-axis
  const maxHours = Math.max(...chartData.map((d) => d.hours), 1);
  const yAxisTicks = Array.from({ length: Math.ceil(maxHours) + 1 }, (_, i) => i);

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Hours Logged</h3>
          <p className="text-sm text-gray-600">Daily work hours overview</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-900 rounded"></div>
            <span className="text-gray-700">Hours</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-100 rounded"></div>
            <span className="text-gray-700">Open Sessions</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              stroke="#666"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              stroke="#666"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
              ticks={yAxisTicks}
              label={{
                value: "Hours",
                angle: -90,
                position: "insideLeft",
                offset: -10,
                style: { textAnchor: "middle", fontSize: 12 },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }}
              formatter={(value) => (
                <span className="text-gray-700 text-sm">{value}</span>
              )}
            />
            <Bar
              dataKey="hours"
              name="Total Hours"
              radius={[4, 4, 0, 0]}
              maxBarSize={60}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.hasOpenSessions ? "#fde68a" : "#111827"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary stats */}
      <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {chartData.reduce((sum, day) => sum + day.hours, 0).toFixed(1)}
          </div>
          <div className="text-xs text-gray-600">Total Hours</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {chartData.length}
          </div>
          <div className="text-xs text-gray-600">Days Worked</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {(chartData.reduce((sum, day) => sum + day.hours, 0) / chartData.length || 0).toFixed(1)}
          </div>
          <div className="text-xs text-gray-600">Avg. Hours/Day</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {chartData.filter(d => d.hasOpenSessions).length}
          </div>
          <div className="text-xs text-gray-600">Days with Open Sessions</div>
        </div>
      </div>
    </div>
  );
};

export default HoursChart;