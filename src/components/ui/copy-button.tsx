import React, { FC, useState } from 'react'

type CopyButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'form'> & {
    value: string
    form?: string
    showIcon?: boolean
}

const CopyButton: FC<CopyButtonProps> = ({ value, children, showIcon = true, ...props }) => {
    const [showSuccess, setShowSuccess] = useState(false)

    const copyToClickBoard = () => {
        navigator.clipboard.writeText(value)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 2000)
    }

    return (
        <button
            className="card px-4 flex items-center gap-2 text-xs font-normal tracking-widest text-white"
            onClick={copyToClickBoard}
            {...props}
        >
            {showSuccess ? 'Copied' : 'Copy'}
        </button>
    )
}

export default CopyButton
