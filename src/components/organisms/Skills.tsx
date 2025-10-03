
import { Code, Database, Palette, Settings, Globe, Smartphone, Search, Zap, Shield, Smartphone as MobileIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiVuedotjs,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiGraphql,
  SiFigma,
  SiAdobexd,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiDocker,
  SiAmazon,
  SiGithubactions,
  SiVercel,
  SiNginx,
  SiExpo,
  SiFlutter,
} from 'react-icons/si';

const Skills = () => {
  const { t } = useTranslation();

  const skillCategories = [
    {
      title: t('skills.frontend'),
      icon: Code,
      color: 'blue',
      skills: [
        { name: 'React', icon: SiReact, level: 95 },
        { name: 'TypeScript', icon: SiTypescript, level: 90 },
        { name: 'Next.js', icon: SiNextdotjs, level: 85 },
        { name: 'Tailwind CSS', icon: SiTailwindcss, level: 90 },
        { name: 'Vue.js', icon: SiVuedotjs, level: 75 },
      ]
    },
    {
      title: t('skills.backend'),
      icon: Database,
      color: 'green',
      skills: [
        { name: 'Node.js', icon: SiNodedotjs, level: 90 },
        { name: 'Python', icon: SiPython, level: 85 },
        { name: 'PostgreSQL', icon: SiPostgresql, level: 80 },
        { name: 'MongoDB', icon: SiMongodb, level: 75 },
        { name: 'GraphQL', icon: SiGraphql, level: 70 },
      ]
    },
    {
      title: t('skills.design'),
      icon: Palette,
      color: 'purple',
      skills: [
        { name: 'UI/UX Design', icon: Palette, level: 80 },
        { name: 'Figma', icon: SiFigma, level: 85 },
        { name: 'Adobe XD', icon: SiAdobexd, level: 75 },
        { name: 'Photoshop', icon: SiAdobephotoshop, level: 70 },
        { name: 'Illustrator', icon: SiAdobeillustrator, level: 65 },
      ]
    },
    {
      title: t('skills.devops'),
      icon: Settings,
      color: 'orange',
      skills: [
        { name: 'Docker', icon: SiDocker, level: 80 },
        { name: 'AWS', icon: SiAmazon, level: 75 },
        { name: 'GitHub Actions', icon: SiGithubactions, level: 85 },
        { name: 'Vercel', icon: SiVercel, level: 90 },
        { name: 'Nginx', icon: SiNginx, level: 70 },
      ]
    },
    {
      title: t('skills.web'),
      icon: Globe,
      color: 'cyan',
      skills: [
        { name: 'SEO', icon: Search, level: 80 },
        { name: 'Performance', icon: Zap, level: 85 },
        { name: 'Accessibility', icon: Shield, level: 75 },
        { name: 'PWA', icon: Smartphone, level: 80 },
        { name: 'Web APIs', icon: Globe, level: 85 },
      ]
    },
    {
      title: t('skills.mobile'),
      icon: Smartphone,
      color: 'pink',
      skills: [
        { name: 'React Native', icon: SiReact, level: 80 },
        { name: 'Expo', icon: SiExpo, level: 85 },
        { name: 'Flutter', icon: SiFlutter, level: 60 },
        { name: 'App Store', icon: MobileIcon, level: 70 },
        { name: 'Play Store', icon: MobileIcon, level: 70 },
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
            {t('skills.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('skills.subtitle')}
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
                      <div className="flex items-center gap-2">
                        <skill.icon className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-700 font-medium">{skill.name}</span>
                      </div>
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
              {t('skills.learning')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('skills.learningDesc')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium">
                {t('skills.ai')}
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-cyan-100 text-green-800 rounded-full text-sm font-medium">
                {t('skills.web3')}
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 rounded-full text-sm font-medium">
                {t('skills.microservices')}
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium">
                {t('skills.cloud')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;