import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Return mock analytics data
    return NextResponse.json({
      success: true,
      data: {
        revenue: [],
        users: [],
        growth: [],
        signups: [],
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch analytics.",
      },
      { status: 500 }
    );
  }
}
