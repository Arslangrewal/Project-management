import { authenticateUser } from "@/server/authStore";
import { validateEmail } from "@/utils/validators";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { email, password } = body;

  if (!validateEmail(email) || !password) {
    return Response.json(
      { message: "Email and password are required." },
      { status: 400 }
    );
  }

  const result = await authenticateUser({ email, password });

  if (result.error) {
    return Response.json({ message: result.error }, { status: result.status });
  }

  return Response.json(result.data, { status: result.status });
}
