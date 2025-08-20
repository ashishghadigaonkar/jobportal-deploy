import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Github,
  Heart,
  ExternalLink
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Our Team', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' }
    ],
    jobSeekers: [
      { name: 'Browse Jobs', href: '/jobs' },
      { name: 'Career Advice', href: '#' },
      { name: 'Resume Builder', href: '#' },
      { name: 'Interview Tips', href: '#' }
    ],
    employers: [
      { name: 'Post a Job', href: '/admin/jobs/create' },
      { name: 'Employer Dashboard', href: '/admin/companies' },
      { name: 'Pricing', href: '#' },
      { name: 'Success Stories', href: '#' }
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' }
    ]
  };

  const socialLinks = [
    { Icon: Facebook, href: 'https://facebook.com', name: 'Facebook' },
    { Icon: Twitter, href: 'https://twitter.com', name: 'Twitter' },
    { Icon: Linkedin, href: 'https://linkedin.com', name: 'LinkedIn' },
    { Icon: Instagram, href: 'https://instagram.com', name: 'Instagram' },
    { Icon: Github, href: 'https://github.com', name: 'GitHub' }
  ];

  return (
    <footer className="relative mt-20">
      {/* Gradient Border */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"></div>
      
      <div className="glass-card rounded-none border-0">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <div className='flex items-center gap-2 mb-4'>
                  <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <span className='text-2xl font-bold font-poppins text-white'>
                    Career<span className='gradient-text-secondary'>Hub</span>
                  </span>
                </div>
                <p className="text-white/70 mb-6">
                  Connecting talented professionals with amazing opportunities worldwide.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-white/70">
                    <Mail className="w-4 h-4" />
                    <span>hello@careerhub.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <Phone className="w-4 h-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-white font-semibold mb-4 capitalize">
                  {category === 'jobSeekers' ? 'Job Seekers' : category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-1 group"
                      >
                        {link.name}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12 p-8 glass rounded-2xl"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-white/70">Get the latest job opportunities delivered to your inbox</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 input-glass py-3 px-4 text-white placeholder:text-white/60"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-gradient px-8 py-3 rounded-xl font-semibold text-white"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>

          {/* Bottom Section */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-white/70 text-center md:text-left"
              >
                <p className="flex items-center gap-2">
                  © {currentYear} CareerHub. Made with{' '}
                  <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                  for job seekers worldwide.
                </p>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex gap-4"
              >
                {socialLinks.map(({ Icon, href, name }, index) => (
                  <motion.a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 glass rounded-full text-white/70 hover:text-white transition-colors duration-300"
                    aria-label={name}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;