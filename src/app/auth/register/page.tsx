'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const styles = {
  input: "my-6 h-12 p-4 w-4/6 bg-slate-300 text-black rounded-lg border-2 border-solid border-slate-400",
  button: "w-48 p-3 border-solid rounded-lg bg-slate-400 border-4 my-6",
  form: "flex flex-col w-4/6 justify-center items-center h-screen",
  errorMessage: 'my-6 h-12 p-4 w-4/6 bg-red-500 text-white rounded-lg flex justify-center items-center'
};

const Register = () => {
  const [errorState, setErrorState] = useState('');
  const router = useRouter();

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

  return (
    <div className='flex justify-center items-center flex-col h-full w-full'>
      <form action="" method="post" className={styles.form} onSubmit={handleSubmit}>
        {errorState !== '' && <div className={styles.errorMessage}>{errorState}</div>}
        <input type="text" name="fullname" id="input-name" placeholder='Joe Doe' className={styles.input} />
        <input type="email" name="email" id="input-email" placeholder='example@email.com' className={styles.input} />
        <input type="password" name="password" id="input-password" placeholder='********' className={styles.input} />
        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );

};

export default Register;
