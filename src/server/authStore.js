import "server-only";

import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const TOKEN_SECRET =
  process.env.AUTH_TOKEN_SECRET || "local-development-auth-token-secret";
const DEFAULT_ROLE = "EDITOR";

const ROLE_PERMISSIONS = {
  SUPER_ADMIN: [
    "MANAGE_USERS",
    "MANAGE_ROLES",
    "CREATE_ADMINS",
    "DELETE_RESOURCES",
    "EDIT_RESOURCES",
    "VIEW_ANALYTICS",
    "VIEW_SETTINGS",
  ],
  ADMIN: [
    "MANAGE_USERS",
    "MANAGE_CONTENT",
    "VIEW_ANALYTICS",
    "CREATE_CONTENT",
    "EDIT_RESOURCES",
  ],
  EDITOR: ["CREATE_CONTENT", "EDIT_RESOURCES"],
};

const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
});

async function readUsers() {
  try {
    const data = await readFile(USERS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function writeUsers(users) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto
    .pbkdf2Sync(password, salt, 310000, 32, "sha256")
    .toString("hex");

  return `${salt}:${hash}`;
}

function verifyPassword(password, storedPassword) {
  const [salt, storedHash] = String(storedPassword || "").split(":");

  if (!salt || !storedHash) {
    return false;
  }

  const attemptedHash = hashPassword(password, salt).split(":")[1];

  return crypto.timingSafeEqual(
    Buffer.from(storedHash, "hex"),
    Buffer.from(attemptedHash, "hex")
  );
}

function createToken(user) {
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url"
  );
  const signature = crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(encodedPayload)
    .digest("base64url");

  return `${encodedPayload}.${signature}`;
}

function createAuthResponse(user) {
  const token = createToken(user);
  const permissions = ROLE_PERMISSIONS[user.role] || [];

  return {
    user: publicUser(user),
    token,
    session: {
      token,
      issuedAt: new Date().toISOString(),
    },
    roles: [user.role],
    permissions,
  };
}

export async function registerUser({ name, email, password }) {
  const users = await readUsers();
  const normalizedEmail = normalizeEmail(email);

  if (users.some((user) => user.email === normalizedEmail)) {
    return {
      error: "An account with this email already exists.",
      status: 409,
    };
  }

  // Check if a Super Admin already exists
  const hasSuperAdmin = users.some(
    (user) => user.role === "SUPER_ADMIN"
  );

  const role = hasSuperAdmin ? DEFAULT_ROLE : "SUPER_ADMIN";

  const user = {
    id: crypto.randomUUID(),
    name: String(name || "").trim(),
    email: normalizedEmail,
    passwordHash: hashPassword(password),
    role,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  await writeUsers(users);

  return {
    data: createAuthResponse(user),
    status: 201,
  };
}

export async function authenticateUser({ email, password }) {
  const users = await readUsers();
  const normalizedEmail = normalizeEmail(email);
  const user = users.find((entry) => entry.email === normalizedEmail);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { error: "Invalid email or password.", status: 401 };
  }

  return { data: createAuthResponse(user), status: 200 };
}
