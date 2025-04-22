import Nav from '@/components/ui/nav'
import { motion } from 'framer-motion'
import companies from '@/lib/companies.json'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DecryptedText from '@/components/utils/DecryptText'
import CopyButton from '@/components/ui/copy-button'

const Company = () => {
    const [company, setCompany] = useState<Company | null>(null)
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        if (id && companies.find(c => c.id === id)) {
            setCompany(companies.find(c => c.id === id)! as Company)
        }
    }, [id])

    if (!company) {
        return (
            <div className="w-cont-sm mx-auto py-32">
                <Nav />
                <h1 className="text-center py-16">Company not found</h1>
            </div>
        )
    }

    return (
        <div className="w-cont-sm mx-auto py-32">
            <Nav />

            {/* Back to dashboard */}
            <Link
                to="/"
                className="block mt-8 mb-12 font-poppins text-sm text-white-60 hover:text-white duration-200 ease-in-out font-normal"
            >
                <span className="mr-2">{'<'}</span> Dashboard
            </Link>

            {/* header */}
            <h1>
                <DecryptedText text={company.name} animateOn="view" sequential />
            </h1>

            <h2 className="text-lg font-normal text-white mt-8 mb-4">Activation Key</h2>
            <div className="flex gap-2">
                <div className="card w-max h-10 text-white text-xs px-4 flex items-center justify-center">
                    {"111111"}
                </div>
                <CopyButton value={"111111"} />
            </div>

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
