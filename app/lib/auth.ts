import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const getSession = async (req?: Request) => {
  return getServerSession(authOptions);
};
