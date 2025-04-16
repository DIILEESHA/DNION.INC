import React from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./home.css";
import Testo from "../../components/testo/Testo";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

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

const Take = () => {
  return (
    <div className="entry_container">
      {/* Hero Section with Enhanced Parallax */}

      {/* Enhanced CTA Section */}
      <motion.div
        style={{ marginTop: "30px" }}
        className="conta"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="dota"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.h2
            className="dota_text"
            animate={{
              color: ["#000000", "#ff6b00", "#000000"],
              transition: {
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            Ready to start your construction project? We're here to help!
          </motion.h2>
        </motion.div>
        <motion.div
          className="dota"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <motion.button
            className="get"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#ff6b00",
              color: "white",
              boxShadow: "0 10px 20px rgba(255,107,0,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={{
                x: [0, 5, 0],
                transition: {
                  repeat: Infinity,
                  duration: 2,
                },
              }}
            >
              Get Free Consultation
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="home_container das"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <motion.div
          className="home_content"
          initial={{ y: 40 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatedSection variants={fadeIn} threshold={0.2}>
            <motion.p
              className="sm_para"
              whileHover={{ letterSpacing: "1px" }}
              transition={{ duration: 0.3 }}
            >
              Your Trusted Construction Company
            </motion.p>
          </AnimatedSection>

          <AnimatedSection variants={fadeInUp} threshold={0.2}>
            <motion.h1
              className="home_para dii"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Building Your{" "}
              <motion.span
                style={{ display: "inline-block", textDecoration: "underline" }}
                animate={{
                  rotate: [0, 5, -5, 0],
                  transition: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 4,
                  },
                }}
              >
                Dream
              </motion.span>{" "}
              Home
            </motion.h1>
          </AnimatedSection>

          <AnimatedSection variants={scaleUp}>
            <div className="boo">
              <motion.button
                className="btn"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
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
                      duration: 2,
                    },
                  }}
                >
                  Contact Us →
                </motion.span>
              </motion.button>
            </div>
          </AnimatedSection>
        </motion.div>

        <div className="dospa">
          <div className="dg">
            <div className="dospas">
              <Link to="/" className="a">
                <h2 className="nav_lgos">APC</h2>
              </Link>
            </div>
            <div className="dospas">
              <div className="icon_set">
                <FaFacebook className="icony" />
                <FaInstagram className="icony" />
                <FaXTwitter className="icony" />
              </div>
            </div>
          </div>

          <ul className="bottom_ul">
            <li className="bottom_li">About Us</li>
            <li className="bottom_li">Projects</li>
            <li className="bottom_li">Services</li>
            <li className="bottom_li">Contact Us</li>
          </ul>
          <div className="dolki">
            <div className="liner"></div>
          </div>

          <div className="dg dalla">
            <div className="dospas ">
              <Link to="/" className="a">
                <h2 className="nav_lgos">© APC 2025</h2>
              </Link>
            </div>
            <div className="dospas">
              <ul className="bottom_uls">
                <li className="bottom_lis">Privacy Policy</li>
                <li className="bottom_lis">Terms & Conditions</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Take;
