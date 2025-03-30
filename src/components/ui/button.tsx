import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import DecryptedText from '../utils/DecryptText'

const buttonVariants = cva(
    'whitespace-nowrap rounded-md disabled:pointer-events-none disabled:opacity-50 shrink-0 [&_svg]:shrink-0 cursor-pointer disable:cursor-disabled outline-none duration-750 ease-in-out transition-all flex items-center justify-center',
    {
        variants: {
            variant: {
                default:
                    'bg-white-85 hover:bg-white focus-visible:bg-white text-black font-montech text-base font-semibold tracking-[0.2em]',
                outline:
                    'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
                secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'w-full h-14 has-[>svg]:px-3',
                sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
                lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
                icon: 'size-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

function Button({
    className,
    variant,
    size,
    asChild = false,
    children,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }) {
    const Comp = asChild ? Slot : 'button'

    const [isFocusing, setIsFocusing] = React.useState(false)

    return (
        <Comp
            data-slot="button"
            onFocusCapture={() => setIsFocusing(true)}
            onBlur={() => {
                setIsFocusing(false)
            }}
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        >
            {typeof children === 'string' ? (
                <DecryptedText
                    animateOn="hover"
                    speed={70}
                    text={children}
                    parentClassName="w-full h-full flex items-center justify-center"
                    isFocusing={isFocusing}
                />
            ) : (
                children
            )}
        </Comp>
    )
}

export { Button, buttonVariants }
