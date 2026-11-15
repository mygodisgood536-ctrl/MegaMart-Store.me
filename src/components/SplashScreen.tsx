"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,106,0,0.07) 0%, transparent 70%)",
              }}
            />
          </div>

          <motion.div
            initial={{ scale: 0.65, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <Logo size={92} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.55 }}
            className="relative z-10 mt-7 text-[28px] font-semibold tracking-tight text-gray-900"
          >
            Mega<span className="text-orange-500">mart</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.5 }}
            className="relative z-10 mt-2 text-[13px] text-gray-400 tracking-wide"
          >
            Shop what you love
          </motion.p>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.95, duration: 1.5, ease: "easeInOut" }}
            className="absolute bottom-20 h-[2px] w-14 origin-center rounded-full bg-gradient-to-r from-transparent via-orange-400 to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
