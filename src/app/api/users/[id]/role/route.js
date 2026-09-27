import { readFile, writeFile } from "fs/promises";
import path from "path";


const file = path.join(
  process.cwd(),
  "data",
  "users.json"
);

/**
 * PATCH /api/users/:id/role
 */
export async function PATCH(request, { params }) {
  const { id } = await params;

  const { role } = await request.json();

  const users = JSON.parse(await readFile(file, "utf8"));

  const user = users.find((u) => u.id === id);

  if (!user) {
    return Response.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  const totalSuperAdmins = users.filter(
    (u) => u.role === "SUPER_ADMIN"
  ).length;

  if (
    user.role === "SUPER_ADMIN" &&
    role !== "SUPER_ADMIN" &&
    totalSuperAdmins === 1
  ) {
    return Response.json(
      {
        error: "Cannot remove the last Super Admin",
      },
      { status: 400 }
    );
  }

  const updatedUsers = users.map((u) =>
    u.id === id ? { ...u, role } : u
  );

  await writeFile(file, JSON.stringify(updatedUsers, null, 2));

  return Response.json({ success: true });
}