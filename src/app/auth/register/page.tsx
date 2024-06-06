'use client';
import GoogleLogo from '@/assets/google-icon.svg';
import { signIn, useSession } from 'next-auth/react';
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

const Register = () => {
  const [errorState, setErrorState] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const body = {
      email: formData.get("email"),
      password: formData.get("password"),
      fullname: formData.get("fullname")
    };

    try {
      const fetchData = await fetch(`/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await fetchData.json();

      if (fetchData.status === 200) {

        setErrorState('');

        const res = await signIn('credentials', {
          email: data.savedUser.email,
          password: body.password,
          redirect: false
        });

        if (res?.ok) router.push('/dashboard');

      } else {
        setErrorState(data.message);
        throw new Error(data.message);
      }

    } catch (error) {
      console.error(error as DOMException);
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
        <p>Register</p>
        <form action="" method="post" className={styles.form} onSubmit={handleSubmit}>
          {errorState !== '' && <div className={styles.errorMessage}>{errorState}</div>}
          <input type="text" name="fullname" id="input-name" placeholder='Joe Doe' className={styles.input} />
          <input type="email" name="email" id="input-email" placeholder='example@email.com' className={styles.input} />
          <input type="password" name="password" id="input-password" placeholder='********' className={styles.input} />
          <button type="submit" className={styles.button}>Register</button>
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

export default Register;
