// DANMEDY Medical Web App Configuration
// Complete configuration for the medical appointment booking system

export interface SiteConfig {
  language: string;
  title: string;
  description: string;
}

export const siteConfig: SiteConfig = {
  language: "en",
  title: "DANMEDY - Advanced Medical Care",
  description: "Book appointments with top doctors, get AI-powered health insights, and experience healthcare reimagined through technology and compassion.",
};

// Navigation configuration
export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationConfig {
  logo: string;
  links: NavLink[];
  contactLabel: string;
  contactHref: string;
}

export const navigationConfig: NavigationConfig = {
  logo: "DANMEDY",
  links: [
    { label: "Home", href: "#hero" },
    { label: "Services", href: "#services" },
    { label: "Doctors", href: "#doctors" },
    { label: "About", href: "#about" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],
  contactLabel: "Book Now",
  contactHref: "#booking",
};

// Hero section configuration
export interface HeroConfig {
  name: string;
  roles: string[];
  backgroundImage: string;
  badge: string;
  heading: string;
  subheading: string;
  cta: string;
}

export const heroConfig: HeroConfig = {
  name: "DANMEDY",
  roles: ["Healthcare", "Excellence"],
  backgroundImage: "/images/hero-bg.jpg",
  badge: "WELCOME TO DANMEDY",
  heading: "Advanced Medical Care for Everyone",
  subheading: "Experience healthcare reimagined through technology and compassion. Book appointments with top specialists anytime, anywhere.",
  cta: "Book Appointment",
};

// About section configuration
export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutImage {
  src: string;
  alt: string;
}

export interface AboutConfig {
  label: string;
  description: string;
  experienceValue: string;
  experienceLabel: string;
  stats: AboutStat[];
  images: AboutImage[];
}

export const aboutConfig: AboutConfig = {
  label: "About Us",
  description: "DANMEDY is a leading healthcare platform dedicated to providing patient-centered medical services. We combine cutting-edge technology with compassionate care to deliver an unparalleled healthcare experience. Our network of experienced specialists spans across multiple disciplines, ensuring comprehensive care for you and your family.",
  experienceValue: "25+",
  experienceLabel: "Years of\nExperience",
  stats: [
    { value: "50+", label: "Specialist Doctors" },
    { value: "100k+", label: "Patients Served" },
    { value: "99%", label: "Satisfaction Rate" },
  ],
  images: [
    { src: "/images/about.jpg", alt: "Medical Team" },
  ],
};

// Services section configuration
export interface ServiceItem {
  iconName: string;
  title: string;
  description: string;
  image: string;
}

export interface ServicesConfig {
  label: string;
  heading: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  label: "Our Services",
  heading: "Comprehensive Medical Services",
  services: [
    {
      iconName: "Heart",
      title: "Cardiology",
      description: "Expert heart care with advanced diagnostics and treatment options for all cardiac conditions.",
      image: "/images/doctor-1.jpg",
    },
    {
      iconName: "Brain",
      title: "Neurology",
      description: "Comprehensive neurological care for brain, spine, and nervous system disorders.",
      image: "/images/doctor-2.jpg",
    },
    {
      iconName: "Smile",
      title: "Dentistry",
      description: "Complete dental care from routine checkups to advanced cosmetic procedures.",
      image: "/images/doctor-3.jpg",
    },
    {
      iconName: "Bone",
      title: "Orthopedics",
      description: "Specialized care for bones, joints, and muscles to keep you moving.",
      image: "/images/doctor-4.jpg",
    },
    {
      iconName: "Baby",
      title: "Pediatrics",
      description: "Gentle, compassionate healthcare for infants, children, and adolescents.",
      image: "/images/doctor-5.jpg",
    },
    {
      iconName: "Sparkles",
      title: "Dermatology",
      description: "Advanced skin care treatments for medical and cosmetic dermatology needs.",
      image: "/images/doctor-6.jpg",
    },
    {
      iconName: "Activity",
      title: "Physiotherapy",
      description: "Rehabilitation and physical therapy to restore movement and reduce pain.",
      image: "/images/doctor-7.jpg",
    },
    {
      iconName: "Eye",
      title: "Ophthalmology",
      description: "Complete eye care services from vision tests to advanced surgical procedures.",
      image: "/images/doctor-8.jpg",
    },
  ],
};

// Doctors section configuration
export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  image: string;
  rating: number;
  reviews: number;
  availability: string[];
  about: string;
}

export interface DoctorsConfig {
  label: string;
  heading: string;
  description: string;
  doctors: Doctor[];
}

