'use client'

import {motion} from 'framer-motion'

type AnimationWrapperProps = {
    children: React.ReactNode
}

export function AnimationWrapper(props: AnimationWrapperProps) {
    const {children} = props
    
    return (
        <motion.div
            initial={{opacity: 0, x:50}}
            animate={{opacity: 1, x:0}}
            exit={{opacity: 0, x:50}}
        >
            {children}
        </motion.div>
    )
}