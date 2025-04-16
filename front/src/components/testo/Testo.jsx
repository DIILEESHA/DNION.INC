import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client, urlFor } from "../../lib/sanityClient";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./testo.css";

const Testo = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const query = `*[_type == "testimonial"] | order(_createdAt desc) {
          _id,
          name,
          review,
          image
        }`;
        const data = await client.fetch(query);
        setTestimonials(data);
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
      }
    };

    fetchTestimonials();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, when: "beforeChildren" },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageBorderVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "backOut" },
    },
  };

  return (
    <motion.div
      className="testo"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="testo_img_container">
        <div className="lomgo">
          <img
            src="https://img.freepik.com/free-photo/beautiful-view-construction-site-city-sunset_181624-9347.jpg"
            alt="Construction site"
            className="testo_img"
          />
        </div>

        <motion.div className="testo_contain" variants={containerVariants}>
          <motion.h2 className="hello" variants={itemVariants}>
            Testimonials from our Clients
          </motion.h2>
          
          <div className="testx">
            <Swiper
              modules={[Pagination, Autoplay, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ 
                clickable: true,
                dynamicBullets: true
              }}
              autoplay={{ 
                delay: 5000, 
                disableOnInteraction: false 
              }}
              loop={true}
              navigation={true}
              centeredSlides={true}
              className="testimonial-swiper"
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item._id}>
                  <motion.div className="testo_card" variants={itemVariants}>
                    <div className="testo_mini_card">
                      <motion.div
                        className="testo_person"
                        variants={imageBorderVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <div className="animated-border">
                          <img
                            src={urlFor(item.image).width(200).url()}
                            alt={item.name}
                            className="testo_p"
                          />
                        </div>
                      </motion.div>

                      <motion.h2 className="testo_person_name" variants={itemVariants}>
                        {item.name}
                      </motion.h2>

                      <motion.p className="review" variants={itemVariants}>
                        {item.review}
                      </motion.p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Testo;