import Nav from '@/components/ui/nav'
import DecryptedText from '@/components/utils/DecryptText'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react';
import { useClientStore } from '@/store/clientStore'
import companies from '@/lib/companies.json'
import individuals from '@/lib/individuals.json'

const Dashboard = () => {
    const [showPrivate, setShowPrivate] = useState(false)
    const { clients, fetchClients } = useClientStore();

    useEffect(() => {
        fetchClients(); // Récupère les clients au chargement du composant
      }, [fetchClients]);
    
    return (
        <div className="w-cont-sm mx-auto py-32">
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
                <button className="card text-white font-normal flex items-center justify-between px-8">
                    Search{' '}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
                        />
                    </svg>
                </button>
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
                    ? individuals.map((u, i) => (
                          <motion.li
                              initial={{ opacity: 0, y: '100%' }}
                              animate={{
                                  opacity: 1,
                                  y: 0,
                                  transition: { duration: 0.85, ease: 'circInOut', delay: i * 0.1 },
                              }}
                              className="w-full"
                              key={u.email}
                          >
                              <Link to={`/decoder/${u.decoderId}`} className="card flex items-center justify-between p-8">
                                  <h2 className="font-normal text-white">
                                      {u.firstName} {u.lastName}
                                  </h2>
                                  <p className="text-xs">{u.email}</p>
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
                                      <span className="text-white">{c.decoders.length}</span> decoder
                                      {c.decoders.length > 1 ? 's' : ''}
                                  </p>
                              </Link>
                          </motion.li>
                      ))}
            </ul>
        </div>
    )
}

export default Dashboard
