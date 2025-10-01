import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

type Testimonial = {
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
  project: string;
};

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);

  const testimonials: Testimonial[] = [
    {
      name: 'Falou Ndiaye',
      role: 'CEO',
      company: 'StartupLab',
      image: 'https://images.pexels.com/hotos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: 'John est un développeur exceptionnel. Sa capacité à comprendre nos besoins métier et à les traduire en solutions techniques innovantes a été déterminante pour le succès de nos projets. Son expertise en React et son sens du détail font de lui un collaborateur de choix.',
      rating: 5, 
      project: 'Plateforme SaaS'
    }
   
  ];

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const goToTestimonial = (index: number) => setCurrentTestimonial(index);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Témoignages</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ce que disent mes collaborateurs et clients sur notre collaboration
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto relative transition-all duration-500">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-blue-200" />
            <div className="text-center mb-8">
              <img
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900">{testimonials[currentTestimonial].name}</h3>
              <p className="text-blue-600 font-medium">
                {testimonials[currentTestimonial].role} chez {testimonials[currentTestimonial].company}
              </p>
              <div className="flex justify-center mt-2">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed text-center mb-6 italic">
              "{testimonials[currentTestimonial].content}"
            </blockquote>
            <div className="text-center">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Projet: {testimonials[currentTestimonial].project}
              </span>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              aria-label="Précédent"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              aria-label="Suivant"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                aria-label={`Aller au témoignage ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentTestimonial ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Preview Cards */}
          <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer ${
                  index === currentTestimonial ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => goToTestimonial(index)}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm line-clamp-3">
                  "{testimonial.content.substring(0, 120)}..."
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-blue-600 font-medium">{testimonial.project}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Prêt à travailler ensemble ?</h3>
            <p className="text-gray-600 mb-6">
              Rejoignez ces clients satisfaits et donnons vie à votre prochain projet
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Démarrons un projet
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