export const doctorsConfig: DoctorsConfig = {
  label: "Our Doctors",
  heading: "Meet Our Specialists",
  description: "Our team of experienced doctors is dedicated to providing you with the highest quality healthcare services.",
  doctors: [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      experience: "15 years",
      image: "/images/doctor-1.jpg",
      rating: 4.9,
      reviews: 328,
      availability: ["Mon", "Wed", "Fri"],
      about: "Dr. Johnson is a board-certified cardiologist specializing in preventive cardiology and heart failure management.",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurosurgeon",
      experience: "20 years",
      image: "/images/doctor-2.jpg",
      rating: 4.8,
      reviews: 256,
      availability: ["Tue", "Thu", "Sat"],
      about: "Dr. Chen is an experienced neurosurgeon with expertise in minimally invasive brain and spine surgery.",
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialty: "Dentist",
      experience: "10 years",
      image: "/images/doctor-3.jpg",
      rating: 4.9,
      reviews: 412,
      availability: ["Mon", "Tue", "Thu", "Fri"],
      about: "Dr. Davis provides comprehensive dental care with a gentle touch and modern techniques.",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Orthopedic Surgeon",
      experience: "18 years",
      image: "/images/doctor-4.jpg",
      rating: 4.7,
      reviews: 189,
      availability: ["Wed", "Thu", "Fri"],
      about: "Dr. Wilson specializes in sports medicine and joint replacement surgery.",
    },
    {
      id: 5,
      name: "Dr. Amanda Roberts",
      specialty: "Pediatrician",
      experience: "12 years",
      image: "/images/doctor-5.jpg",
      rating: 4.9,
      reviews: 567,
      availability: ["Mon", "Wed", "Fri", "Sat"],
      about: "Dr. Roberts is passionate about children's health and developmental care.",
    },
    {
      id: 6,
      name: "Dr. David Miller",
      specialty: "Dermatologist",
      experience: "14 years",
      image: "/images/doctor-6.jpg",
      rating: 4.8,
      reviews: 298,
      availability: ["Tue", "Wed", "Thu"],
      about: "Dr. Miller offers advanced treatments for skin conditions and cosmetic dermatology.",
    },
    {
      id: 7,
      name: "Dr. Lisa Thompson",
      specialty: "Physiotherapist",
      experience: "11 years",
      image: "/images/doctor-7.jpg",
      rating: 4.9,
      reviews: 234,
      availability: ["Mon", "Tue", "Thu", "Sat"],
      about: "Dr. Thompson helps patients recover mobility and manage pain through personalized therapy.",
    },
    {
      id: 8,
      name: "Dr. Robert Garcia",
      specialty: "Ophthalmologist",
      experience: "22 years",
      image: "/images/doctor-8.jpg",
      rating: 4.8,
      reviews: 312,
      availability: ["Mon", "Wed", "Fri"],
      about: "Dr. Garcia is an expert in cataract surgery and vision correction procedures.",
    },
    {
      id: 9,
      name: "Dr. Jennifer Lee",
      specialty: "Gynecologist",
      experience: "16 years",
      image: "/images/doctor-9.jpg",
      rating: 4.9,
      reviews: 445,
      availability: ["Tue", "Thu", "Fri"],
      about: "Dr. Lee provides compassionate women's health care from adolescence through menopause.",
    },
    {
      id: 10,
      name: "Dr. William Brown",
      specialty: "General Physician",
      experience: "30 years",
      image: "/images/doctor-10.jpg",
      rating: 4.9,
      reviews: 892,
      availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      about: "Dr. Brown is a family medicine specialist dedicated to holistic patient care.",
    },
  ],
};

// Testimonials section configuration
export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  rating: number;
}

export interface TestimonialsConfig {
  label: string;
  heading: string;
  testimonials: TestimonialItem[];
}

export const testimonialsConfig: TestimonialsConfig = {
  label: "Testimonials",
  heading: "What Our Patients Say",
  testimonials: [
    {
      quote: "DANMEDY transformed my healthcare experience. Booking appointments is seamless, and the doctors are incredibly professional. The AI diagnosis feature helped me understand my symptoms before my visit.",
      author: "John Matthews",
      role: "Business Executive",
      company: "",
      image: "/images/testimonial-1.jpg",
      rating: 5,
    },
    {
      quote: "I've been using DANMEDY for my family's healthcare needs for over a year now. The pediatric care my children receive is exceptional, and the online booking saves me so much time.",
      author: "Sarah Anderson",
      role: "Mother of Two",
      company: "",
      image: "/images/testimonial-2.jpg",
      rating: 5,
    },
    {
      quote: "As a senior citizen, I appreciate how DANMEDY makes healthcare accessible. The staff is patient, the facilities are modern, and I always feel well cared for.",
      author: "Margaret Thompson",
      role: "Retired Teacher",
      company: "",
      image: "/images/testimonial-3.jpg",
      rating: 5,
    },
  ],
};

// CTA section configuration
export interface CTAConfig {
  tags: string[];
  heading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  email: string;
  backgroundImage: string;
}

export const ctaConfig: CTAConfig = {
  tags: ["24/7 Available", "Expert Care", "Book Online"],
  heading: "Ready to Take Control of Your Health?",
  description: "Book an appointment with our specialists today and experience healthcare that puts you first. Your health journey starts here.",
  buttonText: "Book Appointment Now",
  buttonHref: "#booking",
  email: "contact@danmedy.com",
  backgroundImage: "/images/contact-bg.jpg",
};

