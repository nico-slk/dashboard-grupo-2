import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
  return (
    <main className="flex w-full min-w-[600px] flex-col items-center justify-center pt-24">
      <div className='flex flex-col items-center justify-center'>
        <p className='pl-8 self-start text-xl'>Welcome to</p>
        <Image src={'https://i.ibb.co/7jrkzKj/hedy-logo.png'} height={500} width={500} alt='logo-home' />
        <p className='pr-8 self-end text-3xl'>Dashboard</p>
        <Link href={'/dashboard'} className='flex justify-center items-center w-48 h-12 border-solid rounded-lg border-2 border-red-400 text-white mt-16' >Go to Dashboard</Link>
      </div>
    </main>
  );
};

export default Home;
