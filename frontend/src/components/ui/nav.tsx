import { useAuthStore } from '@/store/authStore'

const Nav = () => {
    const { user } = useAuthStore()

    return (
        <div className="w-full py-6 flex items-center justify-between">
            <span className="font-montech text-sm text-white tracking-widest lighted">LYNK</span>

            <span className="font-montech text-sm text-white tracking-widest">
                {user?.firstName.substring(0, 1)}.{user?.lastName.substring(0, 1)}.
            </span>
        </div>
    )
}

export default Nav
