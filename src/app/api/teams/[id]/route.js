import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/teams.json");

async function readTeams() {
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data);
}

async function writeTeams(data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// GET /api/teams/:id
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const teams = await readTeams();

    const team = teams.find((t) => t.id === id);

    if (!team) {
      return NextResponse.json(
        { success: false, message: "Team not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: team,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to fetch team." },
      { status: 500 }
    );
  }
}

// PUT /api/teams/:id
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const teams = await readTeams();

    const index = teams.findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Team not found." },
        { status: 404 }
      );
    }

    const duplicate = teams.find(
      (team) =>
        team.id !== id &&
        team.name.toLowerCase() === body.name.toLowerCase()
    );

    if (duplicate) {
      return NextResponse.json(
        { success: false, message: "Another team already has this name." },
        { status: 409 }
      );
    }

    teams[index] = {
      ...teams[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    await writeTeams(teams);

    return NextResponse.json({
      success: true,
      data: teams[index],
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to update team." },
      { status: 500 }
    );
  }
}

// DELETE /api/teams/:id
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const teams = await readTeams();

    const index = teams.findIndex((team) => team.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Team not found." },
        { status: 404 }
      );
    }

    const deletedTeam = teams[index];

    teams.splice(index, 1);

    await writeTeams(teams);

    return NextResponse.json({
      success: true,
      message: "Team deleted successfully.",
      data: deletedTeam,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to delete team." },
      { status: 500 }
    );
  }
}
