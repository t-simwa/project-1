import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const navigate = useNavigate();
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
    { title: "Launch a new career", href: "/career-academy", image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/92c4547dc4ee8b3cf2803fa0f315bd74.svg?auto=format%2Ccompress&dpr=1" },
    { title: "Gain in-demand skills", href: "/browse", image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/3965428b288078a92c4e881713caee10.svg?auto=format%2Ccompress&dpr=1" },
    { title: "Earn a degree", href: "/degrees", image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/c7f7f2f130d025a6b86eb174d31d47db.svg?auto=format%2Ccompress&dpr=1" },
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

  const nextSlide = useCallback(() => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [nextSlide]);

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
      {/* Modern Hero Carousel Section */}
      <section 
        className="relative pt-4 md:pt-6 lg:pt-8 pb-4 md:pb-6 lg:pb-8"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Hero carousel"
      >
        {/* Outer Container - matches header width - Change width value below (use '100%' for responsive, or specific px value) */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ width: '3000px', maxWidth: '100%' }}>
          {/* Inner Container - carousel content area - Change width value below */}
          <div className="relative h-[276px] md:h-[304px]" style={{ width: '3000px', maxWidth: '100%' }}>
          {/* Carousel Slides */}
          <div className="relative w-full h-full">
            {heroSlides.map((slide, index) => {
              const isActive = index === currentHeroSlide;
              const slideClasses = `
                absolute inset-0 transition-all duration-700 ease-in-out
                ${isActive ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-4 z-0'}
              `;

              // Determine card class based on slide index (matching Coursera)
              const cardClass = index === 0 ? "css-9evtfe" : index === 1 ? "css-1ga2jkv" : "css-gobzba";

              return (
                  <div
                    key={index}
                  className={slideClasses}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${index + 1} of ${heroSlides.length}`}
                  >
                  <div className="css-1odq4va">
                    <div className={cardClass}>
                      {/* Text Content Section */}
                      <div className="css-l88zs4">
                      {slide.eyebrowImage && (
                          <div>
                        <img 
                          src={slide.eyebrowImage} 
                          alt="" 
                              style={{maxWidth: '100%', maxHeight: '20px', height: 'auto', borderRadius: 0}}
                        />
                          </div>
                      )}
                        <h2 className="css-4fk9z4">{slide.headline}</h2>
                      {slide.description && (
                          <p className="css-1rcwhif">{slide.description}</p>
                        )}
                        <div>
                          {index === 2 ? (
                            <button
                              onClick={() => navigate(slide.ctaLink)}
                              className="cds-149 cds-button-disableElevation cds-button-primary css-1s18ihl"
                              tabIndex={0}
                              role="button"
                              type="button"
                            >
                              <span className="cds-button-label">
                                {slide.ctaText}
                                <span className="cds-button-endIcon">
                                  <svg aria-hidden="true" fill="none" focusable="false" height="20" viewBox="0 0 20 20" width="20" className="css-1u8qly9">
                                    <path d="M13.125 10.75H4.75a.728.728 0 01-.535-.214.72.72 0 01-.215-.532c0-.21.072-.39.215-.535a.72.72 0 01.535-.219h8.375L9.454 5.579a.721.721 0 01-.225-.527c0-.201.077-.382.23-.541a.745.745 0 011.058.006l4.954 4.96a.722.722 0 01.216.526.76.76 0 01-.052.282.692.692 0 01-.156.236l-4.958 4.958a.681.681 0 01-.521.219.776.776 0 01-.52-.23.766.766 0 01-.23-.544.71.71 0 01.23-.528l3.645-3.646z" fill="currentColor"></path>
                                  </svg>
                                </span>
                              </span>
                            </button>
                          ) : (
                      <Link
                        to={slide.ctaLink}
                              className={`cds-149 cds-button-disableElevation ${index === 0 ? 'cds-button-primary css-1oi65e9' : 'cds-button-secondary css-1q0pagw'}`}
                              tabIndex={0}
                            >
                              <span className="cds-button-label">
                        {slide.ctaText}
                                <span className="cds-button-endIcon">
                                  <svg aria-hidden="true" fill="none" focusable="false" height="20" viewBox="0 0 20 20" width="20" className="css-1u8qly9">
                                    <path d="M13.125 10.75H4.75a.728.728 0 01-.535-.214.72.72 0 01-.215-.532c0-.21.072-.39.215-.535a.72.72 0 01.535-.219h8.375L9.454 5.579a.721.721 0 01-.225-.527c0-.201.077-.382.23-.541a.745.745 0 011.058.006l4.954 4.96a.722.722 0 01.216.526.76.76 0 01-.052.282.692.692 0 01-.156.236l-4.958 4.958a.681.681 0 01-.521.219.776.776 0 01-.52-.23.766.766 0 01-.23-.544.71.71 0 01.23-.528l3.645-3.646z" fill="currentColor"></path>
                                  </svg>
                                </span>
                              </span>
                      </Link>
                          )}
                        </div>
                    </div>

                      {/* Desktop Image */}
                      <div className="css-1g0whav">
                      <img 
                        src={slide.desktopImage} 
                        alt={slide.headline}
                          style={{maxWidth: '100%', maxHeight: '608px', height: 'auto', borderRadius: 0}}
                      />
                      </div>

                      {/* Mobile Image */}
                      <div className="css-gm91l9">
                      <img 
                        src={slide.mobileImage} 
                        alt={slide.headline}
                          style={{maxWidth: '100%', maxHeight: '276px', height: 'auto', borderRadius: 0}}
                      />
                      </div>
                    </div>
                  </div>
              </div>
              );
            })}
            </div>
            
          {/* Navigation Arrows - Outside Carousel */}
            <button
              onClick={prevSlide}
            className={`
              absolute -left-4 md:-left-6 lg:-left-8 top-1/2 -translate-y-1/2 z-30
              flex items-center justify-center
              transition-all duration-300
              hover:opacity-80 hover:scale-110
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded
              ${currentHeroSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
            `}
              aria-label="Previous slide"
            disabled={currentHeroSlide === 0}
            >
            <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
            </button>

            <button
              onClick={nextSlide}
            className={`
              absolute -right-4 md:-right-6 lg:-right-8 top-1/2 -translate-y-1/2 z-30
              flex items-center justify-center
              transition-all duration-300
              hover:opacity-80 hover:scale-110
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded
              ${currentHeroSlide === heroSlides.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
            `}
              aria-label="Next slide"
            disabled={currentHeroSlide === heroSlides.length - 1}
            >
            <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
            </button>
            
          {/* Pagination Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHeroSlide(index)}
                className={`
                  transition-all duration-300 rounded-full
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${index === currentHeroSlide
                    ? 'w-10 h-3 bg-blue-600 shadow-lg scale-110'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 hover:scale-110'
                  }
                `}
                  aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentHeroSlide ? 'true' : 'false'}
                />
              ))}
            </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 z-20">
            <div 
              className="h-full bg-blue-600 transition-all duration-5000 ease-linear"
              style={{ 
                width: `${((currentHeroSlide + 1) / heroSlides.length) * 100}%`,
                transition: 'width 5s linear'
              }}
            />
          </div>
          </div>
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="css-dwgey1">
        <div className="cds-1 css-1cxrrkn cds-2 cds-7">
          <div className="cds-9 css-1kspkkz cds-10">
            <div className="cds-9 css-nx9yyw cds-11 cds-grid-item cds-56">
              <div data-testid="overflow-carousel" className="css-19emm9i">
                <div className="css-tnzxuv">
                  <div className="css-hn3k99" data-testid="overflow-carousel-content" role="list">
                    {careerPaths.map((path, index) => (
                      <div key={index} role="listitem">
                        <div className="css-2rvn9v">
                          <a className="cds-119 cds-113 cds-115 css-dc4cli cds-142" href={path.href}>
                            <div data-testid="visually-hidden" className="css-1whdyhf">{path.title}</div>
                            <h2 className="css-1gcty4z" aria-hidden="true">{path.title}</h2>
                            <img 
                              src={path.image} 
                              srcSet={`${path.image}?auto=format%2Ccompress&dpr=2 2x, ${path.image}?auto=format%2Ccompress&dpr=3 3x`}
                              className="css-11x1h9e" 
                              alt=""
                            />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="cds-149 css-hsnj4e" tabIndex={-1} type="button">
                  <svg aria-hidden="true" fill="none" focusable="false" height="24" viewBox="0 0 20 20" width="24" className="css-1u8qly9">
                    <path d="M9.125 10l3.417 3.417a.73.73 0 010 1.062.73.73 0 01-1.07-.007l-3.951-3.951a.755.755 0 01-.208-.525c0-.1.017-.194.052-.281a.691.691 0 01.156-.236l3.951-3.951a.73.73 0 011.07-.007.73.73 0 010 1.062L9.125 10z" fill="currentColor"></path>
                  </svg>
                  <div data-testid="visually-hidden" className="css-1whdyhf">Previous</div>
                </button>
                <button className="cds-149 css-upj1ld" tabIndex={-1} type="button">
                  <svg aria-hidden="true" fill="none" focusable="false" height="24" viewBox="0 0 20 20" width="24" className="css-1u8qly9">
                    <path d="M10.875 10L7.458 6.583a.73.73 0 010-1.062.73.73 0 011.07.007l3.951 3.951a.756.756 0 01.208.525.69.69 0 01-.208.517l-3.951 3.951a.693.693 0 01-.528.226.759.759 0 01-.52-.24.73.73 0 010-1.062L10.874 10z" fill="currentColor"></path>
                  </svg>
                  <div data-testid="visually-hidden" className="css-1whdyhf">Next</div>
                </button>
              </div>
            </div>
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
