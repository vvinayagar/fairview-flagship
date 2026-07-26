// Open-source imagery via Unsplash CDN (free to use) — stands in for Fairview's own photography.
const img = (id, w = 900, h = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80&h=${h}`

/* ---------- shell ---------- */
export const heroVideo = '/hero.mp4' // CC0 school clip (Mixkit free license)
export const heroPoster = img('1523050854058-8df90110c9f1', 1600, 900)
export const panoramaImg = img('1466442929976-97f336a657be', 1600, 900)

export const topNav = ['Visit', 'Admissions', 'Parent Portal']
export const menuNav = ['About Us', 'Admissions', 'Our Programmes', 'Student Life', 'Our Campuses', 'Newsroom', 'Contact Us']
export const footerQuick = ['Admissions', 'Our Programmes', 'Newsroom', 'Dominus Arts Venue', 'Work With Us', 'Contact Us']

// Menu stage cards (right side of the overlay) — hovering each swaps the image.
export const stages = [
  { name: 'Early Years', ages: 'Ages 3–6', img: img('1503676260728-1c00da094a0b', 900, 700) },
  { name: 'Primary · PYP', ages: 'Ages 6–11', img: img('1580582932707-520aed937b7b', 900, 700) },
  { name: 'Middle Years · MYP', ages: 'Ages 11–16', img: img('1522202176988-66273c2fd55f', 900, 700) },
  { name: 'IB Diploma', ages: 'Ages 16–19', img: img('1523240795612-9a054b0db644', 900, 700) },
]

export const socials = ['f', '◉', '\u{1D54F}', '▶', 'in']

/* ---------- 01 · intro (Space to flourish) ---------- */
export const introImg = img('1580582932707-520aed937b7b', 900, 700)
export const boardingImg = img('1509062522246-3755977927d7', 800, 560)
export const exploreImg = img('1544717305-2782549b5136', 800, 560)

/* ---------- 02 · Fairview in Numbers ---------- */
export const stats = [
  { value: '47', label: 'Years of IB excellence, since 1978', offset: 0 },
  { value: '6', label: 'Campuses across Malaysia & beyond', offset: 46, link: true },
  { value: '3', label: 'IB programmes — PYP, MYP & Diploma', offset: 0, link: true },
  { value: '#1', label: "Malaysia's largest private IB school network", offset: 60, big: true },
  { value: '40+', label: 'Nationalities in our community', offset: 20 },
  { value: '97%', label: 'IB Diploma pass rate, above the global average', offset: 70 },
  { value: '1,000+', label: 'University offers earned by our graduates', offset: 10, wide: true },
  { value: '10k+', label: 'Alumni thriving around the world', offset: 54 },
]

/* ---------- 03 · Imagine a School That… (tabbed pillars) ---------- */
export const pillars = [
  { title: 'Nurtures Minds Like Gardens',
    text: 'We grow children, we don’t manufacture results. Given the freedom to explore, question and create, every Fairview student discovers their own strengths and unique talents. Personalised IB learning meets each child where they are and helps them go further than they thought possible.',
    cta: 'Explore Our Programmes', photo: img('1503676260728-1c00da094a0b', 800, 560) },
  { title: 'Achieves Excellence With Heart',
    text: 'Academic ambition and genuine wellbeing are not a trade-off at Fairview. Happy, supported children learn best — so pastoral care sits at the heart of everything, right alongside a rigorous, globally-recognised IB curriculum.',
    cta: 'Why Choose Fairview', photo: img('1544717305-2782549b5136', 800, 560) },
  { title: 'Opens Doors to the World',
    text: 'The IB Diploma is respected by leading universities everywhere. Our graduates leave Fairview with the confidence, curiosity and critical thinking to earn places at top universities across Malaysia, the UK, Australia, the US and beyond.',
    cta: 'See University Pathways', photo: img('1522202176988-66273c2fd55f', 800, 560) },
  { title: 'Is Backed by International Standards',
    text: 'Fairview is an authorised IB World School delivering the full continuum, and a proud deliverer of The Duke of Edinburgh’s International Award. Our standards are set, and independently verified, against the very best in the world.',
    cta: 'Awards & Recognition', photo: img('1509062522246-3755977927d7', 800, 560) },
  { title: 'Feels Like a Community',
    text: 'From sport and the arts at our Dominus Arts Venue to expeditions, service and leadership, Fairview families belong to a warm, diverse community that supports every child — and every parent — at every step.',
    cta: 'Life at Fairview', photo: img('1507924538820-ede94a04019d', 800, 560) },
]

/* ---------- 04 · nurture minds like gardens (navy blocks) ---------- */
export const nurture = [
  { heading: ['We nurture minds like gardens — through ', 'curiosity, compassion', ' and ', 'conversation'],
    body: ['We grow children, we don’t manufacture results. From that freedom to explore comes the confidence to lead, question and contribute.',
      'The result is well-rounded, balanced individuals who realise their considerable potential and go on to shape the world in a positive way.'],
    cta: 'Our Vision & Mission', img: boardingImg, ctaGold: true },
  { heading: ['An environment that ', 'feels like home'],
    body: ['Every Fairview campus is a vibrant, supportive community where students thrive both academically and personally. With a strong emphasis on pastoral care and wellbeing, children learn in a warm environment that encourages independence, collaboration and personal growth.'],
    cta: 'Student Life at Fairview', img: exploreImg, reverse: true },
]

/* ---------- 06 · University destinations (interactive map) ---------- */
export const uniStats = [
  { value: '90%', label: 'Graduates placed at their first-choice university' },
  { value: '100%', label: 'Students supported with personalised careers guidance' },
]
export const uniRegions = [
  { label: 'Europe', key: 'europe' },
  { label: 'Asia', key: 'asia' },
  { label: 'Americas', key: 'americas' },
  { label: 'Oceania', key: 'oceania' },
]
export const uniList = {
  Europe: [
    { country: 'United Kingdom', schools: ['University of Cambridge', 'Imperial College London', 'University College London', 'The University of Edinburgh', 'University of Warwick', 'University of Manchester'] },
    { country: 'Ireland', schools: ['Trinity College Dublin', 'Royal College of Surgeons Ireland'] },
    { country: 'Netherlands', schools: ['Delft University of Technology'] },
  ],
  Asia: [
    { country: 'Singapore', schools: ['National University of Singapore', 'Nanyang Technological University'] },
    { country: 'Hong Kong', schools: ['The University of Hong Kong', 'HKUST'] },
    { country: 'Malaysia', schools: ['Taylor’s University', 'Monash University Malaysia', 'Sunway University'] },
  ],
  Americas: [
    { country: 'United States', schools: ['University of California, Berkeley', 'Purdue University', 'Boston University'] },
    { country: 'Canada', schools: ['University of Toronto', 'University of British Columbia', 'McGill University'] },
  ],
  Oceania: [
    { country: 'Australia', schools: ['University of Melbourne', 'University of Sydney', 'Monash University', 'UNSW Sydney'] },
    { country: 'New Zealand', schools: ['University of Auckland'] },
  ],
}

/* ---------- 07 · IB Learner Profile wheel ---------- */
export const skills = [
  { key: 'Thinkers', color: '#00243e',
    blurb: 'Thinking deeply, questioning and problem-solving: “I lead my learning by asking, researching and reasoning things through for myself.”',
    items: [
      { title: 'Inquirers', text: 'Nurturing curiosity and the skills to research, question and learn independently.' },
      { title: 'Knowledgeable', text: 'Exploring concepts and ideas of local and global significance.' },
      { title: 'Critical thinking', text: 'Making sense of information, solving problems and making smart decisions.' },
    ] },
  { key: 'Communicators', color: '#004271',
    blurb: 'Sharing ideas with clarity and confidence: “I express myself in more than one language and truly listen to others.”',
    items: [
      { title: 'Communicators', text: 'Expressing ideas confidently in more than one language and in many ways.' },
      { title: 'Open-minded', text: 'Appreciating our own cultures and valuing the perspectives of others.' },
    ] },
  { key: 'Principled', color: '#ec8500',
    blurb: 'Acting with integrity and care: “I do the right thing and take responsibility for my actions and their consequences.”',
    items: [
      { title: 'Principled', text: 'Acting with integrity, honesty and a strong sense of fairness.' },
      { title: 'Caring', text: 'Showing empathy, compassion and respect in service to others.' },
    ] },
  { key: 'Balanced', color: '#f4b333',
    blurb: 'Nurturing the whole self: “I look after my mind, body and heart, and support the wellbeing of those around me.”',
    items: [
      { title: 'Balanced', text: 'Understanding the importance of intellectual, physical and emotional wellbeing.' },
      { title: 'Reflective', text: 'Thoughtfully considering our learning, strengths and areas to grow.' },
    ] },
  { key: 'Courageous', color: '#f4b333',
    blurb: 'Growing through challenge: “I approach the unfamiliar with resourcefulness, resilience and belief in myself.”',
    items: [
      { title: 'Risk-takers', text: 'Approaching uncertainty with forethought, resourcefulness and resilience.' },
      { title: 'Self-belief', text: 'Trusting in your own abilities to grow, learn and go further.' },
    ] },
]

/* ---------- 08 · Breakthrough stories (testimonials) ---------- */
export const testimonials = [
  { quote: 'At Fairview I was encouraged to ask questions no one had answered yet. That curiosity is what got me into medical school.',
    name: 'Aisyah Rahman', role: 'Fairview Kuala Lumpur · IB Diploma graduate, future doctor',
    photo: img('1576091160550-2173dba999ef', 900, 700), avatar: img('1544005313-94ddf0286df2', 120, 120) },
  { quote: 'My teachers saw the leader in me before I did. Fairview gave me the confidence to reach for goals I once thought impossible.',
    name: 'Daniel Lim', role: 'Fairview Subang · Head Student, aspiring aerospace engineer',
    photo: img('1509062522246-3755977927d7', 900, 700), avatar: img('1500648767791-00dcc994a43e', 120, 120) },
  { quote: 'We wanted a school where our daughter felt happy, supported and challenged. Three years on, she is thriving — and so are we.',
    name: 'The Menon Family', role: 'Fairview Penang · Parents of a Middle Years student',
    photo: img('1524250502761-1ac6f2e30d43', 900, 700), avatar: img('1438761681033-6461ffad8d80', 120, 120) },
]

/* ---------- 09 · Choose your campus ---------- */
export const campuses = [
  { name: 'Fairview Kuala Lumpur', place: 'Wangsa Maju, Kuala Lumpur', ages: '3–19 years',
    tags: ['Flagship Campus', 'IB Continuum', 'Since 1978'], photo: img('1580582932707-520aed937b7b', 600, 400) },
  { name: 'Fairview Subang', place: 'Subang Jaya, Selangor', ages: '3–19 years',
    tags: ['IB Continuum', 'STEM Focus'], photo: img('1562774053-701939374585', 600, 400) },
  { name: 'Fairview Ipoh', place: 'Ipoh, Perak', ages: '3–19 years',
    tags: ['IB Continuum', 'Boarding Available'], photo: img('1577896851231-70ef18881754', 600, 400) },
  { name: 'Fairview Penang', place: 'Bukit Mertajam, Penang', ages: '3–19 years',
    tags: ['IB Continuum', 'Foundation in Music'], photo: img('1544717305-2782549b5136', 600, 400) },
  { name: 'Fairview Johor', place: 'Johor Bahru, Johor', ages: '3–19 years',
    tags: ['IB Continuum', 'Early Years'], photo: img('1533105079780-92b9be482077', 600, 400) },
  { name: 'Dominus Arts & Eduresort', place: 'Port Dickson, Negeri Sembilan', ages: 'All ages',
    tags: ['Arts Venue', 'Expeditions'], photo: img('1507924538820-ede94a04019d', 600, 400) },
]

/* ---------- 10 · Newsroom ---------- */
export const news = [
  { date: 'Jul 18 2026', tag: 'Results', featured: true,
    title: 'Fairview graduates celebrate record university offers from the UK, Australia and beyond',
    photo: img('1523240795612-9a054b0db644', 800, 520) },
  { date: 'Jul 9 2026', tag: 'Academics',
    title: 'IB Diploma results 2026: Fairview students once again outperform the global average',
    photo: img('1543269865-cbf427effbad', 500, 320) },
  { date: 'Jun 27 2026', tag: 'Community',
    title: 'Dominus Arts Venue hosts our largest-ever student showcase across music and drama',
    photo: img('1511671782779-c97d3d27a1d4', 500, 320) },
]

/* ---------- footer ---------- */
export const accreditations = ['IB World School', 'PYP · MYP · DP', 'Cambridge International', 'Duke of Edinburgh’s Award', 'Council of International Schools', 'AMCIS']
export const footerSchools = ['Fairview Kuala Lumpur', 'Fairview Subang', 'Fairview Ipoh', 'Fairview Penang', 'Fairview Johor', 'Dominus Arts Venue']
