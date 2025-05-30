import Nav from '@/components/ui/nav'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import DecryptedText from '@/components/utils/DecryptText'
import { useCompanyStore } from '@/store/companyStore'
import { useAuthStore } from '@/store/authStore'

const Company = () => {
    const { user } = useAuthStore()
    const { company, getCompanyId } = useCompanyStore()
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        if (id) getCompanyId(id)
    }, [id, getCompanyId])

    if (!company) {
        return (
            <div className="w-cont-sm mx-auto md:py-32 pb-12">
                <Nav />
                <h1 className="text-center py-16">Company not found</h1>
            </div>
        )
    }

    return (
        <div className="w-cont-sm mx-auto md:py-32 pb-12">
            <Nav />

            {/* Back to dashboard */}
            {user?.role === 'admin' && (
                <Link
                    to="/"
                    className="block mt-8 mb-12 font-poppins text-sm text-white-60 hover:text-white duration-200 ease-in-out font-normal"
                >
                    <span className="mr-2">{'<'}</span> Dashboard
                </Link>
            )}

            {/* header */}
            <h1 className={user?.role !== 'admin' ? 'mt-12' : ''}>
                <DecryptedText text={company.name} animateOn="view" sequential />
            </h1>

            {/* decoder list */}
            <h2 className="text-lg font-normal text-white mt-8 mb-4">Decoders</h2>
            <ul className="flex flex-col gap-3">
                {company.decoders.map((d, i) => (
                    <motion.li
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.85, ease: 'circInOut', delay: i * 0.1 },
                        }}
                        className="w-full"
                        key={d.name}
                    >
                        <Link to={`/decoder/${d.id}`} className="card flex items-center justify-between p-8">
                            <h3 className="font-normal text-white">{d.name}</h3>
                            {/* <p className="text-xs">
                                <span className="text-white">{c.decoders.length}</span> decoder
                                {c.decoders.length > 1 ? 's' : ''}
                            </p> */}
                        </Link>
                    </motion.li>
                ))}
            </ul>
        </div>
    )
}

export default Company
