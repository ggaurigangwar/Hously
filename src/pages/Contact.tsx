import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare, CheckCircle } from 'lucide-react';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API call
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="w-full max-w-6xl px-4 py-32 mx-auto flex flex-col lg:flex-row gap-16 relative z-10 overflow-hidden min-h-[85vh] items-center">
      <div className="orb-1" />
      
      {/* Left Side Content */}
      <div className="flex-1 space-y-8">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-extrabold tracking-tighter text-[#2C2C2A] mb-6 drop-shadow-sm leading-tight">
            Let's Shape the <br />
            <span className="text-[#A3A79A] italic font-normal">Future Together.</span>
          </h1>
          <p className="text-[#2C2C2A]/70 font-medium max-w-xl text-lg leading-relaxed mb-12">
            Have a question about our architectural synthesis engine or want to discuss a partnership? Our team is here to assist you in bridging the gap between 2D sketches and 3D reality.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-[#2C2C2A]">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-[#EAE6DF] flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#8C847A]" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-[#8C847A]">Email Us</p>
                <p className="font-semibold">hello@hously.ai</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[#2C2C2A]">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-[#EAE6DF] flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-[#8C847A]" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-[#8C847A]">Community</p>
                <p className="font-semibold">Join our Discord</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side Form */}
      <div className="flex-1 w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="aether-card p-10 shadow-[0_30px_60px_rgba(0,0,0,0.05)] relative z-10 border border-[#EAE6DF]"
        >
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-20 text-center space-y-6"
            >
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-100">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-[#2C2C2A]">Message Sent!</h2>
              <p className="text-[#2C2C2A]/60 font-medium">Thank you for reaching out. <br /> We'll get back to you shortly.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-sm font-bold text-[#8C847A] hover:text-[#2C2C2A] transition-colors"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C847A] ml-1">Your Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C847A]" />
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    className="w-full bg-[#FAF9F6] border border-[#EAE6DF] rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#EAE6DF] transition-all font-medium text-[#2C2C2A] placeholder:text-[#8C847A]/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C847A] ml-1">Your Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C847A]" />
                  <input 
                    type="email" 
                    required
                    placeholder="john@example.com"
                    className="w-full bg-[#FAF9F6] border border-[#EAE6DF] rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#EAE6DF] transition-all font-medium text-[#2C2C2A] placeholder:text-[#8C847A]/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C847A] ml-1">Your Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-6 w-4 h-4 text-[#8C847A]" />
                  <textarea 
                    required
                    rows={4}
                    placeholder="How can we help?"
                    className="w-full bg-[#FAF9F6] border border-[#EAE6DF] rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#EAE6DF] transition-all font-medium text-[#2C2C2A] placeholder:text-[#8C847A]/30 resize-none"
                  />
                </div>
              </div>

              <button type="submit" className="tactile-button w-full group flex items-center justify-center !py-5 gap-3 mt-4">
                <span>Send Message</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
