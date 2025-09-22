"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function getUserRecord(): Promise<{
  totalAmount?: number;
  daysWithRecords?: number;
  error?: string;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const records = await db.record.findMany({
      where: { userId },
    });

    const totalAmount = records.reduce((sum, record) => sum + record.amount, 0);

    // Count unique days with valid expense records
    const uniqueDays = new Set();

    records
      .filter((record) => record.amount > 0)
      .forEach((record) => {
        // Extract date part (YYYY-MM-DD) from the date string/object
        const dateObj = new Date(record.date);
        const year = dateObj.getUTCFullYear();
        const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getUTCDate()).padStart(2, "0");
        const dateKey = `${year}-${month}-${day}`;

        uniqueDays.add(dateKey);
      });

    const daysWithRecords = uniqueDays.size;

    return { totalAmount, daysWithRecords };
  } catch (error) {
    console.error("Error fetching user record:", error); // Log the error
    return { error: "Database error" };
  }
}
