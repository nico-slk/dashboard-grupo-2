'use client';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import { useTranslations } from 'use-intl';

const LanguangeChange = () => {
  const translation = useTranslations('lagSelector');
  const router = useRouter();

  const handleChangeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    const currentLocale = window.location.pathname.slice(1, 3);
    const next = window.location.pathname.replace(currentLocale, nextLocale);

    router.replace(next);
  };

  return (
    <label className='flex flex-col justify-center items-end'>
      <p>{translation('selectLanguage')}</p>
      <select name="" id="" onChange={handleChangeLanguage} className='text-white p-1 rounded-sm bg-slate-700 mt-1'>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </label>
  );
};

export default LanguangeChange;
