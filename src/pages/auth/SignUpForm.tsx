import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/store/authStore'
import { useState } from 'react'
import StateButton from '@/components/ui/form-button'

const formSchema = z
    .object({
        firstname: z.string().min(2, { message: 'Enter a valid first name.' }),
        lastname: z.string().min(2, { message: 'Enter a valid last name.' }),
        email: z.string().email({ message: 'Enter a valid email address.' }),
        pwd: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
        confirmPwd: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
        activationKey: z.string().length(12, { message: 'Enter a valid 12 character activation code.' }),
    })
    .refine(data => data.pwd === data.confirmPwd, {
        message: 'Passwords do not match.',
    })

const SignUpForm = () => {
    const { register } = useAuthStore()

    const [state, setState] = useState<RequestStatus>('idle')
    const [error, setError] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            pwd: '',
            confirmPwd: '',
            activationKey: '',
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setError(null)
        setState('loading')

        const { success, error } = await register(
            data.firstname,
            data.lastname,
            data.email,
            data.pwd,
            data.activationKey
        )

        if (success) {
            setState('success')
        } else {
            setState('error')
            setError(error)
        }
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormMessage>{error && <p className="mb-8 text-sm text-red-600">{error}</p>}</FormMessage>
                <div className="columns-2">
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pwd"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPwd"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="activationKey"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Activation Code</FormLabel>
                            <FormDescription>A 12 digit code given to you by LYNK or your company.</FormDescription>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <StateButton state={state} type="submit">
                    Sign Up
                </StateButton>
            </form>
        </FormProvider>
    )
}

export default SignUpForm
