import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const Home = () => {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  const heroSlides = [
    {
      headline: "Enjoy the gift of unlimited learning",
      description: "Get 40% off access to 10,000+ programs from Google, Adobe, IBM, Microsoft, and more.",
      ctaText: "Get LocalSkill Plus",
      ctaLink: "/premium",
      backgroundColor: "bg-hero-light-green",
      textColor: "text-text-primary",
      eyebrowImage: "https://images.ctfassets.net/00atxywtfxvd/7rJLBhLIFG5ZTss6mYJ2vj/6040ccb86b45a0f0deb1a16d1f42b35c/courseraplus-blue.png",
      desktopImage: "https://images.ctfassets.net/00atxywtfxvd/x2ncAFLAjCgG2mPQTiuT1/59d07c69d283d0c9c941212436399be2/Non-NAMER_40-_off_LOHP-Desktop-330x304.png",
      mobileImage: "https://images.ctfassets.net/00atxywtfxvd/gpcRrw5Y0qOaww4liPYpQ/59561d03d750b89b0a7f5065e2b69567/Non-NAMER_40-_off_LOHP-Mobile-242x138.png",
    },
    {
      headline: "Train your team in top skills and join 4,500+ teams worldwide",
      description: "",
      ctaText: "Save 40% off team training",
      ctaLink: "/business/teams",
      backgroundColor: "bg-hero-primary-blue-xxstrong",
      textColor: "text-white",
      eyebrowImage: "https://images.ctfassets.net/00atxywtfxvd/5QULjGwNJ5GSRz4HmpMEsv/46a5520c689eccbc33dd30b9942070f0/coursera_for_business.png",
      desktopImage: "https://images.ctfassets.net/00atxywtfxvd/6eMc1Z2mJMjJa574xDOyfe/32883c1b79ab57ab4620f881058d10e9/WES_40-off_LOHP_Desktop-330x304-Dark.png",
      mobileImage: "https://images.ctfassets.net/00atxywtfxvd/1epCNRu1dx3bINPJjYVyoA/5679f917f00723485f39e0c9fd09ba03/WES_40-off_LOHP_Mobile-242x138-Dark.png",
    },
    {
      headline: "Start, switch, or advance your career",
      description: "Grow with 10,000+ courses from top organizations",
      ctaText: "Join for Free",
      ctaLink: "/register",
      backgroundColor: "bg-hero-tertiary-yellow-xweak",
      textColor: "text-text-primary",
      eyebrowImage: null,
      desktopImage: "https://images.ctfassets.net/00atxywtfxvd/3S3B2Fkv9RzncshAU3v44W/035cedad8f6ab1cc7e9986d0045371e4/JoinForFreeDesktop.png",
      mobileImage: "https://images.ctfassets.net/00atxywtfxvd/58sXhT0eBFnK0e9mLWlX3s/6f85590688efbd2e07a687a54bbbbbb8/JoinForFreeMobile.png",
    },
  ];

  const partners = [
    "Google", "DeepLearning.AI", "Stanford University", "IBM", 
    "University of Pennsylvania", "Microsoft", "University of Michigan", 
    "Meta", "Adobe", "Vanderbilt", "Amazon Web Services"
  ];

  // Category icon components
  const CategoryIcon = ({ name }) => {
    const icons = {
      'Business': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      'Artificial Intelligence': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      'Data Science': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      'Computer Science': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      'Information Technology': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      'Personal Development': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      'Healthcare': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      'Language Learning': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      'Social Sciences': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      'Arts and Humanities': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      'Physical Science and Engineering': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      'Math and Logic': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    };
    return icons[name] || (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    );
  };

  const categories = [
    { name: 'Business' },
    { name: 'Artificial Intelligence' },
    { name: 'Data Science' },
    { name: 'Computer Science' },
    { name: 'Information Technology' },
    { name: 'Personal Development' },
    { name: 'Healthcare' },
    { name: 'Language Learning' },
    { name: 'Social Sciences' },
    { name: 'Arts and Humanities' },
    { name: 'Physical Science and Engineering' },
    { name: 'Math and Logic' },
  ];

  const careerPaths = [
    { title: "Launch a new career", description: "Build job-ready skills" },
    { title: "Gain in-demand skills", description: "Stay ahead of the curve" },
    { title: "Earn a degree", description: "Advance your education" },
  ];

  const whatBringsYou = [
    "Start my career",
    "Change my career",
    "Grow in my current role",
    "Explore topics outside of work",
  ];

  const testimonials = [
    {
      name: "Sarah W.",
      quote: "LocalSkill Exchange's reputation for high-quality content, paired with its flexible structure, made it possible for me to dive into data analytics while managing family, health, and everyday life.",
    },
    {
      name: "Noeris B.",
      quote: "LocalSkill Exchange rebuilt my confidence and showed me I could dream bigger. It wasn't just about gaining knowledge—it was about believing in my potential again.",
    },
    {
      name: "Abdullahi M.",
      quote: "I now feel more prepared to take on leadership roles and have already started mentoring some of my colleagues.",
    },
    {
      name: "Anas A.",
      quote: "Learning with LocalSkill Exchange has expanded my professional expertise by giving me access to cutting-edge research, practical tools, and global perspectives.",
    },
  ];

  const nextSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Keyboard navigation for carousel
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'Home') {
      setCurrentHeroSlide(0);
    } else if (e.key === 'End') {
      setCurrentHeroSlide(heroSlides.length - 1);
    }
  };

  // Preload hero images
  useEffect(() => {
    heroSlides.forEach((slide) => {
      if (slide.desktopImage) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = slide.desktopImage;
        document.head.appendChild(link);
      }
      if (slide.mobileImage) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = slide.mobileImage;
        document.head.appendChild(link);
      }
    });
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white py-12 md:py-16 lg:py-20">
        <div className="max-w-coursera mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-display-sm font-semibold text-center mb-8 md:mb-12 text-text-primary">
            Learn without limits
          </h1>
          
          {/* Hero Carousel */}
          <div 
            className="relative max-w-5xl mx-auto"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label="Hero carousel"
          >
            <div 
              className="overflow-hidden rounded-coursera-xl"
              aria-live="polite"
              aria-atomic="true"
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentHeroSlide * 100}%)` }}
              >
                {heroSlides.map((slide, index) => (
                  <div
                    key={index}
                    className={`min-w-full ${slide.backgroundColor} ${slide.textColor} rounded-coursera-xl p-6 md:p-8 lg:p-12 grid md:grid-cols-2 gap-6 md:gap-8 items-center relative`}
                  >
                    <div className="order-2 md:order-1">
                      {slide.eyebrowImage && (
                        <img 
                          src={slide.eyebrowImage} 
                          alt="" 
                          className="h-5 mb-4"
                        />
                      )}
                      <h2 className="text-2xl md:text-3xl lg:text-title-md font-semibold mb-3 md:mb-4">
                        {slide.headline}
                      </h2>
                      {slide.description && (
                        <p className="text-base md:text-lg mb-6 opacity-90">
                          {slide.description}
                        </p>
                      )}
                      <Link
                        to={slide.ctaLink}
                        className={`btn inline-flex items-center ${
                          slide.textColor === 'text-white' 
                            ? 'bg-white text-hero-primary-blue-xxstrong hover:bg-gray-100' 
                            : 'btn-primary'
                        }`}
                      >
                        {slide.ctaText}
                        <ChevronRightIcon className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                    <div className="order-1 md:order-2 flex justify-center md:justify-end">
                      <img 
                        src={slide.desktopImage} 
                        alt={slide.headline}
                        className="hidden md:block max-w-full h-auto"
                        loading="eager"
                      />
                      <img 
                        src={slide.mobileImage} 
                        alt={slide.headline}
                        className="md:hidden max-w-full h-auto"
                        loading="eager"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-coursera-2 hover:shadow-coursera-3 transition-shadow z-10"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="h-5 w-5 md:h-6 md:w-6 text-text-primary" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-coursera-2 hover:shadow-coursera-3 transition-shadow z-10"
              aria-label="Next slide"
            >
              <ChevronRightIcon className="h-5 w-5 md:h-6 md:w-6 text-text-primary" />
            </button>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHeroSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentHeroSlide
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-neutral-border'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="py-12 md:py-16 bg-neutral-gray">
        <div className="max-w-coursera mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {careerPaths.map((path, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl md:text-2xl font-semibold mb-2 text-text-primary">{path.title}</h3>
                <p className="text-text-secondary">{path.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-coursera mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-12 text-text-primary">
            Learn from 350+ leading universities and companies
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="text-text-secondary font-semibold text-sm md:text-base hover:text-primary transition-colors"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Courses Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-coursera mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-text-primary">
            Trending courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <article key={item} className="card card-hover">
                <div className="h-48 bg-neutral-gray rounded-coursera-lg mb-4 flex items-center justify-center">
                  <img 
                    src="https://via.placeholder.com/300x200?text=Course" 
                    alt={`Course Title ${item}`}
                    className="w-full h-full object-cover rounded-coursera-lg"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-text-primary">
                  Course Title {item}
                </h3>
                <p className="text-sm text-text-secondary mb-2">Instructor Name</p>
                <p className="text-lg font-semibold text-primary">Free</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Categories Section */}
      <section className="py-12 md:py-16 bg-neutral-gray">
        <div className="max-w-coursera mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-12 text-text-primary">
            Explore categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/browse?category=${category.name}`}
                className="card text-center card-hover"
              >
                <article>
                  <div className="flex justify-center mb-3 text-primary">
                    <CategoryIcon name={category.name} />
                  </div>
                  <h3 className="font-semibold text-text-primary">{category.name}</h3>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What brings you to LocalSkill Exchange Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-coursera mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-12 text-text-primary">
            What brings you to LocalSkill Exchange today?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {whatBringsYou.map((option, index) => (
              <button
                key={index}
                className="card card-hover text-left p-6"
              >
                <h3 className="font-semibold text-text-primary">{option}</h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Most Popular by Category Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-coursera mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-text-primary">
            Most popular by category
          </h2>
          <div className="space-y-12">
            {categories.slice(0, 4).map((category) => (
              <div key={category.name}>
                <h3 className="text-xl md:text-2xl font-semibold mb-6 text-text-primary">
                  {category.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((item) => (
                    <article key={item} className="card card-hover">
                      <div className="h-48 bg-neutral-gray rounded-coursera-lg mb-4 flex items-center justify-center">
                        <img 
                          src="https://via.placeholder.com/300x200?text=Course" 
                          alt={`${category.name} Course ${item}`}
                          className="w-full h-full object-cover rounded-coursera-lg"
                          loading="lazy"
                        />
                      </div>
                      <h4 className="text-lg font-semibold mb-2 text-text-primary">
                        {category.name} Course {item}
                      </h4>
                      <p className="text-sm text-text-secondary mb-2">Instructor Name</p>
                      <p className="text-lg font-semibold text-primary">Free</p>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-neutral-gray">
        <div className="max-w-coursera mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-12 text-text-primary">
            Why people choose LocalSkill Exchange
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <article key={index} className="card">
                <p className="text-text-secondary mb-4 italic">"{testimonial.quote}"</p>
                <p className="font-semibold text-text-primary">— {testimonial.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary text-white">
        <div className="max-w-coursera mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Ready to Get Started?</h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join thousands of learners and teachers in your community
          </p>
          <Link to="/register" className="btn bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg">
            Join for Free
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
