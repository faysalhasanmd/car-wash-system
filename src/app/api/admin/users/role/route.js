import { dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export async function PATCH(request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin")
    return Response.json({ status: 403, message: "Forbidden" });

  const { userId, role } = await request.json();
  if (!["user", "manager", "admin"].includes(role))
    return Response.json({ status: 400, message: "Invalid role" });

  const users = await dbConnect("users");
  await users.updateOne({ _id: new ObjectId(userId) }, { $set: { role } });
  return Response.json({ status: 200, message: "Role updated" });
}
