import { motion, MotionProps } from "framer-motion";
import React from "react";

interface MotionWrapperProps extends MotionProps {
  children: React.ReactNode;
}

const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  ...props
}) => {
  return <motion.div {...props}>{children}</motion.div>;
};

export default MotionWrapper;

// Usage example:
// <MotionWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//   <YourComponent />
// </MotionWrapper>
