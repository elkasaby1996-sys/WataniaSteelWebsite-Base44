import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, HelpCircle, Phone, MessageCircle } from 'lucide-react';

const faqCategories = [
  {
    name: 'Delivery & Timing',
    faqs: [
      {
        question: 'How fast can you deliver straight bars?',
        answer: 'We offer express delivery for straight bars within 1-2 hours across Qatar. Our dedicated trailer fleet ensures rapid delivery to your site. For standard orders, delivery is typically same-day or next-day depending on order size.'
      },
      {
        question: 'What are your working hours?',
        answer: 'Our factory operates Monday through Thursday and Saturday from 6:00 AM to 10:00 PM. We are closed on Fridays. Orders placed before 6:00 PM are typically processed the same day.'
      },
      {
        question: 'Do you deliver on weekends?',
        answer: 'Yes, we deliver on Saturdays from 6:00 AM to 10:00 PM. Friday delivery is not available as we are closed.'
      },
      {
        question: 'What is the lead time for cut & bend orders?',
        answer: 'Lead time depends on order complexity and size. Simple orders: 2-3 days. Medium complexity: 3-5 days. Large or complex orders: 5-7 days. Express processing is available for an additional fee.'
      }
    ]
  },
  {
    name: 'Custom Shapes',
    faqs: [
      {
        question: 'Can you fabricate any custom shape?',
        answer: 'Yes, our Schnell and Oscam machinery can produce virtually any shape including stirrups, hooks, L-bars, U-bars, spirals, and reinforcement cages. Simply upload your BBS (Bar Bending Schedule) or drawings for a quote.'
      },
      {
        question: 'What file formats do you accept for custom orders?',
        answer: 'We accept PDF drawings, AutoCAD files (DWG/DXF), Excel spreadsheets for BBS, and even clear photos of drawings. Our team will review and provide a quote within 24 hours.'
      },
      {
        question: 'What diameters can you work with?',
        answer: 'We work with all standard diameters from 8mm to 32mm. Each diameter is available in B500B grade steel with conformity certificates.'
      }
    ]
  },
  {
    name: 'Express Orders',
    faqs: [
      {
        question: 'What is an express order?',
        answer: 'Express orders receive priority processing with faster turnaround times. There is an additional fee of 500 QAR for express processing. Express orders are processed ahead of standard orders.'
      },
      {
        question: 'How much faster is express delivery?',
        answer: 'Express straight bar delivery: Within 1 hour. Express cut & bend: Reduced by 50% (e.g., 3-day order becomes 1.5 days). Express processing begins immediately upon order confirmation.'
      }
    ]
  },
  {
    name: 'Delivery & Unloading',
    faqs: [
      {
        question: 'What are the crane/unloading charges?',
        answer: 'Trailer delivery (small): 100 QAR. Trailer delivery (medium): 200 QAR. Trailer delivery (large): 400 QAR. Crane unloading service: 700 QAR. Self-pickup is free of charge.'
      },
      {
        question: 'Do I need to arrange unloading at my site?',
        answer: 'If you don\'t have unloading equipment, you can add our crane unloading service for 700 QAR. Otherwise, please ensure you have a forklift or crane ready at the delivery location.'
      },
      {
        question: 'What areas do you deliver to?',
        answer: 'We deliver across Qatar including Doha, Lusail, Al Wakra, Al Khor, Industrial Area, and all construction sites. Remote locations may have additional delivery fees.'
      }
    ]
  },
  {
    name: 'Ordering & Payment',
    faqs: [
      {
        question: 'How can I place an order?',
        answer: 'You can order through our website store, upload a BOQ/BBS for a quote, call our hotline, or visit our factory. For large or complex orders, we recommend requesting a formal quotation first.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept Cash on Delivery (COD) and Bank Transfer. For large orders, we may offer credit terms for established customers with approved accounts.'
      },
      {
        question: 'Do you provide invoices and delivery notes?',
        answer: 'Yes, all orders come with official invoices, delivery notes, and material certificates. Logged-in customers can access their order history and documents through their account.'
      }
    ]
  },
  {
    name: 'Quality & Certifications',
    faqs: [
      {
        question: 'What certifications do you have?',
        answer: 'We are Ashghal Approved, ISO 9001:2015 (Quality), ISO 14001:2015 (Environmental), and ISO 45001:2018 (Health & Safety) certified. We also hold IGM (International Green Mark) certification.'
      },
      {
        question: 'What steel grade do you supply?',
        answer: 'All our reinforcement steel is B500B grade, meeting British and European standards. Conformity certificates are available for all diameters from 10mm to 40mm.'
      },
      {
        question: 'Can you provide mill certificates?',
        answer: 'Yes, we provide mill certificates and conformity certificates for all steel supplied. These can be provided with each delivery or accessed through your account.'
      }
    ]
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1A1A1A] to-[#2d2d2d] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-[#7B1F32] font-semibold tracking-wide uppercase text-sm">Help Center</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mt-4 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about our services, delivery, and ordering process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#7B1F32] rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-white" />
                  </div>
                  {category.name}
                </h2>

                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => {
                    const isOpen = openItems[`${categoryIndex}-${faqIndex}`];
                    
                    return (
                      <div
                        key={faqIndex}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(categoryIndex, faqIndex)}
                          className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                          <ChevronDown 
                            className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="px-6 pb-6">
                                <div className="border-t pt-4">
                                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-gray-400 mb-8">
            Our team is ready to help. Contact us directly for personalized assistance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl('Contact')}>
              <Button className="bg-[#7B1F32] hover:bg-[#5a1625] text-white px-8 py-6 rounded-xl">
                <MessageCircle className="mr-2 w-5 h-5" />
                Contact Us
              </Button>
            </Link>
            <a href="tel:+97444444444">
              <Button variant="outline" className="border-white !text-[#691A2A] hover:bg-white hover:text-[#691A2A] px-8 py-6 rounded-xl">
                <Phone className="mr-2 w-5 h-5" />
                Call Hotline
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
