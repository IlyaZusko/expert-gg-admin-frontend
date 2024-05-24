'use client';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import TextInput from '@/components/TextInput';
import { Button } from '@/components/ui/button';
import { auth } from '@/firebase/config';

interface ISignIn {
  username: string;
  password: string;
}

const initialValues: ISignIn = {
  username: 'gen_admin',
  password: 'GenAdmin',
  // username: '',
  // password: '',
};

const AuthScreen = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();
  const formik = useFormik<ISignIn>({
    initialValues,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const { username, password } = values;
      if (username === 'gen_admin' && password === 'GenAdmin') {
        signInWithEmailAndPassword(auth, 'gen_admin@gmail.com', password)
          .then(() => {
            router.push('/dashboard');
          })
          .catch((error) => console.log(error.message));
      } else {
        setIsError(true);
      }
    },
  });

  const { values, submitForm, setFieldValue, errors } = formik;
  return (
    <div className="w-full h-[100vh] flex justify-start pt-10 text-white items-center flex-col bg-gradient-to-t from-[#090C15] to-[#001F4F]">
      <Image
        src={require('@/public/images/logo.png')}
        alt=""
        width={183}
        height={79}
      />
      <div className="flex flex-col w-[400px] pt-16">
        <p className="font-bold text-2xl text-custom-black-title text-left">
          С возвращением!
        </p>
        <p className="text-base text-custom-black-title text-left pt-2">
          Вход в админ панель
        </p>
        <div className="w-full flex flex-col gap-y-3 pt-5">
          <TextInput
            type="text"
            value={values.username}
            onChange={(v) => setFieldValue('username', v)}
            placeholder="Юзернейм"
            error={errors.username}
          />
          <TextInput
            type="password"
            value={values.password}
            onChange={(v) => setFieldValue('password', v)}
            placeholder="Пароль"
            error={errors.password}
          />
          {isError && (
            <p className="text-sm font-light text-[#EB5757]">
              Некорректные данные. Попробуйте еще раз
            </p>
          )}
          <Button onClick={() => submitForm()} className="w-full">
            Войти
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
