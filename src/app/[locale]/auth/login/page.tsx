'use client';
import GoogleLogo from '@/assets/google-icon.svg';
import { signIn, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

const styles = {
  input: "my-6 h-12 p-4 w-4/6 bg-slate-300 text-black rounded-lg border-2 border-solid border-slate-400",
  button: "w-48 p-3 rounded-lg bg-slate-400 hover:bg-slate-500 my-6",
  btn_google: 'bg-red-600 hover:bg-red-700 rounded-lg p-3 font-semibold text-lg',
  form: "flex flex-col w-4/6 items-center h-[600px] min-w-[600px]",
  errorMessage: 'my-6 h-12 p-4 w-4/6 bg-red-500 text-white rounded-lg flex justify-center items-center'
};

const LogIn = () => {
  const [errorState, setErrorState] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const translation = useTranslations('login');

  const handleLogIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const res = await signIn('credentials', {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false
      });

      if (res?.error) setErrorState(res?.error as string);
      if (res?.ok) router.push('/dashboard');

    } catch (error) {
      setErrorState('Error al intentar loguearse.');
    }

  };

  useEffect(() => {
    if (session) {
      setIsAuth(true);
    }
  }, [isAuth]);

  if (isAuth) {
    router.push('/dashboard');
  } else {

    return (
      <div className='flex justify-center min-w-[600px] items-center flex-col h-full w-full'>
        <p>{translation('pageTitle')}</p>
        <form action="" method="post" className={styles.form} onSubmit={handleLogIn}>
          {errorState !== '' && <div className={styles.errorMessage}>{errorState}</div>}
          <input type="email" name="email" id="input-email" placeholder='example@email.com' className={styles.input} />
          <input type="password" name="password" id="input-password" placeholder='********' className={styles.input} />
          <button type="submit" className={styles.button}>{translation('button')}</button>
          <button type="button" onClick={async () => await signIn("google")} className={styles.btn_google}>
            <Image
              src={GoogleLogo}
              height={25}
              width={25}
              alt='google'
              className="fill-gray-400 md:fill-cyan-700 text-white"
            />
          </button>
        </form>
      </div>
    );
  }


};

export default LogIn;
