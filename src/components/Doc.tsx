import GoogleLogo from '@/assets/google-icon.svg';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const Doc = () => {
  const translation = useTranslations("docs");
  const translationButtonsBoardForm = useTranslations('boardForm');
  const translationButtonsNavBar = useTranslations('navBar');
  return (
    <div className='mt-40 min-w-[600px] max-w-[800px]'>
      <section className='my-10'>
        <h1 className='text-5xl font-black'>{translation('welcome')}</h1>
        <p className='mt-5'>{translation('intro_I')}</p>
        <p className='mt-5'>{translation('intro_II')}</p>
      </section>
      <hr className='opacity-30' />

      <section className='my-10'>
        <h3 className='text-3xl font-bold'>{translation('doc_login_title')}</h3>
        <p className='mt-5'>{translation('login_tuto_I')}</p>
        <div className='w-full h-32 flex justify-center items-center'>
          <button
            className='w-48 h-12 ml-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white'
          >{translationButtonsNavBar('register')}</button>

        </div>
        <p>{translation('login_tuto_II')}</p>

        <p>{translation('login_tuto_III')}</p>
        <div className='w-full h-32 flex justify-center items-center'>
          <button
            className='w-48 h-12 ml-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white'
          >{translationButtonsNavBar('logIn')}</button>

        </div>
        <p>{translation('login_tuto_IV')}</p>

        <p>{translation('login_tuto_google')}</p>

        <div className='w-full h-32 flex justify-center items-center'>

          <button type="button" className='bg-red-600 hover:bg-red-700 rounded-lg p-3 font-semibold text-lg'>
            <Image
              src={GoogleLogo}
              height={25}
              width={25}
              alt='google'
              className="fill-gray-400 md:fill-cyan-700 text-white"
            />
          </button>
        </div>
      </section>
      <hr className='opacity-30' />

      <section className='my-10'>
        <h3 className='text-3xl font-bold'>{translation('doc_createBoard_title')}</h3>
        <p className='mt-5'>{translation('createBoard_tuto_I')}</p>
        <p>{translation('createBoard_tuto_II')}</p>
        <div className='w-full h-32 flex justify-center items-center'>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600  text-white font-bold px-4 py-2 rounded-lg"
          >
            {translationButtonsBoardForm('createBoard')}
          </button>

        </div>
        <p>{translation('createBoard_tuto_III')}</p>
      </section>
      <hr className='opacity-30' />

      <section className='my-10'>
        <h3 className='text-3xl font-bold'>{translation('doc_addPriority_title')}</h3>
        <p className='mt-5'>{translation('add_priority_I')}</p>
      </section>
      <hr className='opacity-30' />

      <section className='my-10'>
        <h3 className='text-3xl font-bold'>{translation('doc_createTicket_title')}</h3>
        <p className='mt-5'>{translation('createTicket_tuto_I')}</p>
        <div className='w-full h-32 flex justify-center items-center'>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg">
            {translationButtonsBoardForm('createBoard')}
          </button>

        </div>
        <p>{translation('createTicket_tuto_II')}</p>
        <p>{translation('createTicket_tuto_III')}</p>
      </section>
      <hr className='opacity-30' />
      <section className='my-10'>
        <h3 className='text-3xl font-bold'>{translation('doc_editTicket_title')}</h3>
        <p className='mt-5'>{translation('editTicket_tuto_I')}</p>
        <div className='w-full h-32 flex justify-center items-center'>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg">
            {translationButtonsBoardForm('updateBoard')}
          </button>

        </div>
        <p>{translation('editTicket_tuto_delete')}</p>
        <div className='w-full h-32 flex justify-center items-center'>
          <button type="button" className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg">
            {translationButtonsBoardForm('deleteBoard')}
          </button>
        </div>
      </section>
      <hr className='opacity-30' />
    </div>
  );
};

export default Doc;