// Blog section configuration
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
}

export interface BlogConfig {
  label: string;
  heading: string;
  posts: BlogPost[];
}

export const blogConfig: BlogConfig = {
  label: "Health Blog",
  heading: "Latest Health Insights",
  posts: [
    {
      id: 1,
      title: "10 Superfoods for a Healthy Heart",
      excerpt: "Discover the power of nutrition in maintaining cardiovascular health with these expert-recommended foods.",
      image: "/images/blog-1.jpg",
      category: "Nutrition",
      date: "Mar 15, 2024",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "The Science of Stress Management",
      excerpt: "Learn effective techniques to manage stress and improve your mental wellbeing through mindfulness and meditation.",
      image: "/images/blog-2.jpg",
      category: "Mental Health",
      date: "Mar 10, 2024",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "Why Regular Health Checkups Matter",
      excerpt: "Preventive care is the key to long-term health. Understand the importance of routine medical examinations.",
      image: "/images/blog-3.jpg",
      category: "Preventive Care",
      date: "Mar 5, 2024",
      readTime: "4 min read",
    },
  ],
};

// Footer section configuration
export interface FooterLinkColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface SocialLink {
  iconName: string;
  href: string;
  label: string;
}

export interface FooterConfig {
  logo: string;
  description: string;
  columns: FooterLinkColumn[];
  socialLinks: SocialLink[];
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterButtonText: string;
  newsletterPlaceholder: string;
  copyright: string;
  credit: string;
}

export const footerConfig: FooterConfig = {
  logo: "DANMEDY",
  description: "Advanced medical care meets digital innovation. Your health, our priority.",
  columns: [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "#hero" },
        { label: "Services", href: "#services" },
        { label: "Doctors", href: "#doctors" },
        { label: "About Us", href: "#about" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Cardiology", href: "#services" },
        { label: "Neurology", href: "#services" },
        { label: "Dentistry", href: "#services" },
        { label: "Orthopedics", href: "#services" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", href: "#contact" },
        { label: "FAQs", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ],
    },
  ],
  socialLinks: [
    { iconName: "Facebook", href: "#", label: "Facebook" },
    { iconName: "Twitter", href: "#", label: "Twitter" },
    { iconName: "Instagram", href: "#", label: "Instagram" },
    { iconName: "Linkedin", href: "#", label: "LinkedIn" },
  ],
  newsletterHeading: "Stay Updated",
  newsletterDescription: "Subscribe to our newsletter for health tips and updates.",
  newsletterButtonText: "Subscribe",
  newsletterPlaceholder: "Enter your email",
  copyright: "© 2024 DANMEDY. All rights reserved.",
  credit: "Your Health, Our Priority",
};

// Features/Why Choose Us configuration
export interface Feature {
  iconName: string;
  title: string;
  description: string;
}

export interface FeaturesConfig {
  label: string;
  heading: string;
  features: Feature[];
}

export const featuresConfig: FeaturesConfig = {
  label: "Why Choose Us",
  heading: "Why DANMEDY Stands Out",
  features: [
    {
      iconName: "Clock",
      title: "24/7 Emergency",
      description: "Round-the-clock emergency services for urgent medical needs.",
    },
    {
      iconName: "UserCheck",
      title: "Expert Doctors",
      description: "Board-certified specialists with years of experience.",
    },
    {
      iconName: "Monitor",
      title: "Modern Equipment",
      description: "State-of-the-art medical technology for accurate diagnosis.",
    },
    {
      iconName: "Heart",
      title: "Patient First",
      description: "Personalized care focused on your unique health needs.",
    },
    {
      iconName: "Wallet",
      title: "Affordable Care",
      description: "Quality healthcare at competitive prices.",
    },
    {
      iconName: "MessageCircle",
      title: "Online Support",
      description: "24/7 online consultation and support services.",
    },
  ],
};

// AI Diagnosis configuration
export interface AIDiagnosisConfig {
  label: string;
  heading: string;
  description: string;
  vitals: {
    name: string;
    unit: string;
    min: number;
    max: number;
    normal: string;
  }[];
}

export const aiDiagnosisConfig: AIDiagnosisConfig = {
  label: "AI Health Check",
  heading: "AI-Powered Vital Check",
  description: "Enter your vital signs below and our AI system will provide preliminary health insights. Note: This is not a substitute for professional medical advice.",
  vitals: [
    { name: "Heart Rate", unit: "bpm", min: 40, max: 200, normal: "60-100" },
    { name: "Blood Pressure Systolic", unit: "mmHg", min: 70, max: 220, normal: "90-120" },
    { name: "Blood Pressure Diastolic", unit: "mmHg", min: 40, max: 140, normal: "60-80" },
    { name: "Temperature", unit: "°C", min: 35, max: 42, normal: "36.1-37.2" },
    { name: "Oxygen Saturation", unit: "%", min: 70, max: 100, normal: "95-100" },
    { name: "Respiratory Rate", unit: "breaths/min", min: 8, max: 40, normal: "12-20" },
  ],
};
