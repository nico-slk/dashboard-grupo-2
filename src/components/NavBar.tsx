'use client';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleLogOut = async () => {
    await signOut({
      callbackUrl: '/',
    });
  };

  const handleRegister = () => {
    router.push('/auth/register');
  };

  const handleLogIn = () => {
    router.push('/auth/login');
  };


  return (
    <div className='w-full h-24 min-w-[600px] flex flex-row justify-around items-center mb-28'>
      <Link href={'/'}>
        <Image src={'https://i.ibb.co/JHxygrY/hedy-h.png'} height={60} width={60} alt='logo' priority={true} />
      </Link>
      {session ?
        <div className='flex flex-row-reverse justify-between items-center w-1/4'>
          <button
            className='w-48 h-12 border-solid border-2 rounded-lg border-red-400 text-white'
            onClick={handleLogOut}
          >Log Out</button>
        </div>
        :
        <div className='flex flex-row-reverse justify-between items-center max-w-2/4'>
          <button
            className='w-48 h-12 ml-2 border-solid border-2 rounded-lg border-blue-400 bg-blue-500 text-white'
            onClick={handleLogIn}
          >Log In</button>
          <button
            className='w-48 h-12 ml-2 border-solid border-2 rounded-lg border-cyan-400 bg-cyan-500 text-white'
            onClick={handleRegister}
          >Register</button>
        </div>
      }
    </div>
  );
};

export default NavBar;
