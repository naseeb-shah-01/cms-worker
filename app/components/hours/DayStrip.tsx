"use client";

import { formatTime } from "@/app/utils/timeUtils";




export const DayStrip = ({day}:{day:Date}) => {


    return <div className="font-bold bg-[black] text-[white] text-center  padding-4 rounded-l">{new Date(day).toLocaleDateString()}</div>;
}