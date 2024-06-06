import Image from 'next/image';

const NotFound = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='mt-48 flex flex-col justify-center items-center'>
        <Image src={'https://i.ibb.co/7jrkzKj/hedy-logo.png'} height={500} width={500} alt='logo-home' />
        <p>Error 404! Page not found</p>
      </div>

    </div>
  );
};

export default NotFound;
