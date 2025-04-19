import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

import "./contact.css";
import Take from "../home/Take";

const Contact = () => {
  const form = useRef();
  const [errors, setErrors] = useState({
    first_name: false,
    last_name: false,
    address: false,
    phone: false,
    service_type: false,
    preferred_time: false,
    special_notes: form.specialNotes || "",
  });

  const validateForm = () => {
    const formElements = form.current.elements;
    let isValid = true;
    const newErrors = { ...errors };

    // Check each required field
    if (!formElements.first_name.value.trim()) {
      newErrors.first_name = true;
      isValid = false;
    }
    if (!formElements.last_name.value.trim()) {
      newErrors.last_name = true;
      isValid = false;
    }
    if (!formElements.address.value.trim()) {
      newErrors.address = true;
      isValid = false;
    }
    if (!formElements.phone.value.trim()) {
      newErrors.phone = true;
      isValid = false;
    }
    if (!formElements.service_type.value) {
      newErrors.service_type = true;
      isValid = false;
    }
    if (!formElements.preferred_time.value) {
      newErrors.preferred_time = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields!", {
        position: "top-center",
      });
      return;
    }

    emailjs
      .sendForm(
        "service_kod8rid",
        "template_wqaw0e8",
        form.current,
        "Q7-kIVAsbVu6mYAW8"
      )
      .then(
        (result) => {
          toast.success("Message sent successfully!", {});
          form.current.reset();
          setErrors({
            first_name: false,
            last_name: false,
            address: false,
            phone: false,
            service_type: false,
            preferred_time: false,
          });
        },
        (error) => {
          toast.error("Failed to send message. Please try again.", {});
        }
      );
  };

  return (
    <div>
      <div className="about-container">
        <motion.div
          className="about_img dawos"
          // initial={{ opacity: 0, y: 50 }}
          // animate={controls}
          // ref={ref}
          // variants={{
          //   visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          // }}
        >
          <h1 className="about_title">Contact Us </h1>
        </motion.div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <div className="lokesh">
          <h2 className="loka">Let's Get Started</h2>
          <div className="line"></div>
          <p className="loke_p">
          Tell us about your project—we’ll handle the rest!
Fill out the form below to schedule your consultation.
          </p>
          <form ref={form} onSubmit={sendEmail} className="contact_form">
            <h2 className="contact">Contact Information</h2>
            <div className="line"></div>

            <div className="form_grid">
              <div className="form_sub">
                <input
                  type="text"
                  name="first_name"
                  className="form_input"
                  placeholder="First Name:"
                />
                {errors.first_name && (
                  <span className="error-message">First name is required</span>
                )}
              </div>
              <div className="form_sub">
                <input
                  type="text"
                  name="last_name"
                  className="form_input"
                  placeholder="Last Name:"
                />
                {errors.last_name && (
                  <span className="error-message">Last name is required</span>
                )}
              </div>

              <div className="form_sub one">
                <input
                  type="text"
                  name="address"
                  className="form_input"
                  placeholder="Address"
                />
                {errors.address && (
                  <span className="error-message">Address is required</span>
                )}
              </div>

              <div className="form_sub one">
                <input
                  type="tel"
                  name="phone"
                  className="form_input"
                  placeholder="Phone Number"
                />
                {errors.phone && (
                  <span className="error-message">
                    Phone number is required
                  </span>
                )}
              </div>

              <div className="form_sub one">
                <select
                  name="service_type"
                  className="form_input"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Type of Service
                  </option>

                  <option value="bathroom_renovation">
                    Bathroom Renovation
                  </option>
                  <option value="interior_remodeling">
                    Full Interior Remodeling
                  </option>
                  <option value="flooring">Flooring Installation</option>
                  <option value="painting">Painting & Finishes</option>
                  <option value="venetian">Venetian Plaster & Wallpaper</option>
                  <option value="other">Other</option>
                </select>
                {errors.service_type && (
                  <span className="error-message">
                    Service type is required
                  </span>
                )}
              </div>

              <div className="form_sub one">
                <input
                  type="datetime-local"
                  name="preferred_time"
                  className="form_input"
                  placeholder="Preferred Date & Time"
                />
                {errors.preferred_time && (
                  <span className="error-message">
                    Preferred time is required
                  </span>
                )}
              </div>

              <div className="form_sub one">
                <div className="rty">
                  <button type="submit" className="cosa">
                    Confirm Info
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Take />
    </div>
  );
};

export default Contact;
