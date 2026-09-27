import { registerUser } from "@/server/authStore";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/utils/validators";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { name, email, password, confirmPassword } = body;

  if (!validateName(name)) {
    return Response.json(
      { message: "Name must be at least 2 characters." },
      { status: 400 }
    );
  }

  if (!validateEmail(email)) {
    return Response.json(
      { message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (!validatePassword(password)) {
    return Response.json(
      {
        message:
          "Password must be 8-20 characters and include uppercase, lowercase, number, and special character.",
      },
      { status: 400 }
    );
  }

  if (confirmPassword && password !== confirmPassword) {
    return Response.json(
      { message: "Passwords do not match." },
      { status: 400 }
    );
  }

  const result = await registerUser({ name, email, password });

  if (result.error) {
    return Response.json({ message: result.error }, { status: result.status });
  }

  return Response.json(result.data, { status: result.status });
}
