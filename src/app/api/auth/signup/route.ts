import { connectDB } from '@/libs/db';
import User from '@/models/user';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {

  const { url } = await req;
  const { email, password, fullname } = await req.json();

  if (password < 8) {
    return NextResponse.json({
      url,
      message: 'Password should be more than 8 characters.'
    }, {
      status: 400
    });
  }

  try {
    await connectDB();
    const user: any = await User.findOne({ email });

    if (user) return NextResponse.json({
      url,
      message: `The user with email ${email} already exist`
    }, {
      status: 400
    });

    const hashedPassword = await bcrypt.hash(password, 12);

    console.log(password + 'to' + hashedPassword);


    const dbUser = new User({
      email,
      fullname,
      password: hashedPassword,
    });

    const savedUser = await dbUser.save();

    return NextResponse.json({
      url,
      message: 'Login test',
      savedUser
    }, {
      status: 200
    });

  } catch (error) {

    return NextResponse.json({
      url,
      message: 'Failed to create a user.',
      error
    }, {
      status: 500
    });

  }
};
