import Nav from '@/components/ui/nav'
import DecryptedText from '@/components/utils/DecryptText'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

import { useDecoderStore } from '@/store/decoderStore'
import { useAuthStore } from '@/store/authStore'

const Decoder = () => {
    const { id } = useParams<{ id: string }>()

    const { user } = useAuthStore()
    const { decoder, getDecoderById } = useDecoderStore()

    const [fakeStatus, setFakeStatus] = useState('connecting')

    useEffect(() => {
        if (id) getDecoderById(id)

        const timeout = setTimeout(() => setFakeStatus('active'), 2750)

        return () => {
            clearTimeout(timeout)
        }
    }, [id, getDecoderById])

    if (!decoder) {
        return (
            <div className="w-cont-sm mx-auto py-32">
                <Nav />
                <h1 className="text-center py-16">Decoder not found</h1>
            </div>
        )
    }

    return (
        <div className="w-cont-sm mx-auto py-32">
            <Nav />

            {/* Back to dashboard */}
            <Link
                to="/dashboard"
                className="block mt-8 mb-12 font-poppins text-sm text-white-60 hover:text-white duration-200 ease-in-out font-normal"
            >
                <span className="mr-2">{'<'}</span> Dashboard
            </Link>

            {/* header */}
            <h1>
                <DecryptedText text={decoder?.name || decoder.model} animateOn="view" sequential />
            </h1>

            {/* status */}
            <h2
                className={`text-lg font-normal mt-8 mb-4 flex items-center gap-2
                            ${
                                fakeStatus === 'active'
                                    ? 'text-green-400'
                                    : fakeStatus === 'down'
                                    ? 'text-red-400'
                                    : 'text-amber-300 animate-pulse duration-[1.5s]'
                            }`}
            >
                <span
                    className={`w-2 h-2 rounded-full 
                                ${
                                    fakeStatus === 'active'
                                        ? 'bg-green-400'
                                        : fakeStatus === 'down'
                                        ? 'bg-red-400'
                                        : 'bg-amber-300'
                                }`}
                />
                {fakeStatus === 'active' ? 'Active' : fakeStatus === 'down' ? 'Down' : 'Connecting'}
            </h2>

            {/* subscription list */}
            <div className="flex items-center justify-between mt-8 mb-6">
                <h2 className="text-lg font-normal text-white">Subscriptions</h2>
                <Link
                    to={`/decoder/${decoder.id}/new-subscription`}
                    className="font-poppins font-light text-xs px-3 py-1 card hover text-white"
                >
                    New
                </Link>
            </div>
            <ul className="flex flex-col gap-3">
                {decoder?.subscriptions?.length > 1 ? (
                    decoder.subscriptions.map((s, i) => (
                        <motion.li
                            initial={{ opacity: 0, y: '100%' }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.85, ease: 'circInOut', delay: i * 0.1 },
                            }}
                            className="w-full"
                            key={s.id}
                        >
                            <div className="card flex items-center justify-between p-8">
                                <h3 className="font-normal text-white">{s.name}</h3>
                            </div>
                        </motion.li>
                    ))
                ) : (
                    <p className="uppercase text-sm tracking-widest font-montech">No Subscriptions</p>
                )}
            </ul>
        </div>
    )
}

export default Decoder
