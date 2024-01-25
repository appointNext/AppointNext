import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password, phone } = reqBody;
    console.log(reqBody);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      NextResponse.json({
        status: 400,
        body: { message: "User already exists" },
      });
    }
    let localImage;
    if (
      reqBody.profileImage &&
      Array.isArray(reqBody.profileImage) &&
      reqBody.profileImage.length > 0
    ) {
      localImage = reqBody.profileImage[0].localImage[0].path;
    }
    const user = await User.create({
      email,
      password,
      name: reqBody.name,
      phone,
      profileImage: localImage,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}
