import Image from 'next/image';

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image src={'https://i.ibb.co/7jrkzKj/hedy-logo.png'} height={500} width={500} alt='logo-home' />
    </main>
  );
};

export default Home;
