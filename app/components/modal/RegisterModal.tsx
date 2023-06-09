'use client';

import React from 'react';
import axios from 'axios';
import { AiOutlineGithub } from 'react-icons/ai';
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegister';
import Modal from './Modal';
import Heading from '../share/Heading';
import Input from '../Input/Input';
import toast from 'react-hot-toast';
import Button from '../share/Button';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLogin';


const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setLoading] = useState(false);

  const { register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    axios.post("/api/register", data)
    .then( () => {
      registerModal.onClose();
      loginModal.onOpen();
    })
    .catch((error) => {
      toast.error("Something went wrong, please try again")
    })
    .finally(() => {
      setLoading(false);
    })
  };

  const toogle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const BodyContent = (
    <div className="flex  flex-col gap-4">
      <Heading title='Welcome to Airbnb' subtitle="Create an account!"/>
      <Input id="email" label="Email"
      disabled={isLoading} register={register}
      errors={errors} required
      />
      <Input id="name" label="Name"
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
      icon={FcGoogle} onClick={() => signIn('google')}
      />
      <Button outline label="Continue with Github" 
      icon={AiOutlineGithub} onClick={() => signIn('github')}
      />
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className="flex flex-row items-center gap-3 justify-center">
          <div> Already have an account ?</div>
          <div className="text-neutral-800 cursor-pointer hover:underline"
            onClick={toogle}
          > Log in </div>
        </div>
      </div>
    </div>
  )
  return (
    <Modal 
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={BodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal;