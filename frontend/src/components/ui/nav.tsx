import { useAuthStore } from '@/store/authStore'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
    const { user, logout } = useAuthStore()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/auth')
    }

    return (
        <div className="w-full py-6 flex items-center justify-between">
            <span className="font-montech text-sm text-white tracking-widest lighted">LYNK</span>

            <Popover>
                <PopoverTrigger className="font-montech text-sm font-light card pl-3 pr-2 py-1 text-white tracking-widest">
                    {user?.firstName.substring(0, 1)}.{user?.lastName.substring(0, 1)}.
                </PopoverTrigger>
                <PopoverContent className="border-0 p-0" side="left" align="end" sideOffset={6}>
                    <motion.button
                        onClick={handleLogout}
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1, transition: { ease: 'anticipate', duration: 0.25 } }}
                        className="w-max h-[30px] font-montech text-xs font-normal card px-3 py-1 text-white"
                    >
                        Log Out
                    </motion.button>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default Nav
