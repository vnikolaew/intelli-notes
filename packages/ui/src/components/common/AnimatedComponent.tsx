"use client";
import React, { ReactNode, useEffect } from "react";
import { MotionProps, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export interface AnimatedComponentProps extends MotionProps {
   children: ReactNode;
}

const AnimatedComponent = ({ children, ...props }: AnimatedComponentProps) => {
   const [ref, inView] = useInView({
      triggerOnce: true, // Trigger animation only once
      rootMargin: "100px",
      threshold: 1, // Trigger when 10% of the component is visible
   });
   useEffect(() => {
      console.log(`Element is in view`);
   }, [inView])

   return (
      <motion.div
         ref={ref}
         initial={{ opacity: 0, y: 20 }}
         animate={inView ? (props?.animate ?? { opacity: 1, y: 0 }) : {}}
         transition={{ duration: 0.5 }}
         {...props}
      >
         {children}
      </motion.div>
   );
};

export default AnimatedComponent;