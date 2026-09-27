import { readFile, writeFile } from "fs/promises";
import path from "path";

const file = path.join(
  process.cwd(),
  "data",
  "users.json"
);

/**
 * GET /api/users
 */
export async function GET() {
  try {
    const users = JSON.parse(await readFile(file, "utf8"));

    const safeUsers = users.map(({ passwordHash, ...user }) => user);

    return Response.json(safeUsers);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to load users" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/users?id=USER_ID
 */
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("id");

    // Demo only - NOT secure
    const currentUserRole = request.headers.get("x-user-role");

    if (currentUserRole !== "SUPER_ADMIN") {
      return Response.json(
        { error: "Only Super Admin can delete users." },
        { status: 403 }
      );
    }

    const users = JSON.parse(await readFile(file, "utf8"));

    const updatedUsers = users.filter(
      (user) => String(user.id) !== String(userId)
    );

    await writeFile(
      file,
      JSON.stringify(updatedUsers, null, 2)
    );

    return Response.json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to delete user." },
      { status: 500 }
    );
  }
}