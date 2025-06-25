import React from "react";
import { motion } from "framer-motion";
import { InstagramOutlined, FacebookOutlined, TwitterOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <motion.footer 
      className="bg-[#E6E1DB] text-[#A37B73] py-12 px-6 md:px-12 mt-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Us */}
          <motion.div 
            className="mb-6"
            custom={0}
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 border-b-2 border-[#D5A496] pb-2">ClayCraft Studio</h3>
            <p className="text-sm">
              Handcrafted clay products made with love and tradition. Each piece tells a story of craftsmanship and dedication to the art of pottery.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="mb-6"
            custom={1}
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 border-b-2 border-[#D5A496] pb-2">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Products', 'About', 'Gallery', 'Custom Orders'].map((link, i) => (
                <motion.li 
                  key={link}
                  custom={i + 1}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <a href="#" className="hover:text-[#D5A496] transition-colors">{link}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="mb-6"
            custom={2}
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 border-b-2 border-[#D5A496] pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <motion.li 
                className="flex items-center gap-2"
                custom={0}
                variants={itemVariants}
              >
                <MailOutlined />
                <span>contact@claycraftstudio.com</span>
              </motion.li>
              <motion.li 
                className="flex items-center gap-2"
                custom={1}
                variants={itemVariants}
              >
                <PhoneOutlined />
                <span>+1 (555) 123-4567</span>
              </motion.li>
              <motion.li 
                className="flex items-center gap-2 mt-4"
                custom={2}
                variants={itemVariants}
              >
                <span>123 Pottery Lane, Clayville</span>
              </motion.li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div 
            custom={3}
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 border-b-2 border-[#D5A496] pb-2">Follow Us</h3>
            <div className="flex gap-4 mb-4">
              {[
                { icon: <InstagramOutlined className="text-2xl" />, name: 'Instagram' },
                { icon: <FacebookOutlined className="text-2xl" />, name: 'Facebook' },
                { icon: <TwitterOutlined className="text-2xl" />, name: 'Twitter' }
              ].map((social, i) => (
                <motion.a
                  key={social.name}
                  href="#"
                  className="bg-[#D5A496] text-white p-2 rounded-full hover:bg-[#A37B73] transition-colors"
                  custom={i}
                  variants={itemVariants}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <motion.p 
              className="text-sm"
              custom={4}
              variants={itemVariants}
            >
              Subscribe to our newsletter for updates and promotions.
            </motion.p>
            <motion.div 
              className="flex mt-3"
              custom={5}
              variants={itemVariants}
            >
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-3 py-2 rounded-l-lg focus:outline-none w-full text-gray-700"
              />
              <button className="bg-[#A37B73] text-white px-4 py-2 rounded-r-lg hover:bg-[#D5A496] transition-colors">
                Join
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          className="border-t border-[#D5A496] pt-6 text-center text-sm"
          custom={6}
          variants={itemVariants}
        >
          <p>© {new Date().getFullYear()} ClayCraft Studio. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-[#D5A496]">Privacy Policy</a>
            <a href="#" className="hover:text-[#D5A496]">Terms of Service</a>
            <a href="#" className="hover:text-[#D5A496]">Shipping Policy</a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;