"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.35, 1], opacity: [0.12, 0.06, 0.12] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-emerald-400/25"
            />
            <motion.div
              animate={{ scale: [1.15, 1.55, 1.15], opacity: [0.08, 0.04, 0.08] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.4 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full border border-teal-300/15"
            />
          </div>

          <motion.div
            initial={{ scale: 0.45, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.div
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="w-22 h-22 w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-2xl shadow-emerald-950/60 mb-6"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="text-white font-black text-5xl">M</span>
            </motion.div>

            <motion.h1
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.45 }}
              className="text-4xl font-bold text-white tracking-tight"
            >
              Mega<span className="text-emerald-300">mart</span>
            </motion.h1>

            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.45 }}
              className="mt-2 text-emerald-200/75 text-sm tracking-wide"
            >
              Quality Goods • Great Prices
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 112 }}
            transition={{ delay: 0.9, duration: 1.3, ease: "easeInOut" }}
            className="absolute bottom-16 h-1 rounded-full bg-emerald-400/80"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
