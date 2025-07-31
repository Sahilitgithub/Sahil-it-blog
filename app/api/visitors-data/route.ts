import { NextResponse } from "next/server";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";
import { prisma } from "@/utils/prisma/prismaClient";

// Get all visitors data in mobile and desktop devices
export async function GET() {
  const months = Array.from({ length: 12 }, (_, i) => subMonths(new Date(), 5 - i));
  const data = await Promise.all(
    months.map(async (month) => {
      const start = startOfMonth(month);
      const end = endOfMonth(month);

      const [desktopCount, mobileCount] = await Promise.all([
        prisma.visitors.count({ where: { device: "desktop", createdAt: { gte: start, lte: end } } }),
        prisma.visitors.count({ where: { device: "mobile", createdAt: { gte: start, lte: end } } }),
      ]);

      return {
        month: month.toLocaleString("default", { month: "long" }),
        desktop: desktopCount,
        mobile: mobileCount,
      };
    })
  );

  return NextResponse.json(data);
}
