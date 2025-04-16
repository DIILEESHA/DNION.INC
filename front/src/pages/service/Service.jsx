import React, { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Modal } from "antd";
import { useInView } from "react-intersection-observer";
import { client, urlFor } from "../../lib/sanityClient";
import "../home/home.css";
import { PortableText } from "@portabletext/react";
import Take from "../home/Take";
// Animation Variants
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

  useEffect(() => {
    if (inView) controls.start("visible");
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
  const [hoveredCard, setHoveredCard] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const query = `*[_type == "service"] | order(order asc) {
            title,
            shortDescription,
            fullDescription,
            "imageUrl": image.asset->url,
            "imageAlt": image.alt
          }`;
        const data = await client.fetch(query);
        setServices(data);
      } catch (err) {
        setError("Failed to load services");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const showModal = (service) => {
    setSelectedService(service);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p>Loading services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  const portableTextComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) return null;
        return (
          <div className="rich-image-container">
            <img
              src={urlFor(value).width(800).url()}
              alt={value.alt || "About us image"}
              className="rich-image"
            />
            {value.caption && (
              <div className="image-caption">
                {value.caption}
                <div className="line"></div>
              </div>
            )}
          </div>
        );
      },
    },
    block: {
      normal: ({ children }) => <p className="block-para">{children}</p>,
      h1: ({ children }) => <h1 className="heading-1">{children}</h1>,
      h2: ({ children }) => (
        <h2 className="heading-2">
          {children}
          <div className="line"></div>
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="heading-3">
          {children}
          <div className="line"></div>
        </h3>
      ),
      h4: ({ children }) => <h4 className="heading-4">{children}</h4>,
      blockquote: ({ children }) => (
        <blockquote className="custom-blockquote">{children}</blockquote>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="text-strong">{children}</strong>
      ),
      em: ({ children }) => <em className="text-emphasis">{children}</em>,
      underline: ({ children }) => (
        <span className="text-underline">{children}</span>
      ),
      "strike-through": ({ children }) => (
        <span className="text-strike">{children}</span>
      ),
      code: ({ children }) => <code className="text-code">{children}</code>,
      link: ({ value, children }) => {
        const target = (value?.href || "").startsWith("http")
          ? "_blank"
          : undefined;
        return (
          <a
            href={value?.href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            className="text-link"
          >
            {children}
          </a>
        );
      },
    },
  };

  return (
    <div className="about-container">
      <motion.div
        className="about_img pola"
        // initial={{ opacity: 0, y: 50 }}
        // animate={controls}
        // ref={ref}
        // variants={{
        //   visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        // }}
      >
        <h1 className="about_title">Our Services </h1>
      </motion.div>

      <div className="entry_container">
        <AnimatedSection variants={staggerContainer}>
          <div className="ep">
            <motion.div variants={fadeInUp}>
              <motion.h2 className="recent_title">
                Our services & solutions
              </motion.h2>
              <motion.div
                className="tol"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>

            <motion.p
              className="service_p"
              variants={fadeIn}
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            >
              We deliver exceptional craftsmanship with attention to detail. Our
              team combines traditional techniques with modern innovation.
            </motion.p>

            <motion.div
              className="service_grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* {services.map((service, index) => ( */}
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="service_sub"
                  variants={index % 2 === 0 ? slideInLeft : slideInRight}
                  whileHover="hover"
                  variants={cardHover}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  onClick={() => showModal(service)}
                >
                  <motion.div className="img-container">
                    <motion.img
                      src={urlFor(service.imageUrl).width(600).url()}
                      alt={service.imageAlt}
                      className="service_img"
                      whileHover={{ scale: 1.05 }}
                      initial={{ scale: 1 }}
                      animate={{
                        scale: hoveredCard === index ? 1.05 : 1,
                        transition: { duration: 0.3 },
                      }}
                    />
                    <AnimatePresence>
                      {hoveredCard === index && (
                        <motion.div
                          className="service-overlay"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <p>{service.shortDescription}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <motion.h2
                    className="service_name"
                    animate={{
                      color: hoveredCard === index ? "#ff6b00" : "#333",
                      transition: { duration: 0.3 },
                    }}
                  >
                    {service.title}
                  </motion.h2>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Ant Design Modal */}
        <Modal
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          // width={1000}
          width="100vw"
          className="service-modal"
          closeIcon={<div className="close">✕</div>}
        >
          {selectedService && (
            <div>
              <img
                src={urlFor(selectedService.imageUrl).width(600).url()}
                className="haha"
              />
              <p className="service-subtitle">
                {selectedService.shortDescription}
              </p>
              <PortableText
                value={selectedService.fullDescription}
                components={portableTextComponents}
              />
            </div>
          )}
        </Modal>
      </div>
      <Take />
    </div>
  );
};

export default Entry;
