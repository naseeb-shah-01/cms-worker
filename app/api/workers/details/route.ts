import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import { User } from "@/app/models/user";
import Hours from "@/app/models/hours";

export async function POST(
    req: NextRequest
) {
    try {
        const { id, options } = await req.json();
        await connectToDatabase();

        const worker = await User.findOne({ _id: id }).lean();

        let dateFilter = {};

        if (options?.month !== undefined) {
            // If month is provided
            const year = options.year || new Date().getFullYear();
            const month = options.month;

            const startDate = new Date(year, month, 1);
            const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999);

            dateFilter = {
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            };
        } else {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            dateFilter = {
                createdAt: {
                    $gte: thirtyDaysAgo,
                    $lte: new Date()
                }
            };
        }

        const hours = await Hours.aggregate([
            {
                $match: {
                    ...dateFilter
                }
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt"
                        }
                    },
                    totalHours: {
                        $sum: {
                            $round: [{
                                $divide: [
                                    { $subtract: ["$closeTime", "$openTime"] },
                                    1000 * 60 * 60
                                ]
                            }, 2]
                        }
                    },
                    entries: { $push: "$$ROOT" }
                },
            }
        ]);

        return NextResponse.json({
            ...worker,
            hours
        });

    } catch (error) {
        console.error("Error fetching worker details:", error);
        return NextResponse.json(
            { message: "Failed to fetch workers", error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// Add these configurations for Next.js 16
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // or 'edge' if you prefer Edge Runtime