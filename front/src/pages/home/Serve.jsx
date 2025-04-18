import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Modal } from "antd";
import { useInView } from "react-intersection-observer";
import { client, urlFor } from "../../lib/sanityClient";
import "./home.css";
import { PortableText } from "@portabletext/react";
import left from "../../assets/left.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Animation Variants (same as your original)

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

  const prevRef = useRef(null);
  const nextRef = useRef(null);

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

  return (
    <div className="entry_container">
      <AnimatedSection variants={staggerContainer}>
        <div className="ep daspi">
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
            viewport={{ once: true }}
          >
            We deliver exceptional craftsmanship with attention to detail. Our
            team combines traditional techniques with modern innovation.
          </motion.p>
          {/* Arrows for Swiper */}
          <div className="flex_arrows">
            <div className="icon_left" ref={prevRef}>
              <img src={left} alt="prev" className="lefto" />
            </div>
            <div className="icon_left" ref={nextRef}>
              <img src={left} alt="next" className="righto" />
            </div>
          </div>
          <div className="line"></div>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            spaceBetween={10}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            // className="service_grid"
          >
            {services.map((service, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="service_sub"
                  whileHover={{ y: -10 }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  onClick={() => showModal(service)}
                >
                  <motion.div className="img-container">
                    <motion.img
                      src={urlFor(service.imageUrl).url()}
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </AnimatedSection>

      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
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
  );
};

export default Entry;
