import { dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcrypt";

export async function PATCH(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return Response.json({ status: 401, message: "Unauthorized" });

  const users = await dbConnect("users");
  const { name, phone, photoURL, currentPassword, newPassword } =
    await request.json();

  const updateFields = {};
  if (name) updateFields.name = name;
  if (phone) updateFields.phone = phone;
  if (photoURL) {
    updateFields.photoURL = photoURL;
    updateFields.image = photoURL;
  }

  if (newPassword) {
    const user = await users.findOne({ email: session.user.email });
    if (!user?.password)
      return Response.json({
        status: 400,
        message: "No password set for this account",
      });
    const valid = await bcrypt.compare(currentPassword ?? "", user.password);
    if (!valid)
      return Response.json({
        status: 400,
        message: "Current password is incorrect",
      });
    if (newPassword.length < 4)
      return Response.json({
        status: 400,
        message: "Password must be at least 4 characters",
      });
    updateFields.password = await bcrypt.hash(newPassword, 10);
  }

  await users.updateOne({ email: session.user.email }, { $set: updateFields });
  return Response.json({
    status: 200,
    message: "Profile updated successfully",
  });
}
