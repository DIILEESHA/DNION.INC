import React from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./home.css";
import Nav from "../../components/nav/Nav";
import { Link } from "react-router-dom";

// Enhanced Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.2,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1],
      type: "spring",
      stiffness: 120,
    },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Animated component wrapper
const AnimatedSection = ({
  children,
  variants = fadeInUp,
  threshold = 0.1,
  delay = 0,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce: true });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      custom={delay}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Construction elements floating animation
  const floatingElements = [
    { id: 1, icon: "🏗️", size: 40, x: 10, y: 20, delay: 0.1 },
    { id: 2, icon: "🔨", size: 30, x: 80, y: 60, delay: 0.3 },
    { id: 3, icon: "🏠", size: 50, x: 30, y: 40, delay: 0.2 },
    { id: 4, icon: "📐", size: 25, x: 70, y: 30, delay: 0.4 },
  ];

  return (
    <>
      <motion.div
        className="home_container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Floating construction elements background */}
        <div className="floating-elements">
          {floatingElements.map((element) => (
            <motion.span
              key={element.id}
              style={{
                fontSize: `${element.size}px`,
                position: "absolute",
                top: `${element.y}%`,
                left: `${element.x}%`,
                zIndex: 0,
                opacity: 0.1,
              }}
              animate={{
                y: [0, 10, 0],
                rotate: [0, 5, -5, 0],
                transition: {
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: element.delay,
                },
              }}
            >
              {element.icon}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="home_content"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatedSection variants={fadeIn} threshold={0.1}>
            <motion.p
              className="sm_para"
              whileHover={{
                letterSpacing: "2px",
                textShadow: "0 0 8px rgba(255,107,0,0.3)",
              }}
              transition={{ duration: 0.4 }}
            >
              <motion.span
                style={{ display: "inline-block" }}
                animate={{
                  scale: [1, 1.05, 1],
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                }}
              >
                🏆
              </motion.span>{" "}
              Your Trusted Construction Company
            </motion.p>
          </AnimatedSection>

          <AnimatedSection variants={fadeInUp} threshold={0.1}>
            <motion.h1
              className="home_para"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Building the{" "}
              <motion.span
                style={{
                  display: "inline-block",
                  background: "linear-gradient(90deg, #ff8a00, #e52e71)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
                animate={{
                  rotate: [0, 2, -2, 0],
                  backgroundPositionX: ["0%", "100%"],
                  transition: {
                    rotate: {
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    },
                    backgroundPositionX: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  },
                }}
              >
                future
              </motion.span>
              ,{" "}
              <motion.span
                style={{ display: "inline-block" }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                animate={
                  {
                    // y: isHovered ? -5 : 0,
                    // scale: isHovered ? 1.05 : 1,
                    // rotate: isHovered ? 2 : 0,
                    // transition: { type: "spring", stiffness: 500 },
                  }
                }
              >
                one strong foundation
              </motion.span>{" "}
              at a time
            </motion.h1>
          </AnimatedSection>

          <AnimatedSection variants={scaleUp}>
            <div className="boo">
              <motion.button
                className="btn"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 15px 30px rgba(255,107,0,0.3)",
                  backgroundColor: "#ff6b00",
                  color: "white",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  animate={{
                    x: [0, 5, 0],
                    transition: {
                      repeat: Infinity,
                      duration: 2.5,
                    },
                  }}
                >
                  <Link to="/projects" className="a">
                    View Projects{" "}
                  </Link>
                  <motion.span
                    animate={{
                      rotate: [0, 20, 0],
                      transition: {
                        repeat: Infinity,
                        duration: 2,
                        delay: 0.5,
                      },
                    }}
                  >
                    →
                  </motion.span>
                </motion.span>
              </motion.button>
            </div>
          </AnimatedSection>

          {/* Animated scroll indicator */}
          <AnimatedSection variants={fadeIn} threshold={0.1}>
            <motion.div
              className="scroll-indicator"
              animate={{
                y: [0, 15, 0],
                opacity: [0.6, 1, 0.6],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <motion.div
                animate={{
                  scaleY: [1, 1.5, 1],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                {/* ↓ */}
              </motion.div>
              <motion.p
                className="oppa"
                animate={{
                  opacity: [0.7, 1, 0.7],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                Scroll to explore ↓
              </motion.p>
            </motion.div>
          </AnimatedSection>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Home;
