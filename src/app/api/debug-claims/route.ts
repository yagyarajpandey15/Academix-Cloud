import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const authObject = await auth();
  const user = await currentUser();
  
  return NextResponse.json({
    sessionClaims: authObject.sessionClaims,
    userId: authObject.userId,
    publicMetadata: user?.publicMetadata,
  });
}
