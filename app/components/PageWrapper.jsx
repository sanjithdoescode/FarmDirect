'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const PageWrapper = ({ children, className = "", transitionType = "default" }) => {
  const pathname = usePathname();
  
  // Different animation options
  const transitions = {
    default: {
      initial: { opacity: 0, y: 10 },
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
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { 
        opacity: 1,
        transition: {
          duration: 0.4,
        }
      },
      exit: {
        opacity: 0,
        transition: {
          duration: 0.2,
        }
      }
    },
    slideRight: {
      initial: { opacity: 0, x: -20 },
      animate: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration: 0.4,
        }
      },
      exit: {
        opacity: 0,
        x: 20,
        transition: {
          duration: 0.2,
        }
      }
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.4,
        }
      },
      exit: {
        opacity: 0,
        y: -20,
        transition: {
          duration: 0.2,
        }
      }
    },
    spring: {
      initial: { opacity: 0, y: 20 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.5,
        }
      },
      exit: {
        opacity: 0,
        y: -20,
        transition: {
          duration: 0.3,
        }
      }
    }
  };

  const selectedTransition = transitions[transitionType] || transitions.default;

  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={selectedTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper; 