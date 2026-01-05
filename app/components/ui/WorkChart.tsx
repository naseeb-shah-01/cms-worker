"use client";

import { IHour } from "@/app/models/hours";
import { DayHours } from "@/app/types/admin/workers/view/worker";
import { DailyHours } from "@/app/types/worker";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Dot,
} from "recharts";

interface HoursChartProps {
  data: DayHours[];
}

const HoursLineChart: React.FC<HoursChartProps> = ({ data }) => {
  // Format data for chart
  const chartData = data.map((day) => ({
    date: new Date(day._id).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    fullDate: day._id,
    hours: parseFloat(day.totalHours.toFixed(2)),
    entriesCount: day.entries.length,
    hasOpenSessions: day.entries.some((entry) => !entry.closeTime),
  }));

  // Sort by date
  chartData.sort((a, b) => new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime());

  // Custom dot for open sessions
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    
    if (payload.hasOpenSessions) {
      return (
        <g>
          <circle cx={cx} cy={cy} r={6} fill="#111827" stroke="#fff" strokeWidth={2} />
          <circle cx={cx} cy={cy} r={3} fill="#fbbf24" />
        </g>
      );
    }
    
    return (
      <circle cx={cx} cy={cy} r={4} fill="#111827" />
    );
  };

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Work Hours Trend</h3>
        <p className="text-sm text-gray-600">Daily hours over time</p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="date"
              stroke="#666"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              stroke="#666"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
              label={{
                value: "Hours",
                angle: -90,
                position: "insideLeft",
                offset: -10,
                style: { fontSize: 12 },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ fontWeight: 600, color: "#111827" }}
            //   formatter={(value: number) => [`${value} hrs`, "Hours"]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
              formatter={(value) => (
                <span className="text-gray-700 text-sm">{value}</span>
              )}
            />
            <Line
              type="monotone"
              dataKey="hours"
              name="Hours Worked"
              stroke="#111827"
              strokeWidth={2}
              dot={<CustomDot />}
              activeDot={{ r: 6, fill: "#111827" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Daily breakdown */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Daily Breakdown</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {chartData.map((day) => (
            <div
              key={day.fullDate}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">
                  {day.date}
                </span>
                {day.hasOpenSessions && (
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                    Open Session
                  </span>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">
                  {day.hours} hrs
                </div>
                <div className="text-xs text-gray-600">
                  {day.entriesCount} session{day.entriesCount !== 1 ? "s" : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HoursLineChart;