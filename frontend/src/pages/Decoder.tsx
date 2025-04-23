import Nav from '@/components/ui/nav'
import DecryptedText from '@/components/utils/DecryptText'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

import { useDecoderStore } from '@/store/decoderStore'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Trash } from 'lucide-react'
import StateButton from '@/components/ui/form-button'

const Decoder = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [rebooting, setRebooting] = useState<'idle' | 'loading'>('idle')
    const [resetting, setResetting] = useState<'idle' | 'loading'>('idle')

    const { user } = useAuthStore()
    const {
        decoder,
        subscriptions,
        getDecoderById,
        getSubscriptions,
        addSubscription,
        deleteSubscription,
        reboot,
        reset,
        kill,
    } = useDecoderStore()

    useEffect(() => {
        getSubscriptions()
    }, [getSubscriptions])

    useEffect(() => {
        if (decoder?.state === 'active' && (rebooting === 'loading' || resetting === 'loading')) {
            setRebooting('idle')
            setResetting('idle')
        }
    }, [decoder])

    useEffect(() => {
        if (!id) return

        // Call immediately once
        getDecoderById(id)

        // Then set up interval
        const interval = setInterval(() => {
            getDecoderById(id)
        }, 5000)

        // Clear interval when component unmounts or id changes
        return () => clearInterval(interval)
    }, [id, getDecoderById])

    const handleAddSubscription = async (subscriptionItemId: number) => {
        const decoderId = id
        const subscriptionItemIds = decoder?.subscriptions
            ? [...decoder?.subscriptions.map(s => Number(s.id)), subscriptionItemId]
            : [subscriptionItemId]
        await addSubscription(decoderId!, subscriptionItemIds)
    }

    const handleDeleteSub = async (subscriptionItemId: number) => {
        const decoderId = id
        await deleteSubscription(decoderId!, [subscriptionItemId])
    }

    const handleKill = async () => {
        const decoderId = id
        await kill(decoderId!)
    }

    const handleReboot = async () => {
        setRebooting('loading')
        const decoderId = id
        await reboot(decoderId!)
    }

    const handleReset = async () => {
        setResetting('loading')
        const decoderId = id
        await reset(decoderId!)
    }

    if (!decoder) {
        return (
            <div className="w-cont-sm mx-auto md:py-32 pb-12">
                <Nav />
                <h1 className="text-center py-16">Decoder not found</h1>
            </div>
        )
    }

    return (
        <div className="w-cont-sm mx-auto md:py-32 pb-12">
            <Nav />

            {/* Back to dashboard */}
            {user?.role !== 'individual' && (
                <button
                    onClick={() => navigate(-1)}
                    className="block mt-8 mb-12 font-poppins text-sm text-white-60 hover:text-white duration-200 ease-in-out font-normal"
                >
                    <span className="mr-2">{'<'}</span> Back
                </button>
            )}

            {/* header */}
            <h1 className={`flex items-center justify-between ${user?.role === 'individual' ? 'mt-12' : ''}`}>
                <DecryptedText text={decoder?.name || decoder.model} animateOn="view" sequential />
                {/* status */}
                <span
                    className={`font-montech text-lg font-normal flex items-center gap-2
                            ${
                                decoder.state === 'active'
                                    ? 'text-green-400'
                                    : decoder.state === 'inactive'
                                    ? 'text-red-500'
                                    : 'text-amber-300 animate-pulse duration-[1.5s]'
                            }`}
                >
                    <span
                        className={`w-2 h-2 rounded-full 
                                ${
                                    decoder.state === 'active'
                                        ? 'bg-green-400'
                                        : decoder.state === 'inactive'
                                        ? 'bg-red-500'
                                        : 'bg-amber-300'
                                }`}
                    />
                    {decoder.state === 'active' ? 'Active' : decoder.state === 'inactive' ? 'Down' : 'Connecting'}
                </span>
            </h1>

            {/* details */}
            <div className="border border-white-20 bg-white-04 rounded-sm px-8 py-6 mt-8 mb-4 grid grid-cols-2 gap-2">
                <div>
                    <span className="block text-xs uppercase mb-3">Rebooted on</span>
                    <span className="block font-montech text-white">
                        {decoder?.lastRestartedAt ? new Date(decoder.lastRestartedAt).toLocaleString() : '-'}
                    </span>
                </div>
                <div>
                    <span className="block text-xs uppercase mb-3">Reset on</span>
                    <span className="block font-montech text-white">
                        {decoder?.lastReinitializedAt ? new Date(decoder.lastReinitializedAt).toLocaleString() : '-'}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pb-3">
                <StateButton
                    className="mt-0"
                    state={rebooting}
                    disabled={decoder.state === 'inactive'}
                    onClick={handleReboot}
                >
                    Reboot
                </StateButton>
                <StateButton
                    className="mt-0"
                    state={resetting}
                    disabled={decoder.state === 'inactive'}
                    onClick={handleReset}
                >
                    Reset
                </StateButton>
                <Button disabled={decoder.state === 'inactive'} onClick={handleKill}>
                    Kill
                </Button>
            </div>

            {/* subscription list */}
            <div className="flex items-center justify-between mt-8 mb-6">
                <h2 className="text-lg font-normal text-white">Subscriptions</h2>
                {subscriptions?.filter(s => !decoder?.subscriptions?.find(e => e.id === s.id))?.length > 0 && (
                    <Popover>
                        <PopoverTrigger className="font-montech text-sm font-light card px-3 py-1 text-white tracking-widest">
                            Add
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-cont border border-white-20 bg-black p-0"
                            side="bottom"
                            align="end"
                            sideOffset={6}
                        >
                            <div className="w-full p-1 grid grid-cols-2 gap-1">
                                {subscriptions
                                    ?.filter(s => !decoder?.subscriptions?.find(e => e.id === s.id))
                                    ?.map(s => (
                                        <button
                                            key={s.id}
                                            onClick={() => handleAddSubscription(Number(s.id))}
                                            className="font-poppins font-normal text-sm border border-white-20 rounded-xs px-6 py-1.5 hover:bg-white-06 hover:text-white"
                                        >
                                            {s.name}
                                        </button>
                                    ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                )}
            </div>
            <ul className="flex flex-col gap-3">
                {decoder?.subscriptions?.length > 0 ? (
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
                                <button onClick={() => handleDeleteSub(Number(s.id))} className="card p-2">
                                    <Trash size={14} />
                                </button>
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
