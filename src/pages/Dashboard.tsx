import { FC, FormEvent, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import {  Edit, Trash2, Plus } from 'lucide-react';
import Header from '../components/organisms/Header';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: string;
  github: string;
  demo: string;
  featured: boolean;
  stats: Record<string, unknown>;
}

interface Certification {
  id: number;
  title: string;
  issuer: string;
  description: string;
  issueDate: string;
  fileType: 'pdf' | 'image' | 'document';
  fileUrl: string;
  image?: string;
}

const Dashboard: FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddCertification, setShowAddCertification] = useState(false);
  const [showManageProjects, setShowManageProjects] = useState(false);
  const [showManageCertifications, setShowManageCertifications] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);
  const [existingProjects, setExistingProjects] = useState<Project[]>([]);
  const [existingCertifications, setExistingCertifications] = useState<Certification[]>([]);

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'frontend',
    description: '',
    longDescription: '',
    image: '',
    technologies: '',
    github: '',
    demo: ''
  });

  const [certificationForm, setCertificationForm] = useState({
    title: '',
    issuer: '',
    description: '',
    issueDate: '',
    fileType: 'pdf',
    fileUrl: '',
    image: ''
  });

  // Check admin authentication
  useEffect(() => {
    const auth = localStorage.getItem('adminAuthenticated');
    setIsAdmin(auth === 'true');
  }, []);

  // Load existing projects and certifications
  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem('customProjects') || '[]');
    const certifications = JSON.parse(localStorage.getItem('customCertifications') || '[]');
    setExistingProjects(projects);
    setExistingCertifications(certifications);
  }, []);

  // Handle adding project
  const handleAddProject = (e: FormEvent) => {
    e.preventDefault();
    const newProject = {
      id: Date.now(),
      title: projectForm.title,
      description: projectForm.description,
      longDescription: projectForm.longDescription,
      image: projectForm.image,
      technologies: projectForm.technologies.split(',').map(tech => tech.trim()),
      category: projectForm.category,
      github: projectForm.github,
      demo: projectForm.demo,
      featured: false,
      stats: {}
    };

    // Get existing projects
    const existingProjects = JSON.parse(localStorage.getItem('customProjects') || '[]');
    const updatedProjects = [...existingProjects, newProject];

    // Save to localStorage
    localStorage.setItem('customProjects', JSON.stringify(updatedProjects));

    // Reset form
    setProjectForm({
      title: '',
      category: 'frontend',
      description: '',
      longDescription: '',
      image: '',
      technologies: '',
      github: '',
      demo: ''
    });

    setShowAddProject(false);
    alert('Projet ajouté avec succès!');
  };

  // Handle adding certification
  const handleAddCertification = (e: FormEvent) => {
    e.preventDefault();
    const newCertification = {
      id: Date.now(),
      title: certificationForm.title,
      description: certificationForm.description,
      fileUrl: certificationForm.fileUrl,
      fileType: certificationForm.fileType,
      issueDate: certificationForm.issueDate,
      issuer: certificationForm.issuer,
      image: certificationForm.image || undefined
    };

    // Get existing certifications
    const existingCertifications = JSON.parse(localStorage.getItem('customCertifications') || '[]');
    const updatedCertifications = [...existingCertifications, newCertification];

    // Save to localStorage
    localStorage.setItem('customCertifications', JSON.stringify(updatedCertifications));

    // Reset form
    setCertificationForm({
      title: '',
      issuer: '',
      description: '',
      issueDate: '',
      fileType: 'pdf',
      fileUrl: '',
      image: ''
    });

    setShowAddCertification(false);
    alert('Certification ajoutée avec succès!');
  };

  // Handle delete project
  const handleDeleteProject = (projectId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      const updatedProjects = existingProjects.filter(p => p.id !== projectId);
      localStorage.setItem('customProjects', JSON.stringify(updatedProjects));
      setExistingProjects(updatedProjects);
      alert('Projet supprimé avec succès!');
    }
  };

  // Handle delete certification
  const handleDeleteCertification = (certificationId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette certification ?')) {
      const updatedCertifications = existingCertifications.filter(c => c.id !== certificationId);
      localStorage.setItem('customCertifications', JSON.stringify(updatedCertifications));
      setExistingCertifications(updatedCertifications);
      alert('Certification supprimée avec succès!');
    }
  };

  // Handle update project
  const handleUpdateProject = (e: FormEvent, projectId: number) => {
    e.preventDefault();
    if (!editingProject) return;
    const updatedProjects = existingProjects.map(p =>
      p.id === projectId ? editingProject : p
    );
    localStorage.setItem('customProjects', JSON.stringify(updatedProjects));
    setExistingProjects(updatedProjects);
    setEditingProject(null);
    alert('Projet mis à jour avec succès!');
  };

  // Handle update certification
  const handleUpdateCertification = (e: FormEvent, certificationId: number) => {
    e.preventDefault();
    if (!editingCertification) return;
    const updatedCertifications = existingCertifications.map(c =>
      c.id === certificationId ? editingCertification : c
    );
    localStorage.setItem('customCertifications', JSON.stringify(updatedCertifications));
    setExistingCertifications(updatedCertifications);
    setEditingCertification(null);
    alert('Certification mise à jour avec succès!');
  };

  // Mock data for charts
  const projectData = [
    { name: 'Jan', projects: 4 },
    { name: 'Feb', projects: 3 },
    { name: 'Mar', projects: 6 },
    { name: 'Apr', projects: 8 },
    { name: 'May', projects: 5 },
    { name: 'Jun', projects: 9 },
  ];

  const skillData = [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'AWS', level: 70 },
  ];

  const visitorData = [
    { name: 'Mon', visitors: 120 },
    { name: 'Tue', visitors: 150 },
    { name: 'Wed', visitors: 180 },
    { name: 'Thu', visitors: 200 },
    { name: 'Fri', visitors: 250 },
    { name: 'Sat', visitors: 300 },
    { name: 'Sun', visitors: 280 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Dashboard</h1>

        {/* Admin Panel */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-8 text-white"
          >
            <h2 className="text-2xl font-bold mb-4">Panneau d'administration</h2>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => setShowAddProject(!showAddProject)}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <Plus className="h-5 w-5" />
                Ajouter un projet
              </button>
              <button
                onClick={() => setShowAddCertification(!showAddCertification)}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <Plus className="h-5 w-5" />
                Ajouter une certification
              </button>
              <button
                onClick={() => setShowManageProjects(!showManageProjects)}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <Edit className="h-5 w-5" />
                Gérer les projets ({existingProjects.length})
              </button>
              <button
                onClick={() => setShowManageCertifications(!showManageCertifications)}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <Edit className="h-5 w-5" />
                Gérer les certifications ({existingCertifications.length})
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">Total Projects</h3>
            <p className="text-3xl font-bold text-blue-600">35</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">Skills Mastered</h3>
            <p className="text-3xl font-bold text-green-600">12</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">Years Experience</h3>
            <p className="text-3xl font-bold text-purple-600">5</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4">Projects per Month</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="projects" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4">Skill Levels</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="level" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4">Weekly Visitors</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="visitors" stroke="#ff7300" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4">Project Categories</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Web Apps', value: 40 },
                    { name: 'Mobile Apps', value: 30 },
                    { name: 'APIs', value: 20 },
                    { name: 'Tools', value: 10 },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {[
                    { name: 'Web Apps', value: 40 },
                    { name: 'Mobile Apps', value: 30 },
                    { name: 'APIs', value: 20 },
                    { name: 'Tools', value: 10 },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Add Project Form */}
        {showAddProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-bold mb-4">Ajouter un nouveau projet</h3>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Titre</label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                    placeholder="Nom du projet"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Catégorie</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="fullstack">Full Stack</option>
                    <option value="mobile">Mobile</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description courte</label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                  placeholder="Description brève"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description longue</label>
                <textarea
                  value={projectForm.longDescription}
                  onChange={(e) => setProjectForm({...projectForm, longDescription: e.target.value})}
                  placeholder="Description détaillée"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
                <input
                  type="url"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({...projectForm, image: e.target.value})}
                  placeholder="URL de l'image"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Technologies</label>
                <input
                  type="text"
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})}
                  placeholder="React, Node.js, MongoDB"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GitHub</label>
                  <input
                    type="url"
                    value={projectForm.github}
                    onChange={(e) => setProjectForm({...projectForm, github: e.target.value})}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Demo</label>
                  <input
                    type="url"
                    value={projectForm.demo}
                    onChange={(e) => setProjectForm({...projectForm, demo: e.target.value})}
                    placeholder="https://demo.com"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Ajouter le projet
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddProject(false)}
                  className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                  Annuler
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Add Certification Form */}
        {showAddCertification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-bold mb-4">Ajouter une nouvelle certification</h3>
            <form onSubmit={handleAddCertification} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Titre</label>
                  <input
                    type="text"
                    value={certificationForm.title}
                    onChange={(e) => setCertificationForm({...certificationForm, title: e.target.value})}
                    placeholder="Nom de la certification"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Organisme</label>
                  <input
                    type="text"
                    value={certificationForm.issuer}
                    onChange={(e) => setCertificationForm({...certificationForm, issuer: e.target.value})}
                    placeholder="AWS, Google, etc."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={certificationForm.description}
                  onChange={(e) => setCertificationForm({...certificationForm, description: e.target.value})}
                  placeholder="Description de la certification"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date d'obtention</label>
                  <input
                    type="date"
                    value={certificationForm.issueDate}
                    onChange={(e) => setCertificationForm({...certificationForm, issueDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type de fichier</label>
                  <select
                    value={certificationForm.fileType}
                    onChange={(e) => setCertificationForm({...certificationForm, fileType: e.target.value as 'pdf' | 'image' | 'document'})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="pdf">PDF</option>
                    <option value="image">Image</option>
                    <option value="document">Document</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">URL du fichier</label>
                <input
                  type="url"
                  value={certificationForm.fileUrl}
                  onChange={(e) => setCertificationForm({...certificationForm, fileUrl: e.target.value})}
                  placeholder="URL du certificat"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image de couverture (optionnel)</label>
                <input
                  type="url"
                  value={certificationForm.image}
                  onChange={(e) => setCertificationForm({...certificationForm, image: e.target.value})}
                  placeholder="URL d'une image représentative"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Ajouter la certification
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddCertification(false)}
                  className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                  Annuler
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Manage Projects */}
        {showManageProjects && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-bold mb-4">Gérer les projets</h3>
            {existingProjects.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300">Aucun projet personnalisé trouvé.</p>
            ) : (
              <div className="space-y-4">
                {existingProjects.map((project: Project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{project.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies?.map((tech: string) => (
                          <span key={tech} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingProject(project)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => setShowManageProjects(false)}
              className="mt-4 px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              Fermer
            </button>
          </motion.div>
        )}

        {/* Manage Certifications */}
        {showManageCertifications && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-bold mb-4">Gérer les certifications</h3>
            {existingCertifications.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300">Aucune certification personnalisée trouvée.</p>
            ) : (
              <div className="space-y-4">
                {existingCertifications.map((certification: Certification) => (
                  <div key={certification.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{certification.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{certification.issuer} - {new Date(certification.issueDate).getFullYear()}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingCertification(certification)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCertification(certification.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => setShowManageCertifications(false)}
              className="mt-4 px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              Fermer
            </button>
          </motion.div>
        )}

        {/* Edit Project Form */}
        {editingProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-bold mb-4">Modifier le projet</h3>
            <form onSubmit={(e) => handleUpdateProject(e, editingProject.id)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Titre</label>
                  <input
                    type="text"
                    defaultValue={editingProject.title}
                    onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                    placeholder="Nom du projet"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Catégorie</label>
                  <select
                    defaultValue={editingProject.category}
                    onChange={(e) => setEditingProject({...editingProject, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="fullstack">Full Stack</option>
                    <option value="mobile">Mobile</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description courte</label>
                <textarea
                  defaultValue={editingProject.description}
                  onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                  placeholder="Description brève"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description longue</label>
                <textarea
                  defaultValue={editingProject.longDescription}
                  onChange={(e) => setEditingProject({...editingProject, longDescription: e.target.value})}
                  placeholder="Description détaillée"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
                <input
                  type="url"
                  defaultValue={editingProject.image}
                  onChange={(e) => setEditingProject({...editingProject, image: e.target.value})}
                  placeholder="URL de l'image"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Technologies</label>
                <input
                  type="text"
                  defaultValue={editingProject.technologies?.join(', ')}
                  onChange={(e) => setEditingProject({...editingProject, technologies: e.target.value.split(',').map(tech => tech.trim())})}
                  placeholder="React, Node.js, MongoDB"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GitHub</label>
                  <input
                    type="url"
                    defaultValue={editingProject.github}
                    onChange={(e) => setEditingProject({...editingProject, github: e.target.value})}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Demo</label>
                  <input
                    type="url"
                    defaultValue={editingProject.demo}
                    onChange={(e) => setEditingProject({...editingProject, demo: e.target.value})}
                    placeholder="https://demo.com"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Mettre à jour le projet
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                  Annuler
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Edit Certification Form */}
        {editingCertification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-bold mb-4">Modifier la certification</h3>
            <form onSubmit={(e) => handleUpdateCertification(e, editingCertification.id)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Titre</label>
                  <input
                    type="text"
                    defaultValue={editingCertification.title}
                    onChange={(e) => setEditingCertification({...editingCertification, title: e.target.value})}
                    placeholder="Nom de la certification"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Organisme</label>
                  <input
                    type="text"
                    defaultValue={editingCertification.issuer}
                    onChange={(e) => setEditingCertification({...editingCertification, issuer: e.target.value})}
                    placeholder="AWS, Google, etc."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  defaultValue={editingCertification.description}
                  onChange={(e) => setEditingCertification({...editingCertification, description: e.target.value})}
                  placeholder="Description de la certification"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date d'obtention</label>
                  <input
                    type="date"
                    defaultValue={editingCertification.issueDate}
                    onChange={(e) => setEditingCertification({...editingCertification, issueDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type de fichier</label>
                  <select
                    defaultValue={editingCertification.fileType}
                    onChange={(e) => setEditingCertification({...editingCertification, fileType: e.target.value as 'pdf' | 'image' | 'document'})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="pdf">PDF</option>
                    <option value="image">Image</option>
                    <option value="document">Document</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">URL du fichier</label>
                <input
                  type="url"
                  defaultValue={editingCertification.fileUrl}
                  onChange={(e) => setEditingCertification({...editingCertification, fileUrl: e.target.value})}
                  placeholder="URL du certificat"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image de couverture (optionnel)</label>
                <input
                  type="url"
                  defaultValue={editingCertification.image}
                  onChange={(e) => setEditingCertification({...editingCertification, image: e.target.value})}
                  placeholder="URL d'une image représentative"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Mettre à jour la certification
                </button>
                <button
                  type="button"
                  onClick={() => setEditingCertification(null)}
                  className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                  Annuler
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;