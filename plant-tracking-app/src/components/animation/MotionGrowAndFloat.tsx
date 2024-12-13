"use client";
import { motion, MotionProps } from "framer-motion";
import React from "react";

interface MotionGrowAndFloatProps extends MotionProps {
  children: React.ReactNode;
}

const MotionGrowAndFloat: React.FC<MotionGrowAndFloatProps> = ({
  children,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.002,
        y: -2,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 10,
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MotionGrowAndFloat;

// Usage example:
// <MotionGrowAndFloat initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//   <YourComponent />
// </MotionGrowAndFloat>
