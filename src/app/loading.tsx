import LoadingImage from '@/assets/loading.svg';
import Image from 'next/image';

const Loading = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='animate-spin h-5 w-5 mr-3'>
        <Image
          src={LoadingImage}
          height={50}
          width={50}
          alt='loading'
        />
      </div>
      <p>Loading</p>
    </div>
  );
};

export default Loading;
