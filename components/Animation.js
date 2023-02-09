import React from 'react'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'

export default function Animation({ path, children }) {

    return (
        <AnimatePresence mode={"wait"}>
            <motion.div key={path} initial={{opacity: 0, y: '-20px'}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}} transition={{duration: 1}}>
                { children }
            </motion.div>
        </AnimatePresence>
  )
}
