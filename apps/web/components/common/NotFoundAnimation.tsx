"use client"
import React from "react";
import Lottie from "lottie-react";
import animation from "public/not-found-animation.json"

export interface NotFoundAnimationProps {
}

const NotFoundAnimation = ({}: NotFoundAnimationProps) => {
   return (
      <Lottie className={`w-[400px]`} animationData={animation} />
   );
};

export default NotFoundAnimation;