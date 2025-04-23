import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import StateButton from '@/components/ui/form-button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useClientStore } from '@/store/clientStore'
import { useDecoderStore } from '@/store/decoderStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
    email: z.string().email('Invalid email address.'),
    decoderId: z.string({ required_error: 'Select a decoder.' }).min(1, 'Select a decoder.'),
})

const PersonalForm = () => {
    const { addPersonalClient } = useClientStore()
    const { decoders, getDecoders } = useDecoderStore()

    const [state, setState] = useState<RequestStatus>('idle')
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getDecoders()
    }, [getDecoders])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            decoderId: undefined,
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setError(null)
        setState('loading')

        const { success, error } = await addPersonalClient({ email: data.email, decoderId: Number(data.decoderId) })

        if (success) {
            setState('success')
        } else {
            setState('error')
            setError(error)
        }

        setState('success')
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <FormMessage>{error && <p className="mb-8 text-sm text-red-600">{error}</p>}</FormMessage>

                {/* Email Field */}
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
                    name="decoderId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Decoder</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                            className="text-white font-poppins font-normal"
                                            placeholder="Select a decoder"
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {decoders?.map(d => (
                                        <SelectItem value={d.id.toString()} key={d.id}>
                                            {d.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <StateButton state={state} type="submit">
                    Create Client
                </StateButton>
            </form>
        </FormProvider>
    )
}

export default PersonalForm
