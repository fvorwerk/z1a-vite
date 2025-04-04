import { useTranslation } from 'react-i18next';
import LegalPageLayout from '../../components/LegalPageLayout';

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();
  
  return (
    <LegalPageLayout title={t("Privacy Policy")}>
      <h2>{t("Data Protection")}</h2>
      <p>{t("We take the protection of your personal data very seriously. This privacy policy informs you about how we collect and process personal data when you use our website.")}</p>
      
      <h2>{t("Data Controller")}</h2>
      <p>{t("The data controller responsible for data processing on this website is:")}</p>
      <p>Z1 Ausbildungszentrum GmbH</p>
      <p>Zeppelinstraße 1</p>
      <p>88410 Bad Wurzach</p>
      <p>{t("Email")}: info@example.com</p>
      
      <h2>{t("Data Collection and Storage")}</h2>
      <p>{t("When you visit our website, we may collect the following data:")}</p>
      <ul>
        <li>{t("IP address")}</li>
        <li>{t("Date and time of the request")}</li>
        <li>{t("Browser type and version")}</li>
        <li>{t("Operating system")}</li>
        <li>{t("Referring website")}</li>
      </ul>
      
      <h2>{t("Cookies")}</h2>
      <p>{t("We use cookies on our website. Cookies are small text files that are stored on your device and help make our website more user-friendly, effective, and secure.")}</p>
      
      <h2>{t("Your Rights")}</h2>
      <p>{t("Under the EU General Data Protection Regulation (GDPR), you have the following rights:")}</p>
      <ul>
        <li>{t("Right to information about your personal data")}</li>
        <li>{t("Right to correction of inaccurate personal data")}</li>
        <li>{t("Right to deletion of your personal data")}</li>
        <li>{t("Right to restriction of processing")}</li>
        <li>{t("Right to data portability")}</li>
        <li>{t("Right to object to processing")}</li>
      </ul>
      
      <p>{t("If you have any questions about data protection, please contact us.")}</p>
    </LegalPageLayout>
  );
};

export default PrivacyPolicyPage;
