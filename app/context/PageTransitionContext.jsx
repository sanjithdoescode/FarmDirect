'use client';

import React, { createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const PageTransitionContext = createContext();

export const usePageTransition = () => {
  return useContext(PageTransitionContext);
};

export const PageTransitionProvider = ({ children }) => {
  const pathname = usePathname();
  
  // Define animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  return (
    <PageTransitionContext.Provider value={{}}>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </PageTransitionContext.Provider>
  );
};

export default PageTransitionContext; 