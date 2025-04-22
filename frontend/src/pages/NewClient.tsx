import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import StateButton from '@/components/ui/form-button';
import DecryptedText from '@/components/utils/DecryptText';
import { useDecoderStore } from '@/store/decoderStore';
import { useCompanyStore } from '@/store/companyStore';
import { useClientStore } from '@/store/clientStore';

const formSchema = z.object({
    email: z.string().email(''),
    type: z.enum(['personal', 'commercial']),
    decoderId: z.string().optional(),
    companyId: z.string().optional(),
});

const NewClient = () => {
    const [state, setState] = useState<RequestStatus>('idle');
    const [error, setError] = useState<string | null>(null);
    const {decoders, getDecoders } = useDecoderStore();
    const {companies, getCompanies } = useCompanyStore();
    const { addClient } = useClientStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            type: 'personal',
            decoderId: '',
            companyId: '',
        },
    });

    const selectedType = form.watch('type');

    useEffect(() => {
        getDecoders(); 
        getCompanies();
    }, [getDecoders, getCompanies]);

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setError(null);
        setState('loading');

        const { success, error } = addClient(clientData);

        if (success) {
            setState('success')
        } else {
            setState('error')
            setError(error)
        }


        setState('success');
    };

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

                        {/* Radio Buttons for Type */}
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                {...field}
                                                value={'personal'}
                                            />
                                            Personal
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                {...field}
                                                value={'commercial'}
                                            />
                                            Commercial
                                        </label>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Dropdown for Decoders (if Personal) */}
                        {selectedType == 'personal' && (
                            <FormField
                                control={form.control}
                                name="decoderId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Decoder</FormLabel>
                                        <FormControl>
                                            <select
                                                {...field}
                                                className="form-select w-full border rounded-md p-2 bg-gray-800 text-white"
                                            >
                                                <option value="" disabled>
                                                    Select a decoder
                                                </option>
                                                {decoders.map((decoder) => (
                                                    <option
                                                        key={decoder.id}
                                                        value={decoder.id}
                                                        className="bg-gray-800 text-white"
                                                    >
                                                        {decoder.model} {decoder.name} - Decoder ID: {decoder.id}
                                                    </option>
                                                ))}
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {/* Dropdown for Companies (if Commercial) */}
                        {selectedType == 'commercial' && (
                            <FormField
                                control={form.control}
                                name="companyId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company</FormLabel>
                                        <FormControl>
                                            <select
                                                {...field}
                                                className="form-select w-full border rounded-md p-2 bg-gray-800 text-white"
                                            >
                                                <option value="" disabled>
                                                    Select a company
                                                </option>
                                                {companies.map((company) => (
                                                    <option
                                                        key={company.id}
                                                        value={company.id}
                                                        className="bg-gray-800 text-white"
                                                    >
                                                        {company.name} - Company ID: {company.id}
                                                    </option>
                                                ))}
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <StateButton state={state} type="submit">
                            Submit
                        </StateButton>
                    </form>
                </FormProvider>
            </main>
        </div>
    );
};

export default NewClient;