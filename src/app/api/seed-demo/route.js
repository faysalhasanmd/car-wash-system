import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export async function GET() {
  const users = await dbConnect("users");

  const exists = await users.findOne({ email: "demo@example.com" });

  if (exists) {
    return Response.json({ message: "Demo user already exists" });
  }

  const passwordHash = await bcrypt.hash("demo1234", 10);

  await users.insertOne({
    name: "Demo User",
    email: "demo@example.com",
    phone: "01700000000",
    photoURL: null,
    password: passwordHash,
    role: "user",
  });

  return Response.json({ message: "Demo user created successfully!" });
}
