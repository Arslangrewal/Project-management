import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/teams.json");

// Read JSON
const readTeams = async () => {
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data);
};

// Save JSON
const saveTeams = async (teams) => {
  await fs.writeFile(filePath, JSON.stringify(teams, null, 2));
};

// GET /api/teams
export async function GET() {
  try {
    const teams = await readTeams();

    return NextResponse.json({
      success: true,
      data: teams,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch teams.",
      },
      { status: 500 }
    );
  }
}

// POST /api/teams
export async function POST(request) {
  try {
    const body = await request.json();

    const teams = await readTeams();

    const newTeam = {
      id: `team_${Date.now()}`,
      name: body.name,
      description: body.description || "",
      leaderId: body.leaderId || "",
      members: body.members || [],
      projects: body.projects || [],
      status: body.status || "ACTIVE",
      color: body.color || "#3B82F6",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    teams.push(newTeam);

    await saveTeams(teams);

    return NextResponse.json(
      {
        success: true,
        message: "Team created successfully.",
        data: newTeam,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create team.",
      },
      { status: 500 }
    );
  }
}