
import { MapPin, Calendar, Award } from 'lucide-react';

const About = () => {
  const stats = [
    { label: "Années d'expérience", value: '2+', icon: Calendar },
    { label: 'Projets complétés', value: '15+', icon: Award },
    { label: 'Clients satisfaits', value: '10+', icon: Award },
    { label: 'Technologies maîtrisées', value: '12+', icon: Award },
  ];
 
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            À propos de moi
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Passionné par le développement web depuis plus de 2 ans, je crée des solutions digitales innovantes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side */}
          <div className="space-y-8">
            <div className="relative">
              <div className="w-full max-w-md mx-auto lg:mx-0">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-400 to-purple-600 p-1">
                  <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                    <div className="text-8xl font-bold text-gray-300 d-flex justify-center items-center">
                        <img 
                           src="/uploads/Image collée.png"
                           alt="Papa Malick Teuw"
                           className=" rounded-full h-[400px] w-full   " 
                           />
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center transform rotate-12">
                  <span className="text-2xl">🚀</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-xl">💡</span>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">Dakar, Sénégal</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">Disponible pour nouveaux projets</span>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Développeur Full Stack créatif et méticuleux
              </h3>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Avec plus de 2 années d'expérience dans le développement web, je me spécialise dans la création 
                  d'applications React modernes et performantes. Ma passion pour les technologies émergentes me pousse 
                  à rester constamment à jour avec les dernières tendances du développement.
                </p>
                <p>
                  J'ai eu l'opportunité de travailler sur des projets variés, depuis des startups innovantes jusqu'aux 
                  grandes entreprises, en passant par des projets personnels.
                </p>
                <p>
                  Mon approche combine créativité et rigueur technique pour livrer des solutions qui offrent une expérience 
                  utilisateur exceptionnelle
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl"
                >
                  <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Download */}


          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
