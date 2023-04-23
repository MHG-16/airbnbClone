'use client';

import React from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { AiOutlineGithub } from 'react-icons/ai';
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useLoginModal from '@/app/hooks/useLogin';
import Modal from './Modal';
import Heading from '../share/Heading';
import Input from '../Input/Input';
import toast from 'react-hot-toast';
import Button from '../share/Button';
import useRegisterModal from '@/app/hooks/useRegister';
import { useRouter } from 'next/navigation';


const LoginModal = () => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const registerModal = useRegisterModal();
  const [isLoading, setLoading] = useState(false);

  const { register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
    defaultValues: {
      name: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    signIn('credentials', {...data, redirect: false})
    .then((callback) => {
      setLoading(false);

      if (callback?.ok)
      {
        toast.success("Logged in");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error)
        toast.error(callback.error);
      
    })
  }

  const BodyContent = (
    <div className="flex  flex-col gap-4">
      <Heading title='Welcome back' subtitle="Login to your account!"/>
      <Input id="email" label="Email"
      disabled={isLoading} register={register}
      errors={errors} required
      />
      <Input id="password" label="Password" type="password"
      disabled={isLoading} register={register}
      errors={errors} required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="Continue with Google" 
      icon={FcGoogle} onClick={() => {}}
      />
      <Button outline label="Continue with Github" 
      icon={AiOutlineGithub} onClick={() => {}}
      />
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className="flex flex-row items-center gap-3 justify-center">
          <div> Already have an account ?</div>
          <div className="text-neutral-800 cursor-pointer hover:underline"> Log in </div>
        </div>
      </div>
    </div>
  )
  return (
    <Modal 
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={BodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal;