import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next"

import Header from "../components/header"
import Seo from "../components/seo"
import Footer from "../components/footer"
import RootRedirect from "../components/rootRedirect"

const IndexPage = ({ pageContext }) => {
  const { t } = useTranslation();
  const { language: currentLanguage } = useI18next();
  
  // Use the language from useI18next or fallback to pageContext
  const language = currentLanguage || pageContext?.i18n?.language || 'en';
  
  // Improved root redirect logic
  const isRootPath = typeof window !== 'undefined' && 
                    (window.location.pathname === '/' || 
                     window.location.pathname === '/en/' || 
                     window.location.pathname === '/de/');
  
  const needsRedirect = isRootPath && window.location.pathname === '/';
  
  // Use the language in a console log to avoid the unused variable warning
  React.useEffect(() => {
    console.log(`Current language: ${language}`);
  }, [language]);
  
  return (
  <div className="flex flex-col min-h-screen overflow-x-hidden">
    {/* Only include RootRedirect when at the exact root path */}
    {needsRedirect && <RootRedirect />}
    
    {/* Add back the header with dynamic site title based on language */}
    <Header siteTitle={t("Your Company")} />
    
    {/* Hero Section - Full width and height with logo overlay */}
    <section id="home" className="relative w-full h-screen bg-gradient-to-r from-blue-500 via-black to-purple-600 flex items-center justify-center" 
      style={{ 
        backgroundImage: "linear-gradient(to right, rgba(59, 130, 246, 0.9) 0%, rgba(59, 130, 246, 0.6) 15%, rgba(0, 0, 0, 0.95) 50%, rgba(147, 51, 234, 0.6) 85%, rgba(147, 51, 234, 0.9) 100%)" 
      }}>
      {/* Overlay with slightly reduced opacity to let the gradient show through */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="z-10 text-center px-4">
        <StaticImage
          src="../images/logo-1.png"
          loading="eager"
          width={220}
          quality={95}
          formats={["auto", "webp", "avif"]}
          alt="Company Logo"
          className="mx-auto mb-8"
        />
        <h1 className="text-5xl font-bold text-white mb-4">{t("Welcome to Our Website")}</h1>
        <p className="text-xl text-white mb-8">{t("Your vision, our expertise – Building amazing experiences")}</p>
        <a href="#contact" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transition duration-300 inline-block no-underline">
          {t("Get Started")}
        </a>
      </div>
    </section>

    {/* Full-width content section that isn't constrained by Layout */}
    <div className="w-full">
      {/* Alternating Content Rows - Full Width with wider content */}
      <section className="w-full">
        {/* Row 1 */}
        <div id="mission" className="w-full bg-gray-50 py-20">
          <div className="w-full px-6 mx-auto flex flex-col md:flex-row items-center" style={{ maxWidth: "95%" }}>
            <div className="md:w-1/2 md:pr-10 lg:pr-16 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">{t("Our Mission")}</h2>
              <p className="text-gray-600 mb-6">
                {t("We strive to deliver exceptional digital experiences that transform businesses and delight users. Our team combines creativity with technical expertise to build solutions that stand out.")}
              </p>
              <Link to="/about" className="text-blue-600 font-semibold hover:underline">{t("Learn more →")}</Link>
            </div>
            <div className="md:w-1/2">
              <StaticImage
                src="../images/example.png"
                alt="Mission"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div id="services" className="w-full bg-white py-20">
          <div className="w-full px-6 mx-auto flex flex-col md:flex-row-reverse items-center" style={{ maxWidth: "95%" }}>
            <div className="md:w-1/2 md:pl-10 lg:pl-16 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">{t("Our Services")}</h2>
              <p className="text-gray-600 mb-6">
                {t("From website development to full-scale digital transformation, we offer a range of services tailored to meet your unique business needs and goals.")}
              </p>
              <Link to="/services" className="text-blue-600 font-semibold hover:underline">{t("View services →")}</Link>
            </div>
            <div className="md:w-1/2">
              <StaticImage
                src="../images/example.png"
                alt="Services"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div id="projects" className="w-full bg-gray-50 py-20">
          <div className="w-full px-6 mx-auto flex flex-col md:flex-row items-center" style={{ maxWidth: "95%" }}>
            <div className="md:w-1/2 md:pr-10 lg:pr-16 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">{t("Our Projects")}</h2>
              <p className="text-gray-600 mb-6">
                {t("Browse our portfolio to see how we've helped businesses like yours achieve their digital goals. Each project represents our commitment to excellence and innovation.")}
              </p>
              <Link to="/projects" className="text-blue-600 font-semibold hover:underline">{t("See portfolio →")}</Link>
            </div>
            <div className="md:w-1/2">
              <StaticImage
                src="../images/example.png"
                alt="Projects"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
        
        {/* Contact Form Section */}
        <div id="contact" className="w-full bg-blue-50 py-20">
          <div className="w-full px-6 mx-auto" style={{ maxWidth: "95%" }}>
            <h2 className="text-4xl font-bold text-center mb-12">{t("Get In Touch")}</h2>
            
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 bg-blue-600 text-white p-8">
                  <h3 className="text-2xl font-bold mb-4">{t("Contact Information")}</h3>
                  <p className="mb-6">{t("Fill out the form and our team will get back to you within 24 hours.")}</p>
                  
                  <div className="flex items-center mb-6">
                    <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>(123) 456-7890</span>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>info@example.com</span>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>123 Web Street, Digital City, DC 12345</span>
                  </div>
                </div>
                
                <div className="md:w-1/2 p-8">
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{t("Full Name")}</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder={t("John Doe")} 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t("Email")}</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder={t("john@example.com")} 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">{t("Subject")}</label>
                      <input 
                        type="text" 
                        id="subject" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder={t("How can we help you?")} 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">{t("Message")}</label>
                      <textarea 
                        id="message" 
                        rows="4" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder={t("Your message here...")}
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
                    >
                      {t("Send Message")}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  </div>
)};

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;

export const Head = () => <Seo title="Home" />

export default IndexPage
