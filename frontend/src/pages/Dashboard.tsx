import Nav from '@/components/ui/nav'
import DecryptedText from '@/components/utils/DecryptText'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useClientStore } from '@/store/clientStore'
import { useAuthStore } from '@/store/authStore'
import { useCompanyStore } from '@/store/companyStore'

const Dashboard = () => {
    const navigate = useNavigate()

    const { logged } = useAuthStore()
    const { personalClients, fetchClients } = useClientStore()
    const { companies, getCompanies } = useCompanyStore()

    const [showPrivate, setShowPrivate] = useState(true)

    useEffect(() => {
        fetchClients()
        getCompanies()
    }, [fetchClients])

    useEffect(() => {
        if (logged === false) {
            navigate('/auth', { replace: true })
        }
    }, [logged, navigate])

    return (
        <div className="w-cont-sm mx-auto md:py-32 pb-12">
            <Nav />

            {/* quick actions */}
            <div className="w-full h-18 grid grid-cols-2 gap-4 my-8">
                <Link
                    to="new-client"
                    className="card font-montech text-white text-center font-normal flex items-center justify-between px-8"
                >
                    New Client
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M11 21v-8H3v-2h8V3h2v8h8v2h-8v8z" />
                    </svg>
                </Link>
                <Link
                    to={'/new-company'}
                    className="card font-montech text-white font-normal flex items-center justify-between px-8"
                >
                    New Company
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M11 21v-8H3v-2h8V3h2v8h8v2h-8v8z" />
                    </svg>
                </Link>
            </div>

            {/* header */}
            <div className="flex items-center justify-between">
                <h1>
                    <DecryptedText text="Clients" animateOn="view" sequential />
                </h1>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowPrivate(true)}
                        className={`font-poppins font-light text-xs px-3 py-1 hover:text-white ${
                            showPrivate ? 'card hover text-white' : ''
                        }`}
                    >
                        Private
                    </button>
                    <button
                        onClick={() => setShowPrivate(false)}
                        className={`font-poppins font-light text-xs px-3 py-1 hover:text-white ${
                            showPrivate ? '' : 'card hover text-white'
                        }`}
                    >
                        Commercial
                    </button>
                </div>
            </div>

            {/* decoder list */}
            <ul className="flex flex-col gap-3 mt-8">
                {showPrivate
                    ? personalClients.map((c, i) => (
                          <motion.li
                              initial={{ opacity: 0, y: '100%' }}
                              animate={{
                                  opacity: 1,
                                  y: 0,
                                  transition: { duration: 0.85, ease: 'circInOut', delay: i * 0.1 },
                              }}
                              className="w-full"
                              key={c.id}
                          >
                              <Link
                                  to={`/decoder/${c.decoderId}`}
                                  className="card flex items-center justify-between p-8"
                              >
                                  <h2 className="font-normal text-white">
                                      {c.user?.firstName ? (
                                          <>
                                              {c.user.firstName} {c.user.lastName}
                                          </>
                                      ) : (
                                          'Unretrieved Account'
                                      )}
                                  </h2>
                                  <p className="text-xs">{c.user.email}</p>
                              </Link>
                          </motion.li>
                      ))
                    : companies.map((c, i) => (
                          <motion.li
                              initial={{ opacity: 0, y: '100%' }}
                              animate={{
                                  opacity: 1,
                                  y: 0,
                                  transition: { duration: 0.85, ease: 'circInOut', delay: i * 0.1 },
                              }}
                              className="w-full"
                              key={c.id}
                          >
                              <Link to={`/company/${c.id}`} className="card flex items-center justify-between p-8">
                                  <h2 className="font-normal text-white">{c.name}</h2>
                                  <p className="text-xs">
                                      <span className="text-white">{c?.decoders?.length}</span> decoder
                                      {c?.decoders?.length > 1 ? 's' : ''}
                                  </p>
                              </Link>
                          </motion.li>
                      ))}
            </ul>
        </div>
    )
}

export default Dashboard
