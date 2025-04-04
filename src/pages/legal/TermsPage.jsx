import { useTranslation } from 'react-i18next';
import LegalPageLayout from '../../components/LegalPageLayout';

const TermsPage = () => {
  const { t } = useTranslation();
  
  return (
    <LegalPageLayout title={t("Terms & Conditions")}>
      <h2>{t("1. Scope of Application")}</h2>
      <p>{t("These General Terms and Conditions (GTC) apply to all business relationships between us and our customers. The customer's terms and conditions shall only apply if we have expressly agreed to their validity.")}</p>
      
      <h2>{t("2. Conclusion of Contract")}</h2>
      <p>{t("Our offers are subject to change and non-binding. The contract is only concluded when we confirm the order in text form or deliver the goods.")}</p>
      
      <h2>{t("3. Prices and Payment Terms")}</h2>
      <p>{t("All prices are in Euro and include the statutory value-added tax. Payment is due immediately upon receipt of the invoice, unless otherwise agreed.")}</p>
      
      <h2>{t("4. Delivery and Shipping Costs")}</h2>
      <p>{t("Delivery times stated by us are approximate and non-binding unless a fixed date has been expressly agreed. Shipping costs are borne by the customer unless otherwise agreed.")}</p>
      
      <h2>{t("5. Warranty")}</h2>
      <p>{t("The statutory warranty rights apply.")}</p>
      
      <h2>{t("6. Liability")}</h2>
      <p>{t("We shall be liable for damages - regardless of the legal basis - only in the event of intent and gross negligence. For slight negligence, we shall only be liable for damages resulting from injury to life, body or health, or from the breach of a material contractual obligation.")}</p>
      
      <h2>{t("7. Final Provisions")}</h2>
      <p>{t("German law shall apply exclusively, excluding the UN Convention on Contracts for the International Sale of Goods (CISG).")}</p>
      <p>{t("Should individual provisions of these GTC be or become invalid, this shall not affect the validity of the remaining provisions.")}</p>
    </LegalPageLayout>
  );
};

export default TermsPage;
