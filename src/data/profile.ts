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
  'Python', 'POO', 'SQL', 'Power BI', 'DAX', 'Tableau',
  'Looker Studio', 'Excel', 'QA & Testing', 'Git/GitHub',
  'HTML/CSS', 'Low-code', 'ETL', 'Data Warehousing', 'Supabase',
  'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'APIs REST',
]

export const SOFT_SKILLS = [
  'Trabajo en equipo',
  'Decisiones basadas en datos',
  'Adaptabilidad',
  'Comunicación clara',
  'Proactividad',
  'Atención al detalle',
]

export const defaultSummary =
  'Enfocado en automatización, datos e IA, construyo sistemas útiles, medibles y trazables en entornos reales.'

export const fallbackData: LinkedInData = {
  firstName: 'César',
  lastName: 'Reyes',
  headline: 'Data · IA · Automatización',
  location: 'Colombia',
  summary: defaultSummary,
  skills: [
    { name: 'Python' },
    { name: 'Power BI' },
    { name: 'DAX' },
    { name: 'Excel' },
    { name: 'Git' },
    { name: 'HTML/CSS' },
  ],
  certifications: [],
}