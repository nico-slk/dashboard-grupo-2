'use client';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LanguangeChange from './LanguangeChange';

const NavBar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const translation = useTranslations('navBar');

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
      <div className='flex flex-row justify-between items-center border-1 border-white'>
        {session ?
          <div className='flex items-center border-1 border-white w-96'>
            <button
              className='w-48 h-12 rounded-lg border-2 border-red-400 hover:bg-red-400 hover:bg-opacity-15 text-white'
              onClick={handleLogOut}
            >{translation('logOut')}</button>
          </div>
          :
          <div className='flex flex-row-reverse justify-between items-center max-w-2/4'>
            <button
              className='w-48 h-12 ml-2 rounded-lg border-blue-400 bg-blue-500 hover:bg-blue-600 text-white'
              onClick={handleLogIn}
            >{translation('logIn')}</button>
            <button
              className='w-48 h-12 ml-2 rounded-lg border-cyan-400 bg-cyan-500 hover:bg-cyan-600 text-white'
              onClick={handleRegister}
            >{translation('register')}</button>
          </div>
        }
        <LanguangeChange />
      </div>
    </div>
  );
};

export default NavBar;
