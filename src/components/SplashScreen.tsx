"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 70%)",
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.25, 0.15],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[420px] h-[420px] rounded-full"
            style={{
              background: "radial-gradient(circle, #ff6a00 0%, transparent 70%)",
              filter: "blur(60px)",
              top: "20%",
              left: "10%",
            }}
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1],
              x: [0, -40, 0],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute w-[380px] h-[380px] rounded-full"
            style={{
              background: "radial-gradient(circle, #ff9f43 0%, transparent 70%)",
              filter: "blur(50px)",
              bottom: "15%",
              right: "5%",
            }}
          />

          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-orange-400/60"
              style={{
                left: `${10 + (i * 7) % 80}%`,
                top: `${15 + (i * 11) % 70}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}

          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotateY: -30 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mb-10"
            style={{ perspective: 800 }}
          >
            <motion.div
              animate={{ rotateY: [0, 8, -8, 0], rotateX: [0, 4, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-28 h-28"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 shadow-2xl shadow-orange-900/50 flex items-center justify-center">
                <span className="text-white font-black text-5xl tracking-tighter drop-shadow-lg">
                  M
                </span>
              </div>
              <div
                className="absolute -inset-1 rounded-3xl opacity-40"
                style={{
                  background: "linear-gradient(135deg, #ff9f43, transparent 50%)",
                  transform: "translateZ(-12px)",
                }}
              />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ y: 24, opacity: 0, letterSpacing: "0.15em" }}
            animate={{ y: 0, opacity: 1, letterSpacing: "0.02em" }}
            transition={{ delay: 0.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-4xl sm:text-5xl font-bold text-white tracking-tight"
          >
            Mega<span className="text-orange-400">mart</span>
          </motion.h1>

          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="relative z-10 mt-3 text-orange-200/80 text-sm sm:text-base tracking-wide font-medium"
          >
            Shop what you love
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.4, duration: 2.0, ease: "easeInOut" }}
            className="absolute bottom-16 h-[2px] w-24 origin-left rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
