import React, { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import { client, urlFor } from "../../lib/sanityClient";
import "./bout.css";
import Testo from "../../components/testo/Testo";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Take from "../home/Take";

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const query = `*[_type == "aboutus"][0] {
          title,
          description
        }`;
        const data = await client.fetch(query);
        setAboutData(data);
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!aboutData) return <div className="error">No about data found</div>;

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
        className="about_img"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        ref={ref}
        variants={{
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
      >
        <h1 className="about_title">{aboutData.title || "About Us"}</h1>
      </motion.div>

      <motion.div
        className="about-content"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0, transition: { duration: 1 } },
        }}
      >
        {aboutData.description && (
          <PortableText
            value={aboutData.description}
            components={portableTextComponents}
          />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0, transition: { duration: 1.2 } },
        }}
      >
        {/* <Testo /> */}

        <Take />
      </motion.div>
    </div>
  );
};

export default About;
