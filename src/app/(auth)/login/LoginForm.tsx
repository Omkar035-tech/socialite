"use client"

import { loginSchema, loginValues } from '@/lib/validation';
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { login } from './actions';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/PasswordInput';
import LoadingButton from '@/components/LoadingButtion';

const LoginForm = () => {
    const [error, setError] = useState<string>();
    const [isPending, startTransition] = useTransition();

    const form = useForm<loginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    });

    async function onSubmit(values: loginValues) {
        setError(undefined)
        startTransition(async () => {
            const { error } = await login(values);
            if (error) setError(error)
        })
    }

    return (
        <Form {...form}>
            <form action="" onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
            {error && <p className='text-center text-destructive'>{error}</p>}
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder='Username' {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                            <PasswordInput placeholder='Password' {...field}/>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <LoadingButton
                loading={isPending} type='submit' className='w-full'>
                   Login
                </LoadingButton>
            </form>
        </Form>
    )
}

export default LoginForm