
import { Code, Database, Palette, Settings, Globe, Smartphone } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: Code,
      color: 'blue',
      skills: [
        { name: 'React', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Vue.js', level: 75 },
      ]
    },
    {
      title: 'Backend',
      icon: Database,
      color: 'green',
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'MongoDB', level: 75 },
        { name: 'GraphQL', level: 70 },
      ]
    },
    {
      title: 'Design',
      icon: Palette,
      color: 'purple',
      skills: [
        { name: 'UI/UX Design', level: 80 },
        { name: 'Figma', level: 85 },
        { name: 'Adobe XD', level: 75 },
        { name: 'Photoshop', level: 70 },
        { name: 'Illustrator', level: 65 },
      ]
    },
    {
      title: 'DevOps',
      icon: Settings,
      color: 'orange',
      skills: [
        { name: 'Docker', level: 80 },
        { name: 'AWS', level: 75 },
        { name: 'GitHub Actions', level: 85 },
        { name: 'Vercel', level: 90 },
        { name: 'Nginx', level: 70 },
      ]
    },
    {
      title: 'Web',
      icon: Globe,
      color: 'cyan',
      skills: [
        { name: 'SEO', level: 80 },
        { name: 'Performance', level: 85 },
        { name: 'Accessibility', level: 75 },
        { name: 'PWA', level: 80 },
        { name: 'Web APIs', level: 85 },
      ]
    },
    {
      title: 'Mobile',
      icon: Smartphone,
      color: 'pink',
      skills: [
        { name: 'React Native', level: 80 },
        { name: 'Expo', level: 85 },
        { name: 'Flutter', level: 60 },
        { name: 'App Store', level: 70 },
        { name: 'Play Store', level: 70 },
      ]
    },
  ];

  const getColorClasses = (color: string, opacity: string = '600') => {
    const colors: { [key: string]: string } = {
      blue: `text-blue-${opacity} bg-blue-50 border-blue-200`,
      green: `text-green-${opacity} bg-green-50 border-green-200`,
      purple: `text-purple-${opacity} bg-purple-50 border-purple-200`,
      orange: `text-orange-${opacity} bg-orange-50 border-orange-200`,
      cyan: `text-cyan-${opacity} bg-cyan-50 border-cyan-200`,
      pink: `text-pink-${opacity} bg-pink-50 border-pink-200`,
    };
    return colors[color] || colors.blue;
  };

  const getProgressColor = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      purple: 'bg-purple-600',
      orange: 'bg-orange-600',
      cyan: 'bg-cyan-600',
      pink: 'bg-pink-600',
    };
    return colors[color] || colors.blue;
  };

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mes compétences
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Technologies et outils que je maîtrise pour créer des solutions complètes et innovantes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Header */}
              <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-lg border mb-6 ${getColorClasses(category.color)}`}>
                <category.icon className="w-5 h-5" />
                <h3 className="font-semibold text-lg">{category.title}</h3>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ease-out ${getProgressColor(category.color)}`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Toujours en apprentissage
            </h3>
            <p className="text-gray-600 mb-6">
              Je me tiens constamment à jour avec les dernières technologies et tendances du développement web. 
              Actuellement, j'approfondis mes connaissances en IA et machine learning pour intégrer des 
              fonctionnalités intelligentes dans mes applications.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium">
                Intelligence Artificielle
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-cyan-100 text-green-800 rounded-full text-sm font-medium">
                Web3 & Blockchain
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 rounded-full text-sm font-medium">
                Microservices
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium">
                Cloud Native
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;