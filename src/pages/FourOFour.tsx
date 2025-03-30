import { Button } from '@/components/ui/button'
import DecryptedText from '@/components/utils/DecryptText'
import { useNavigate } from 'react-router-dom'

const FourOFour = () => {
    const navigate = useNavigate()

    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center gap-12">
            <h1>
                <DecryptedText animateOn="view" speed={70} text="This Page Doesn't Exist" />
            </h1>
            <Button variant="default" className="w-42" onClick={() => navigate(-1)}>
                Go Back
            </Button>
        </div>
    )
}

export default FourOFour
