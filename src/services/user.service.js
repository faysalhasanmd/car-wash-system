"use server";

export const signup = async (data) => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL || "https://car-wash-system-two.vercel.app"}/api/users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to create user");
  }

  //   revalidateTag("users");
  return res.json();
};
