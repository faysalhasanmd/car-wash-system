import { dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin")
    return Response.json({ status: 403, message: "Forbidden" });

  const users = await dbConnect("users");
  const allUsers = await users
    .find({}, { projection: { password: 0 } })
    .toArray();
  return Response.json({ status: 200, users: allUsers });
}
