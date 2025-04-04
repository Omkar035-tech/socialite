"use client"

import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema, signUpValues } from '@/lib/validation'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signUp } from './actions'
import { PasswordInput } from '@/components/PasswordInput'
import LoadingButton from '@/components/LoadingButtion'

const SignUpForm = () => {
    const [error, setError] = useState<string>();
    const [isPending, startTransition] = useTransition();

    const form = useForm<signUpValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
        }
    });

    async function onSubmit(values: signUpValues) {
        setError(undefined);
        startTransition(async () => {
            const { error } = await signUp(values);
            if (error) setError(error);
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
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
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder='Email' type='email' {...field} />
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
                    Create account
                </LoadingButton>
            </form>
        </Form>
    )
}

export default SignUpForm
