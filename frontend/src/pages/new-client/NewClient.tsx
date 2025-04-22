import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import DecryptedText from '@/components/utils/DecryptText'
import { useDecoderStore } from '@/store/decoderStore'
import { useCompanyStore } from '@/store/companyStore'
import { useClientStore } from '@/store/clientStore'
import PersonalForm from './PersonalForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CommercialForm from './CommercialForm'

const formSchema = z.object({
    email: z.string().email(''),
    type: z.enum(['personal', 'commercial']),
    decoderId: z.string().optional(),
    companyId: z.string().optional(),
})

const NewClient = () => {
    return (
        <div className="w-full min-h-[100vh] py-8 flex flex-col items-center justify-center gap-16">
            <span className="font-montech text-sm text-white tracking-widest lighted w-cont-sm">LYNK</span>

            <main className="w-cont-sm rounded-[12px]">
                <h1 className="mb-8">
                    <DecryptedText animateOn="view" speed={70} text="New Client" />
                </h1>

                <Tabs defaultValue="personal" className="w-full">
                    <TabsList>
                        <TabsTrigger value="personal">Personal</TabsTrigger>
                        <TabsTrigger value="commercial">Commercial</TabsTrigger>
                    </TabsList>
                    <TabsContent value="personal">
                        <PersonalForm />
                    </TabsContent>
                    <TabsContent value="commercial">
                        <CommercialForm />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}

export default NewClient
