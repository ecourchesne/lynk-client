import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import StateButton from '@/components/ui/form-button'
import { useAuthStore } from '@/store/authStore'
import { Link } from 'react-router-dom'
import DecryptedText from '@/components/utils/DecryptText'

const formSchema = z.object({
    email: z.string().email('')
})

const NewClient = () => {
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
        <div className="w-full min-h-[100vh] py-8 flex flex-col items-center justify-center gap-16">
            <span className="font-montech text-sm text-white tracking-widest lighted w-cont-sm">LYNK</span>

            <main className="w-cont-sm rounded-[12px]">
                <h1 className="mb-8">
                    <DecryptedText animateOn="view" speed={70} text="New Client" />
                </h1>

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
            </main>

            <p className="w-cont-sm">
                New client?{' '}
                <Link to="/sign-up" className="simple-link">
                    Sign Up
                </Link>
            </p>
        </div>
    )
}

export default NewClient
