import React from 'react';

const testimonials = [
  {
    content: "This platform has revolutionized our shipping operations. We've seen a 40% increase in efficiency.",
    author: "Sarah Chen",
    role: "Logistics Manager",
    company: "Global Trade Co.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    content: "The real-time tracking and analytics have helped us make better decisions and improve customer satisfaction.",
    author: "Michael Rodriguez",
    role: "Operations Director",
    company: "FastShip Logistics",
    image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
];

export function Testimonials() {
  return (
    <div className="bg-gray-50 py-16 lg:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              Trusted by Industry Leaders
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Hear from our satisfied customers about their experience with our platform.
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-8 lg:grid-cols-2 lg:max-w-none">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-xl font-medium text-gray-900">
                      "{testimonial.content}"
                    </p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={testimonial.image} alt="" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <p>{testimonial.role}</p>
                        <span aria-hidden="true">&middot;</span>
                        <p>{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}