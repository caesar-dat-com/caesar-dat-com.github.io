export interface LinkedInSkill {
  name: string
}

export interface LinkedInCert {
  name: string
  authority: string
  url?: string
  timePeriod?: {
    startDate?: { month: number; year: number }
    endDate?: { month: number; year: number }
  }
}

export interface LinkedInData {
  firstName: string
  lastName: string
  headline: string
  location: string
  summary: string
  publicProfileUrl?: string
  skills: LinkedInSkill[]
  certifications: LinkedInCert[]
}

export const LINKS = {
  linkedin: 'https://www.linkedin.com/in/cesar-reyes-8a60622b2/',
  github: 'https://github.com/caesar-dat-com',
  instagram: 'https://www.instagram.com/caesar__palace/',
  spotify: 'https://open.spotify.com/user/31hu2kdccm2vguqtnndm5ecgc2jy?si=fdb28cbfe7b0495b',
} as const

export const EMAIL = 'cesar.cesarreyes25@gmail.com'

export const SECTIONS = [
  { id: 'about', label: 'Sobre mí', key: '1' },
  { id: 'stack', label: 'Stack', key: '2' },
  { id: 'experience', label: 'Experiencia', key: '3' },
  { id: 'projects', label: 'Proyectos', key: '4' },
  { id: 'education', label: 'Educación', key: '5' },
  { id: 'certs', label: 'Certificaciones', key: '6' },
  { id: 'contact', label: 'Contacto', key: '7' },
  { id: 'instagram', label: 'Instagram', key: '8' },
  { id: 'spotify', label: 'Spotify', key: '9' },
] as const

export const SECTION_META: Record<string, string> = {
  about: 'Quién soy y enfoque actual.',
  stack: 'Skills y herramientas. El filtro aplica aquí.',
  experience: 'Rol actual y trayectoria en planta.',
  projects: 'Construcción de soluciones útiles y medibles.',
  education: 'Formación base + especialización.',
  certs: 'Certificaciones y cursos (con links).',
  contact: 'Contacto rápido.',
  instagram: 'Previsualización del perfil + link.',
  spotify: 'Previsualización + link.',
}

export const SECTION_NAMES: Record<string, string> = {
  about: 'Sobre mí',
  stack: 'Stack',
  experience: 'Experiencia',
  projects: 'Proyectos',
  education: 'Educación',
  certs: 'Certificaciones',
  contact: 'Contacto',
  instagram: 'Instagram',
  spotify: 'Spotify',
}

export const CORE_SKILLS = [
  'Python', 'SQL', 'Docker', 'Git/GitHub', 'PowerShell',
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'HTML/CSS',
  'Apache Airflow', 'Apache Spark', 'Big Data', 'ETL', 'Ingeniería de datos',
  'Machine Learning', 'Computer Vision', 'NLP', 'Kubernetes', 'Power BI',
  'DAX', 'Tableau', 'Looker Studio', 'Excel', 'Supabase',
  'Tailwind CSS', 'Vite', 'APIs REST', 'QA & Testing', 'Low-code',
]

export const SOFT_SKILLS = [
  'Innovación',
  'Creatividad',
  'Liderazgo de equipos',
  'Resolución de problemas',
  'Trabajo en equipo',
  'Decisiones basadas en datos',
  'Adaptabilidad',
  'Comunicación clara',
  'Proactividad',
  'Atención al detalle',
  'Capacidad de análisis',
]

export const defaultSummary =
  'Ingeniero de Datos e IA con experiencia en automatización industrial y desarrollo de software. En POSTOBON S.A. diseño e implemento soluciones low-code que centralizan procesos operativos para +2,000 usuarios en planta. Estudiante de último año de Ingeniería en Datos e Inteligencia Artificial (UAO), con formación en ML, Big Data, NLP y Computer Vision. Stack: Python · JavaScript · React · SQL · Docker · Airflow · Spark · Git · Power BI. Enfoque: datos trazables, sistemas útiles, resultados medibles.'

export const fallbackData: LinkedInData = {
  firstName: 'César',
  lastName: 'Reyes',
  headline: 'Data · IA · Automatización',
  location: 'Colombia',
  summary: defaultSummary,
  skills: [
    { name: 'Python' }, { name: 'Docker' }, { name: 'Git' }, { name: 'Kubernetes' },
    { name: 'SQL' }, { name: 'JavaScript' }, { name: 'React' }, { name: 'TypeScript' },
    { name: 'Apache Airflow' }, { name: 'Apache Spark' }, { name: 'Machine Learning' },
    { name: 'Computer Vision' }, { name: 'ETL' }, { name: 'Big Data' },
    { name: 'NLP' }, { name: 'Power BI' }, { name: 'PowerShell' },
  ],
  certifications: [
    { name: 'Curso de Introducción a C', authority: 'Platzi', url: 'https://platzi.com/p/cesar.cesarreyes25390/curso/introduccion-c/diploma/detalle/', timePeriod: { startDate: { month: 3, year: 2026 } } },
    { name: 'Python Core', authority: 'Sololearn', timePeriod: { startDate: { month: 2, year: 2026 } } },
    { name: 'Primer lugar en la categoría de Innovación - Rally Latinoamericano de Innovación, Edición 2024', authority: 'Universidad Autónoma de Occidente', timePeriod: { startDate: { month: 10, year: 2024 } } },
    { name: 'Curso de Fundamentos de Python', authority: 'Platzi', url: 'https://platzi.com/p/cesar.cesarreyes25390/curso/fundamentos-python/diploma/detalle/', timePeriod: { startDate: { month: 2, year: 2024 } } },
    { name: 'Tecnólogo en Gestión de Sistemas Mecatrónicos', authority: 'FCECEP', timePeriod: { startDate: { month: 4, year: 2023 } } },
  ],
}