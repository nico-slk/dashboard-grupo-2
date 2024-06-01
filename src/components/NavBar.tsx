'use client';
import { signOut, useSession } from 'next-auth/react';
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
    <div className='w-full h-28 flex flex-row justify-around items-center'>
      <h1><Link href={'/'}>Page title</Link></h1>
      {session ?
        <div className='flex flex-row-reverse justify-between items-center w-1/4'>
          <button
            className='w-48 h-12 border-solid border-2 border-red-400 bg-red-500 text-white'
            onClick={handleLogOut}
          >LogOut</button>
        </div>
        :
        <div className='flex flex-row-reverse justify-between items-center w-1/4'>
          <button
            className='w-48 h-12 border-solid border-2 border-blue-400 bg-blue-500 text-white'
            onClick={handleLogIn}
          >LogIn</button>
          <button
            className='w-48 h-12 border-solid border-2 border-cyan-400 bg-cyan-500 text-white'
            onClick={handleRegister}
          >Register</button>
        </div>
      }
    </div>
  );
};

export default NavBar;
