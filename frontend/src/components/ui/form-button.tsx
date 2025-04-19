import { FC, HTMLProps } from 'react'
import { Button } from './button'
import Spinner from './spinner'
import { cn } from '@/lib/utils'

type StateButtonProps = HTMLProps<HTMLButtonElement> & {
    state: RequestStatus
    children: React.ReactNode | React.ReactNode[]
    type?: 'button' | 'submit'
    size?: 'default' | 'sm' | 'icon'
}

const StateButton: FC<StateButtonProps> = ({ state, children, type = 'submit', size = 'default', ...rest }) => {
    return (
        <Button
            type={type}
            as="button"
            className={cn('mt-2', ['loading', 'success'].includes(state) && 'bg-white')}
            size={size as 'default' | 'icon'}
            {...rest}
        >
            {state === 'loading' ? (
                <Spinner />
            ) : state === 'success' ? (
                'Success'
            ) : state === 'error' ? (
                'Error'
            ) : (
                children
            )}
        </Button>
    )
}

export default StateButton
