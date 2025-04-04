import { useTranslation } from 'react-i18next';
import LegalPageLayout from '../../components/LegalPageLayout';

const ShippingPage = () => {
  const { t } = useTranslation();
  
  return (
    <LegalPageLayout title={t("Shipping & Payment")}>
      <h2>{t("Shipping Information")}</h2>
      <p>{t("We deliver within Germany and to selected European countries. Delivery times and shipping costs may vary depending on the destination and chosen shipping method.")}</p>
      
      <h2>{t("Delivery Times")}</h2>
      <p>{t("Delivery within Germany: Normally 2-4 business days")}</p>
      <p>{t("Delivery to other EU countries: Normally 5-8 business days")}</p>
      <p>{t("Please note that these are approximate delivery times and may vary in individual cases.")}</p>
      
      <h2>{t("Shipping Costs")}</h2>
      <p>{t("Germany: €4.95")}</p>
      <p>{t("EU countries: starting from €9.95")}</p>
      <p>{t("For orders above €50, shipping within Germany is free.")}</p>
      
      <h2>{t("Payment Methods")}</h2>
      <p>{t("We offer the following payment methods:")}</p>
      <ul>
        <li>{t("Credit Card (Visa, MasterCard)")}</li>
        <li>{t("PayPal")}</li>
        <li>{t("Bank Transfer")}</li>
        <li>{t("SOFORT Banking")}</li>
      </ul>
      
      <h2>{t("Payment Terms")}</h2>
      <p>{t("When paying by credit card or PayPal, your account will be charged immediately after the order has been placed.")}</p>
      <p>{t("For bank transfers, please transfer the total amount within 7 days after receiving the order confirmation. Your order will be processed after we have received your payment.")}</p>
      
      <h2>{t("Retention of Title")}</h2>
      <p>{t("The delivered goods remain our property until full payment has been made.")}</p>
    </LegalPageLayout>
  );
};

export default ShippingPage;
