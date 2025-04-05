import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const ServicesPage = () => {
  const { t } = useTranslation();
  
  // Create ref for header section
  const heroSectionRef = useRef(null);
  
  // Effect to ensure proper positioning below header
  useEffect(() => {
    // This runs after component mounts and ensures the content is positioned correctly
    const fixHeroPosition = () => {
      if (heroSectionRef.current) {
        // Get header element (adjust the selector if needed)
        const headerElement = document.querySelector('header');
        if (headerElement) {
          // Calculate header height
          const headerHeight = headerElement.offsetHeight;
          
          // Add significant margin to ensure it's completely below the header
          // Using marginTop instead of paddingTop to avoid affecting internal spacing
          heroSectionRef.current.style.marginTop = `${headerHeight}px`;
        }
      }
    };
    
    // Run immediately, after a short delay, and on resize
    fixHeroPosition();
    
    // Additional timeout calls to ensure we catch the header after any animations or transitions
    const timeoutId1 = setTimeout(fixHeroPosition, 100);
    const timeoutId2 = setTimeout(fixHeroPosition, 300);
    const timeoutId3 = setTimeout(fixHeroPosition, 500);
    
    // Add visibility change detection for when navigating between pages
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fixHeroPosition();
        setTimeout(fixHeroPosition, 200);
      }
    };
    
    window.addEventListener('resize', fixHeroPosition);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', fixHeroPosition);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
    };
  }, []);
  
  // Driving school service data
  const services = [
    {
      id: 1,
      icon: "🚗",
      title: t("Fahrschule – Klassen B, BE & A"),
      description: t("Ob Auto, Anhänger oder Motorrad – wir bilden sicher und zielgerichtet aus. Unsere erfahrenen Fahrlehrer begleiten dich vom ersten Theorieunterricht bis zur erfolgreichen Fahrprüfung."),
      features: [
        t("Ausbildung für PKW (Klasse B), Anhänger (BE) und Motorrad (A)"),
        t("Theorie- und Praxisunterricht mit modernen Fahrzeugen"),
        t("Flexible Fahrstunden & Prüfungsvorbereitung"),
        t("Intensivkurse auf Anfrage")
      ]
    },
    {
      id: 2,
      icon: "🛑",
      title: t("ASF-Kurse (Aufbauseminar für Fahranfänger)"),
      description: t("Pflichtseminar nach dem Führerschein auf Probe – bei uns professionell, verständlich und mit persönlicher Betreuung."),
      features: [
        t("Gesetzlich anerkannt"),
        t("Kompetente Seminarleiter"),
        t("Schnelle Terminvergabe"),
        t("Teilnahmebescheinigung für die Führerscheinstelle")
      ]
    },
    {
      id: 3,
      icon: "⛑",
      title: t("Erste-Hilfe-Kurse"),
      description: t("Lerne in nur einem Tag, wie du im Notfall richtig reagierst – ein Muss für jeden Führerscheinbewerber und wertvoll fürs Leben."),
      features: [
        t("Kompaktkurs (9 Unterrichtseinheiten)"),
        t("Anerkannt für alle Führerscheinklassen"),
        t("Inklusive Sehtest & Passfotos (optional)"),
        t("Zertifikat am Kurstag")
      ]
    },
    {
      id: 4,
      icon: "🔩",
      title: t("Anschlagmittelprüfung"),
      description: t("Sicherheit beginnt bei der Ausrüstung – wir schulen und prüfen den sachgemäßen Umgang mit Anschlagmitteln gemäß DGUV-Richtlinien."),
      features: [
        t("Theoretische und praktische Einweisung"),
        t("Durchführung der jährlichen Prüfung"),
        t("Dokumentation und Prüfprotokolle"),
        t("Für Unternehmen und Einzelpersonen")
      ]
    },
    {
      id: 5,
      icon: "🚛",
      title: t("Berufskraftfahrer-Qualifikation (BKF)"),
      description: t("Pflichtschulungen für Berufskraftfahrer nach BKrFQG: Wir bieten alle 5 Module sowie die beschleunigte Grundqualifikation an."),
      features: [
        t("Module 1–5 gemäß BKrFQG"),
        t("Beschleunigte Grundqualifikation"),
        t("Hochqualifizierte Dozenten aus der Praxis"),
        t("Flexible Terminwahl – auch am Wochenende")
      ]
    },
    {
      id: 6,
      icon: "🏗",
      title: t("Flurförderfahrzeuge & Lang-LKW-Qualifikation"),
      description: t("Wir bereiten Ihre Mitarbeiter optimal auf den sicheren Umgang mit Flurförderzeugen (z. B. Gabelstapler) und Lang-LKWs vor."),
      features: [
        t("Gabelstaplerführerschein gemäß DGUV 308-001"),
        t("Theoretische und praktische Ausbildung"),
        t("Lang-LKW-Schulung inkl. Fahrsimulator-Einsatz"),
        t("Zertifizierter Abschluss")
      ]
    }
  ];

  // Price plans
  const pricePlans = [
    {
      name: t("Führerschein Klasse B"),
      price: "€1.499",
      description: t("Ideal für Fahranfänger"),
      features: [
        t("Theorieunterricht (14 Doppelstunden)"),
        t("Grundfahrstunden (10 Stunden)"),
        t("Überlandfahrt (5 Stunden)"),
        t("Autobahnfahrt (4 Stunden)"),
        t("Nachtfahrt (3 Stunden)")
      ]
    },
    {
      name: t("Führerschein Klasse A"),
      price: "€1.299",
      description: t("Für Motorradbegeisterte"),
      features: [
        t("Theorieunterricht (12 Doppelstunden)"),
        t("Grundfahrstunden (9 Stunden)"),
        t("Überlandfahrt (4 Stunden)"),
        t("Sonderfahrten (3 Stunden)"),
        t("Moderne Motorräder"),
        t("Schutzausrüstung (falls benötigt)")
      ],
      highlighted: true
    },
    {
      name: t("Intensivkurs"),
      price: "€1.899",
      description: t("Für Eilige und Entschlossene"),
      features: [
        t("Führerschein in 3-4 Wochen"),
        t("Täglicher Theorieunterricht"),
        t("Flexible Fahrstundenplanung"),
        t("Prüfungsvorbereitung"),
        t("Erste-Hilfe-Kurs inklusive"),
        t("Vorrangige Prüfungstermine")
      ]
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section - Using a ref and completely revised positioning approach */}
      <section 
        ref={heroSectionRef}
        className="bg-blue-600 text-white py-20"
        style={{ position: 'relative', zIndex: 10 }}
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("Unsere Leistungen")}</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            {t("Wir bieten umfassende Ausbildungen und Qualifikationen für Fahrer aller Klassen – von Fahranfängern bis zu Berufskraftfahrern.")}
          </p>
          <a href="#contact" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-block">
            {t("Beratungsgespräch vereinbaren")}
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{t("Was wir anbieten")}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map(service => (
              <div key={service.id} className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <h4 className="font-medium mb-2">{t("Hauptmerkmale")}:</h4>
                <ul className="space-y-1 text-gray-600 list-disc pl-5">
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{t("Unser Prozess")}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center mb-8 md:mb-0 px-4">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2">{t("Analyse")}</h3>
              <p className="text-gray-600 mx-auto">{t("Wir verstehen Ihre Anforderungen – sei es als Einzelperson oder als Unternehmen.")}</p>
            </div>
            
            <div className="text-center mb-8 md:mb-0 px-4">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2">{t("Planung")}</h3>
              <p className="text-gray-600 mx-auto">{t("Individuelle Schulungspläne, abgestimmt auf Ziel, Zeitrahmen und gesetzliche Vorgaben.")}</p>
            </div>
            
            <div className="text-center mb-8 md:mb-0 px-4">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2">{t("Umsetzung")}</h3>
              <p className="text-gray-600 mx-auto">{t("Unsere erfahrenen Ausbilder setzen moderne Lehrmethoden mit praxisnahen Inhalten ein.")}</p>
            </div>
            
            <div className="text-center px-4">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="text-xl font-semibold mb-2">{t("Abschluss & Support")}</h3>
              <p className="text-gray-600 mx-auto">{t("Zertifikate, Nachbetreuung und weiterführende Qualifikationen – alles aus einer Hand.")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">{t("Preispakete")}</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            {t("Wählen Sie das passende Paket für Ihre Ausbildung. Unsicher, welches das richtige für Sie ist? Kontaktieren Sie uns für eine persönliche Beratung.")}
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {pricePlans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-md p-8 flex-1 max-w-sm relative ${plan.highlighted ? 'border-2 border-blue-500 transform -translate-y-4 md:scale-105' : ''}`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white py-1 px-4 rounded-full text-sm font-semibold">
                    {t("Besonders beliebt")}
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-4">{plan.price}</div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${plan.highlighted ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                >
                  {t("Paket wählen")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{t("Häufig gestellte Fragen")}</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{t("Wie lange dauert die Führerscheinausbildung?")}</h3>
              <p className="text-gray-600">
                {t("Die Dauer der Ausbildung hängt von Ihrer Verfügbarkeit und Ihrem Lernfortschritt ab. Bei regelmäßiger Teilnahme am Unterricht und wöchentlichen Fahrstunden kann die Ausbildung in 3-6 Monaten abgeschlossen werden. Mit unserem Intensivkurs ist ein Abschluss innerhalb von 3-4 Wochen möglich.")}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{t("Welche Unterlagen benötige ich für die Anmeldung?")}</h3>
              <p className="text-gray-600">
                {t("Für die Anmeldung benötigen Sie einen gültigen Personalausweis oder Reisepass, ein biometrisches Passfoto, einen Sehtest vom Optiker oder Arzt, und einen Erste-Hilfe-Kurs-Nachweis. Bei Führerscheinerweiterungen bringen Sie bitte auch Ihren aktuellen Führerschein mit.")}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{t("Wann findet der Theorieunterricht statt?")}</h3>
              <p className="text-gray-600">
                {t("Unser regulärer Theorieunterricht findet Montag bis Donnerstag von 18:00 bis 19:30 Uhr statt. Für Berufstätige und Schüler bieten wir auch samstags Unterricht an. Beim Intensivkurs finden die Theorieeinheiten täglich vormittags statt.")}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{t("Können Fahrstunden auch am Wochenende stattfinden?")}</h3>
              <p className="text-gray-600">
                {t("Ja, wir bieten nach Absprache auch Fahrstunden am Samstag an. Diese müssen jedoch im Voraus geplant werden. Für die Intensivkurse stehen unsere Fahrlehrer auch am Wochenende zur Verfügung, um Ihren Führerschein in kürzester Zeit zu ermöglichen.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("Bereit loszulegen?")}</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            {t("Kontaktieren Sie uns noch heute, um Ihre Ausbildung zu beginnen oder mehr über unsere Angebote zu erfahren.")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              {t("Kontakt aufnehmen")}
            </Link>
            <a href="tel:+491234567890" className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
              {t("Anrufen")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
