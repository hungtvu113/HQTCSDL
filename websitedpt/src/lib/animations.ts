// Custom animation effects for elements
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export const slideInFromLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
};

export const slideInFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
};

export const slideInFromBottom = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

// Staggered animation for list items
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Card hover effect
export const cardHoverEffect = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.3 } }
};

// Button hover effect
export const buttonHoverEffect = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } }
};

// Pulse animation
export const pulseAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.02, 1],
    transition: { duration: 1.5, repeat: Infinity }
  }
};

// Form field animation
export const formFieldAnimation = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
}; 