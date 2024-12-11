import React from 'react';
import { MessageCircle, Phone, Mail, HelpCircle } from 'lucide-react';

const supportChannels = [
  {
    name: 'Live Chat',
    description: 'Chat with our support team in real-time',
    icon: MessageCircle,
    action: 'Start Chat',
    available: true,
  },
  {
    name: 'Phone Support',
    description: 'Call us at +1 (555) 123-4567',
    icon: Phone,
    action: 'Call Now',
    available: true,
  },
  {
    name: 'Email Support',
    description: 'Email us at support@example.com',
    icon: Mail,
    action: 'Send Email',
    available: true,
  },
  {
    name: 'Help Center',
    description: 'Browse our knowledge base',
    icon: HelpCircle,
    action: 'View Articles',
    available: true,
  },
];

const faqs = [
  {
    question: 'How do I track my shipment?',
    answer: 'You can track your shipment by entering your tracking number in the tracking section of your dashboard.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers.',
  },
  {
    question: 'How can I request a refund?',
    answer: 'To request a refund, please contact our support team with your order number and reason for refund.',
  },
  {
    question: 'What are your shipping times?',
    answer: 'Shipping times vary by location. Domestic orders typically take 3-5 business days, while international orders may take 7-14 business days.',
  },
];

export function CustomerSupport() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Customer Support</h2>
        <p className="mt-1 text-sm text-gray-500">
          Get help with your orders, products, and services
        </p>
      </div>

      {/* Support Channels */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {supportChannels.map((channel) => {
          const Icon = channel.icon;
          return (
            <div
              key={channel.name}
              className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
            >
              <div>
                <div className="absolute bg-indigo-500 rounded-md p-3">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg font-medium text-gray-900">{channel.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{channel.description}</p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {channel.action}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQs */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Frequently Asked Questions
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            {faqs.map((faq, index) => (
              <div key={faq.question} className={`${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              } px-4 py-5 sm:px-6`}>
                <dt className="text-sm font-medium text-gray-900">
                  {faq.question}
                </dt>
                <dd className="mt-1 text-sm text-gray-500">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Send us a message
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}