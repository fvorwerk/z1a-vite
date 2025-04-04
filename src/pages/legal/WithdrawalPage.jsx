import { useTranslation } from 'react-i18next';
import LegalPageLayout from '../../components/LegalPageLayout';

const WithdrawalPage = () => {
  const { t } = useTranslation();
  
  return (
    <LegalPageLayout title={t("Right of Withdrawal")}>
      <h2>{t("Right of Withdrawal for Consumers")}</h2>
      <p>{t("As a consumer, you have the right to withdraw from this contract within fourteen days without giving any reason.")}</p>
      
      <h2>{t("Withdrawal Period")}</h2>
      <p>{t("The withdrawal period is fourteen days from the day on which you or a third party designated by you, who is not the carrier, have taken or has taken possession of the goods.")}</p>
      
      <h2>{t("Exercise of the Right of Withdrawal")}</h2>
      <p>{t("To exercise your right of withdrawal, you must inform us of your decision to withdraw from this contract by means of a clear statement (e.g., a letter sent by post, fax, or email). You may use the attached model withdrawal form, but it is not obligatory.")}</p>
      
      <h2>{t("Effects of Withdrawal")}</h2>
      <p>{t("If you withdraw from this contract, we shall reimburse you all payments received from you, including the costs of delivery (with the exception of the supplementary costs resulting from your choice of a type of delivery other than the least expensive type of standard delivery offered by us), without undue delay and in any event not later than fourteen days from the day on which we are informed about your decision to withdraw from this contract.")}</p>
      
      <h2>{t("Model Withdrawal Form")}</h2>
      <p>{t("(If you want to withdraw from the contract, please fill out this form and send it back.)")}</p>
      <div className="border p-4 my-4">
        <p>Z1 Ausbildungszentrum GmbH</p>
        <p>Zeppelinstraße 1</p>
        <p>88410 Bad Wurzach</p>
        <p>{t("Email")}: info@example.com</p>
        <p>- {t("I/We hereby withdraw from the contract concluded by me/us for the purchase of the following goods/the provision of the following service")}</p>
        <p>- {t("Ordered on/received on")}</p>
        <p>- {t("Name of consumer(s)")}</p>
        <p>- {t("Address of consumer(s)")}</p>
        <p>- {t("Signature of consumer(s) (only if this form is submitted on paper)")}</p>
        <p>- {t("Date")}</p>
      </div>
    </LegalPageLayout>
  );
};

export default WithdrawalPage;
