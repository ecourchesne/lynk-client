import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import StateButton from '@/components/ui/form-button'
import { useAuthStore } from '@/store/authStore'

const formSchema = z.object({
    email: z.string().email({ message: 'Enter a valid email address.' }),
    pwd: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
})

const LoginForm = () => {
    const login = useAuthStore(state => state.login)

    const [state, setState] = useState<RequestStatus>('idle')
    const [error, setError] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            pwd: '',
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setError(null)
        setState('loading')

        const { success, error } = await login(data.email, data.pwd)

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
                <StateButton state={state} type="submit">
                    Log In
                </StateButton>
            </form>
        </FormProvider>
    )
}

export default LoginForm
