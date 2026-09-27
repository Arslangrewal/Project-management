import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Return mock dashboard stats
    return NextResponse.json({
      success: true,
      data: {
        totalUsers: 0,
        totalTeams: 0,
        totalProjects: 0,
        totalTasks: 0,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard stats.",
      },
      { status: 500 }
    );
  }
}
