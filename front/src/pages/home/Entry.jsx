import React from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./home.css";
import Testo from "../../components/testo/Testo";
import Serve from "../../pages/home/Serve";
import Recent from "../../pages/home/Recent";
import Take from "./Take";
// Enhanced Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.1,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.34, 1.56, 0.64, 1],
      type: "spring",
      stiffness: 100,
    },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardHover = {
  hover: {
    y: -10,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

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

const Entry = () => {
  const [hoveredCard, setHoveredCard] = React.useState(null);

  return (
    <div className="entry_container">
      {/* Hero Section with Enhanced Parallax */}

      {/* Services Section with Enhanced Animations */}
      <AnimatedSection variants={staggerContainer}>
        <div className="">
          <Serve />

          {/* <Testo /> */}
          {/* Enhanced Stats Section */}
          <motion.div
            className="complete_grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={staggerContainer}
          >
            {[
              { value: "50+", label: "projects completed" },
              { value: "18", label: "Professional Employees" },
              { value: "20", label: "Business Partners" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="complete_sub"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <motion.h2
                  className="count"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{
                    scale: 1,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      delay: index * 0.15,
                    },
                  }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.h2>
                <motion.div
                  className="bol"
                  initial={{ width: 0 }}
                  whileInView={{
                    width: "40px",
                    transition: {
                      duration: 0.8,
                      delay: index * 0.15 + 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  viewport={{ once: true }}
                />
                <h2 className="count_title">{stat.label}</h2>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="line"
            initial={{ scaleX: 0, transformOrigin: "left" }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          <Testo />

          {/* Recent Projects with Enhanced Effects */}

          <Recent />

          <div className="freeby"></div>
        </div>
      </AnimatedSection>

  

      <Take />
    </div>
  );
};

export default Entry;
