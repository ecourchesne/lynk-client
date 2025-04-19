import Nav from '@/components/ui/nav'
import DecryptedText from '@/components/utils/DecryptText'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

import decoders from '@/lib/decoders.json'

const Decoder = () => {
    const [decoder, setDecoder] = useState<Decoder | null>(null)
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        console.log('id: ', id)
        if (id && decoders.find(d => d.id === id)) {
            setDecoder(decoders.find(d => d.id === id)! as Decoder)
        }
    }, [id])

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
                <DecryptedText text={decoder.name} animateOn="view" sequential />
            </h1>

            <h2 className="text-lg font-normal text-white mt-8 mb-4">Details</h2>
            <div className="flex gap-2">
                <div className="card w-max h-10 text-white text-xs px-4 flex items-center justify-center">
                    {/* {decoder.accountActivationKey} */}cscsdcsdc
                </div>
                {/* <CopyButton value={decoder.accountActivationKey} /> */}
            </div>

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
                {decoder.subscriptions.length === 0 ? (
                    <p className="uppercase text-sm tracking-widest font-montech">No Subscriptions</p>
                ) : (
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
                )}
            </ul>
        </div>
    )
}

export default Decoder
