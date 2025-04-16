import React, { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Modal } from "antd";
import { useInView } from "react-intersection-observer";
import { client, urlFor } from "../../lib/sanityClient";
import { PortableText } from "@portabletext/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import {
  FiArrowRight,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
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
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"] | order(completionDate desc) {
          _id,
          title,
          shortDescription,
          slug,
          service->{title},
          images[] {
            ...,
            "asset": asset->
          },
          completionDate,
          features,
          details,
          testimonial {
            quote,
            clientName,
            clientRole
          }
        }[0..5]`;
        const data = await client.fetch(query);
        setProjects(data);
      } catch (err) {
        setError("Failed to load projects");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const showModal = (project, index = 0) => {
    setSelectedProject(project);
    setActiveSlideIndex(index);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p>Loading projects...</p>
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
        <h1 className="about_title">Recent Projects </h1>
      </motion.div>
      <div className="entry_container">
        <AnimatedSection variants={staggerContainer}>
          <div className="ep">
            <motion.div variants={fadeInUp}>
              <motion.h2 className="recent_title">
                Our Recent Projects
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
              Explore our portfolio of completed projects showcasing our
              craftsmanship and attention to detail.
            </motion.p>

            <motion.div
              className="service_grid" // Keep service_grid class for consistency
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  className="service_sub" // Keep service_sub class for consistency
                  variants={index % 2 === 0 ? slideInLeft : slideInRight}
                  whileHover="hover"
                  variants={cardHover}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  {/* Single image view with service_img class */}
                  <div
                    className="img-container"
                    onClick={() => showModal(project, 0)}
                  >
                    <motion.img
                      src={urlFor(project.images[0]).url()}
                      alt={project.images[0].alt || `Project ${index + 1}`}
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
                          <p>{project.shortDescription}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.h2
                    className="service_name"
                    animate={{
                      color: hoveredCard === index ? "#ff6b00" : "#333",
                      transition: { duration: 0.3 },
                    }}
                  >
                    {project.title}
                  </motion.h2>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Project Modal with service-modal class */}
        <Modal
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width="100%"
          // style={{ maxWidth: "1200px" }}
          className="service-modals"
          closeIcon={<FiX className="modal-close-icon" />}
        >
          {selectedProject && (
            <div className="project-modal-content">
              <div className="project-modal-slider">
                <Swiper
                  modules={[EffectFade, Navigation, Pagination]}
                  effect="fade"
                  navigation
                  pagination={{ clickable: true }}
                  initialSlide={activeSlideIndex}
                  onSlideChange={(swiper) =>
                    setActiveSlideIndex(swiper.activeIndex)
                  }
                  className="modal-swiper"
                >
                  {selectedProject.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="modal-image-container">
                        <img
                          src={urlFor(image).width(1200).url()}
                          alt={image.alt || `Project image ${index + 1}`}
                          className="modal-image"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="project-modal-details">
                <h2 className="project-modal-title">{selectedProject.title}</h2>
                <div className="line"></div>

                <div className="flexy">
                  {selectedProject.service && (
                    <p className="project-service">
                      <span className="dirty">Service:</span>
                      <h2 className="dota">{selectedProject.service.title}</h2>
                    </p>
                  )}

                  {selectedProject.completionDate && (
                    <p className="project-service">
                      <span className="dirty">Completed:</span>
                      <h2 className="dota">
                        {new Date(
                          selectedProject.completionDate
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}
                      </h2>
                    </p>
                  )}
                </div>
                <div className="line"></div>

                <div className="project-short-description">
                  {/* <p>{selectedProject.shortDescription}</p> */}
                </div>

                {selectedProject.features &&
                  selectedProject.features.length > 0 && (
                    <div className="project-features">
                      <h4 className="dirty">Key Features</h4>
                      <div className="line"></div>
                      <ul className="features-list">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index} className="feature-item">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {selectedProject.details && (
                  <div className="project-full-details">
                    <PortableText
                      value={selectedProject.details}
                      components={portableTextComponents}
                    />
                  </div>
                )}

                {selectedProject.testimonial && (
                  <div className="project-testimonial">
                    <blockquote className="testimonial-quote">
                      "{selectedProject.testimonial.quote}"
                    </blockquote>
                    <cite className="testimonial-author">
                      — {selectedProject.testimonial.clientName}
                      {selectedProject.testimonial.clientRole && (
                        <span>, {selectedProject.testimonial.clientRole}</span>
                      )}
                    </cite>
                  </div>
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Entry;
