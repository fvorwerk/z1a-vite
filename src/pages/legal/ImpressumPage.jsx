import { useTranslation } from 'react-i18next';
import LegalPageLayout from '../../components/LegalPageLayout';

const ImpressumPage = () => {
  const { t } = useTranslation();
  
  return (
    <LegalPageLayout title={t("Impressum")}>
      <h2>{t("Company Information")}</h2>
      <p>Z1 Ausbildungszentrum GmbH</p>
      <p>Zeppelinstraße 1</p>
      <p>88410 Bad Wurzach</p>
      <p>{t("Germany")}</p>
      
      <h2>{t("Contact")}</h2>
      <p>{t("Phone")}: +49 (0) XXX XXXXXX</p>
      <p>{t("Email")}: info@example.com</p>
      
      <h2>{t("Legal Representatives")}</h2>
      <p>{t("Managing Director")}: [Name des Geschäftsführers]</p>
      
      <h2>{t("Registration Information")}</h2>
      <p>{t("Commercial Register")}: Handelsregister des Amtsgerichts [Court]</p>
      <p>{t("Registration Number")}: HRB XXXXX</p>
      
      <h2>{t("VAT Identification Number")}</h2>
      <p>{t("According to § 27a of the German VAT Law")}: DE XXXXXXXXX</p>
      
      <h2>{t("Responsible for Content (according to § 18 Abs. 2 MStV)")}</h2>
      <p>[Name des Verantwortlichen]</p>
      <p>Z1 Ausbildungszentrum GmbH</p>
      <p>Zeppelinstraße 1</p>
      <p>88410 Bad Wurzach</p>
      
      <h2>{t("Online Dispute Resolution")}</h2>
      <p>
        {t("The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr/")}
      </p>
      <p>
        {t("Our email address can be found in the Impressum above. We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.")}
      </p>
    </LegalPageLayout>
  );
};

export default ImpressumPage;
