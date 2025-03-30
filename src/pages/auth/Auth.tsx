import DecryptedText from '@/components/utils/DecryptText'
import { Link, replace, useLocation, useNavigate } from 'react-router-dom'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import { useAuthStore } from '@/store/authStore'
import { useLayoutEffect } from 'react'

const Auth = () => {
    const navigate = useNavigate()

    const isLogged = useAuthStore(state => state.token)

    const l = useLocation()

    useLayoutEffect(() => {
        if (isLogged) {
            navigate('/dashboard', { replace: true })
        }
    }, [isLogged])

    return (
        <div className="w-full min-h-[100vh] py-8 flex flex-col items-center justify-center gap-16">
            <span className="font-montech text-sm text-white tracking-widest lighted w-cont-sm">LYNK</span>

            <main className="w-cont-sm rounded-[12px]">
                <h1 className="mb-8">
                    <DecryptedText
                        animateOn="view"
                        speed={70}
                        text={l.pathname.includes('sign-up') ? 'Sign Up' : 'Log In'}
                    />
                </h1>

                {l.pathname.includes('sign-up') ? <SignUpForm /> : <LoginForm />}
            </main>

            {l.pathname.includes('sign-up') ? (
                <p className="w-cont-sm">
                    Already have an account?{' '}
                    <Link to="/" className="simple-link">
                        Log In
                    </Link>
                </p>
            ) : (
                <p className="w-cont-sm">
                    New client?{' '}
                    <Link to="/sign-up" className="simple-link">
                        Sign Up
                    </Link>
                </p>
            )}
        </div>
    )
}

export default Auth
