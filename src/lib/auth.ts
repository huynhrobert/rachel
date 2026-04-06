import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { compareSync } from "bcryptjs";
import { prisma } from "@/lib/db";

const COOKIE_NAME = "admin_session";

function getSecret() {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error("NEXTAUTH_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export async function verifyAdmin(email: string, password: string) {
  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) return null;
  const valid = compareSync(password, admin.passwordHash);
  if (!valid) return null;
  return { id: admin.id, email: admin.email, name: admin.name };
}

export async function createSession(adminId: string) {
  const token = await new SignJWT({ adminId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    const adminId = payload.adminId as string;
    const admin = await prisma.adminUser.findUnique({
      where: { id: adminId },
      select: { id: true, email: true, name: true },
    });
    return admin;
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
