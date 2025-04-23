import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import StateButton from '@/components/ui/form-button'
import DecryptedText from '@/components/utils/DecryptText'
import { useCompanyStore } from '@/store/companyStore'
import { useNavigate } from 'react-router-dom'

const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
})

const NewCompany = () => {
    const navigate = useNavigate()
    const { createCompany } = useCompanyStore()

    const [state, setState] = useState<RequestStatus>('idle')
    const [error, setError] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            address: '',
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setError(null)
        setState('loading')

        const { success, error } = await createCompany(data)

        if (success) {
            setState('success')
            navigate('/')
        } else {
            setState('error')
            setError(error)
        }

        setState('success')
    }

    return (
        <div className="w-full min-h-[100vh] py-8 flex flex-col items-center justify-center gap-16">
            <span className="font-montech text-sm text-white tracking-widest lighted w-cont-sm">LYNK</span>

            <main className="w-cont-sm rounded-[12px]">
                <h1 className="mb-8">
                    <DecryptedText animateOn="view" speed={70} text="New Company" />
                </h1>

                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormMessage>{error && <p className="mb-8 text-sm text-red-600">{error}</p>}</FormMessage>

                        {/* Name Field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Name Field */}
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Adress</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <StateButton state={state} type="submit">
                            Create
                        </StateButton>
                    </form>
                </FormProvider>
            </main>
        </div>
    )
}

export default NewCompany
