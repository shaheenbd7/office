/* eslint-disable no-underscore-dangle */
import React, { FormEvent, useEffect, useState, createRef } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { ipcRenderer } from 'electron';
import routes from '../../../constants/routes.json';
import { saveAsDraft, storeFormIntoJson } from './CreationUtils';
import CreationParams from './CreationPageAttrs';
import CreationRoutes from './CreationRoutes.json';
import stylesSP from './SummaryPage.css';
import styles from './Creation.css';

import {
  EMM_CREATE_PAGE_TITLE,
  SUMMARY_FORM_STRINGS,
  RESET,
  CANCEL,
  RESET_DATA,
  RESET_POPUP_DESCRIPTION,
} from '../../../constants/uiStrings';
import CustomButton from '../../../components/CustomButton';

import PaginationIndicator from '../../../components/PaginationIndicator';
import cancel from '../../../../resources/icons/cancel/cancel.png';
import back from '../../../../resources/icons/back/back.png';
import CloseButtonWithPopup from '../../../components/CustomPopup/CloseButtonWithPopup';
import Popup, { PopupInfo } from '../../../components/CustomPopup/Popup';

interface QRDatas {
  qrDatas: string[];
}

export default function CreationSummaryPage({ rootJson }: CreationParams) {
  const history = useHistory();
  const { url, path } = useRouteMatch();

  const [resetPopup, setRestPopup] = useState<Popup>();

  useEffect(() => {
    const popupInfo: PopupInfo = {
      height: 246,
      width: 520,
      titleBarText: RESET_DATA,
      descriptionText: RESET_POPUP_DESCRIPTION,
      positiveButtonText: RESET,
      negativeButtonText: CANCEL,
      // Both of these should not conflict with any existing IPC Channel
      positiveActionIpcChannel: 'resetProfileSummaryPage',
      negativeActionIpcChannel: 'hidePopupSummaryPage',
    };

    const popup = new Popup(popupInfo);
    setRestPopup(popup);

    const positiveActionFunction = () => {
      history.replace(routes.LIST);
      popup.hidePopup();
    };
    const negativeActionFunction = () => {
      popup.hidePopup();
    };
    ipcRenderer.on(popupInfo.positiveActionIpcChannel, positiveActionFunction);
    ipcRenderer.on(popupInfo.negativeActionIpcChannel, negativeActionFunction);

    return () => {
      // Clean up in componentWillUnmount
      ipcRenderer.removeListener(
        popupInfo.positiveActionIpcChannel,
        positiveActionFunction
      );
      ipcRenderer.removeListener(
        popupInfo.negativeActionIpcChannel,
        negativeActionFunction
      );
    };
  }, [history]);

  useEffect(() => {
    console.log(
      `CreationSummaryPage url=${url} path=${path} json=${JSON.stringify(
        rootJson
      )}`
    );
  });

  function QRCanvases({ qrDatas }: QRDatas) {
    const refCanvases = qrDatas.map(() => createRef<HTMLCanvasElement>());
  }

  function isFilled(mstring: string) {
    if (mstring === '') return 'No Input';
    return mstring;
  }
  // Basic Information
  function getProfileName() {
    const name = isFilled(rootJson._profileName);
    return name;
  }

  function getOrganization() {
    const organization = isFilled(rootJson.organizationName);
    return organization;
  }

  function getDescription() {
    const description = isFilled(rootJson._description);
    return description;
  }
  // Network Information
  function getNetworkName() {
    return isFilled(rootJson.wifiInfo_ssid);
  }

  function getNetworkHiddenStatus() {
    const status = rootJson.wifiInfo_hidden;
    if (status === true) return 'On';
    return 'Off';
  }

  function getWifiMacAddress() {
    const status = rootJson.wifiInfo_skipMacRandomization;
    if (status === true) return 'On';
    return 'Off';
  }

  function getProxy() {
    const proxy = rootJson.wifiInfo_proxyAutoConfigUrl;
    return isFilled(proxy);
  }

  function getSecurity() {
    const value = rootJson.wifiInfo_securityType;
    return isFilled(value);
  }

  function getEAP() {
    const value = rootJson.wifiInfo_eapMethod;
    return isFilled(value);
  }

  function getIdentity() {
    const value = rootJson.wifiInfo_identity;
    return isFilled(value);
  }

  function getPassword() {
    const pass = isFilled(rootJson.wifiInfo_password);
    return pass;
  }

  function getPhase2Auth() {
    return isFilled(rootJson.wifiInfo_phase2Auth);
  }

  function getCACertificate() {
    return isFilled(rootJson._caCertificate_file);
  }

  function getUserCertificate() {
    return isFilled('');
  }

  function getEulaTitle() {
    return isFilled(rootJson.eulas_title);
  }

  function getEulaUrl() {
    return isFilled(rootJson.eulas_href);
  }

  function getDOEMM() {
    return isFilled(rootJson._emm_vendor);
  }

  function getDOApkDownloadURL() {
    return isFilled(rootJson.management_agent_href);

  }

  function getDOAdminPackageName() {
    return isFilled(rootJson.management_agent_packageName);
  }

  function getDOAdminCheckSum() {
    return isFilled(rootJson.management_agent_signatures_0);
  }

  function getDOProfileServerURI() {
    return isFilled(rootJson._do_profile_server_uri);
  }

  function getDOCustonJsonData() {
    return isFilled(rootJson._custom_json_data);
  }

  function getDORootInterCertificate() {
    return isFilled(rootJson.management_certificates_0_alias);
  }

  function getDPCStatus() {
    const status = rootJson._enable_peripheral_config;
    if(status=="on") return "enbled";
    return "disabled";
  }

  function getDPCKnox() {
    return isFilled(rootJson.management_secondaryAgents_0_href);
  }

  function getDPCPackageName() {
    return isFilled(rootJson.management_secondaryAgents_0_packageName);
  }

  function getDPCSignKey() {
    return isFilled(rootJson.management_secondaryAgents_0_signatures_0);
  }

  function getACPackageName() {
    return isFilled(rootJson.management_secondaryAgents_1_packageName);
  }

  function getACPackageSigningKey() {
    return isFilled(rootJson.management_secondaryAgents_1_signatures_0);
  }

  function getACPackageDownloadURL() {
    return isFilled(rootJson.management_secondaryAgents_1_href);
  }

  function getData() {
    return isFilled('');
  }

  function BasicInfoSection() {
    return (
      <div>
        <h3 className={stylesSP.sectionTitle}>
          {SUMMARY_FORM_STRINGS.BASIC_INFO_TITLE}
        </h3>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.BASIC_INFO_FIELD1}
        </h3>
        <h5 className={stylesSP.sectionText}>{getProfileName()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.BASIC_INFO_FIELD2}
        </h3>
        <h5 className={stylesSP.sectionText}>{getOrganization()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.BASIC_INFO_FIELD3}
        </h3>
        <h5 className={stylesSP.sectionText}>{getDescription()}</h5>
      </div>
    );
  }

  function NetworkInfoSection() {
    return (
      <div>
        <h3 className={stylesSP.sectionTitle}>
          {SUMMARY_FORM_STRINGS.NETWORK_INFO_TITLE}
        </h3>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.NETWORK_INFO_FIELD1}
        </h3>
        <h5 className={stylesSP.sectionText}>{getNetworkName()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.NETWORK_INFO_FIELD2}
        </h3>
        <h5 className={stylesSP.sectionText}>{getNetworkHiddenStatus()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.NETWORK_INFO_FIELD3}
        </h3>
        <h5 className={stylesSP.sectionText}>{getWifiMacAddress()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.NETWORK_INFO_FIELD4}
        </h3>
        <h5 className={stylesSP.sectionText}>{getProxy()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.NETWORK_INFO_FIELD5}
        </h3>
        <h5 className={stylesSP.sectionText}>{getSecurity()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.NETWORK_INFO_FIELD6}
        </h3>
        <h5 className={stylesSP.sectionText}>{getEAP()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          Identity
        </h3>
        <h5 className={stylesSP.sectionText}>{getIdentity()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.NETWORK_INFO_FIELD7}
        </h3>
        <h5 className={stylesSP.sectionText}>{getPassword()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.NETWORK_INFO_FIELD8}
        </h3>
        <h5 className={stylesSP.sectionText}>{getPhase2Auth()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.NETWORK_INFO_FIELD9}
        </h3>
        <h5 className={stylesSP.sectionText}>{getCACertificate()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.NETWORK_INFO_FIELD11}
        </h3>
        <h5 className={stylesSP.sectionText}>{getUserCertificate()}</h5>
      </div>
    );
  }

  function LegalInfoSection() {
    return (
      <div>
        <h3 className={stylesSP.sectionTitle}>
          {SUMMARY_FORM_STRINGS.LEGAL_INFO_TITLE}
        </h3>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.LEGAL_INFO_FIELD1}
        </h3>
        <h5 className={stylesSP.sectionText}>{getEulaTitle()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.LEGAL_INFO_FIELD2}
        </h3>
        <h5 className={stylesSP.sectionText}>{getEulaUrl()}</h5>
      </div>
    );
  }

  function DeviceOwnerInfo() {
    return (
      <div>
        <h3 className={stylesSP.sectionTitle}>
          {SUMMARY_FORM_STRINGS.DEVICE_PROFILE_TILE}
        </h3>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.DEVICE_PROFILE_FIELD1}
        </h3>
        <h5 className={stylesSP.sectionText}>{getDOEMM()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.DEVICE_PROFILE_FIELD2}
        </h3>
        <h5 className={stylesSP.sectionText}>{getDOApkDownloadURL()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.DEVICE_PROFILE_FIELD3}
        </h3>
        <h5 className={stylesSP.sectionText}>{getDOAdminPackageName()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.DEVICE_PROFILE_FIELD4}
        </h3>
        <h5 className={stylesSP.sectionText}>{getDOAdminCheckSum()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.DEVICE_PROFILE_FIELD5}
        </h3>
        <h5 className={stylesSP.sectionText}>{getDOProfileServerURI()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.DEVICE_PROFILE_FIELD6}
        </h3>
        <h5 className={stylesSP.sectionText}>{getDOCustonJsonData()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.DEVICE_PROFILE_FIELD7}
        </h3>
        <h5 className={stylesSP.sectionText}>{getDORootInterCertificate()}</h5>
      </div>
    );
  }

  function DeviceConfigInfoSection() {
    return (
      <div>
        <h3 className={stylesSP.sectionTitle}>
          {SUMMARY_FORM_STRINGS.DEVICE_CONFIG_TILE}
        </h3>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.DEVICE_CONFIG_FIELD1}
        </h3>
        <h5 className={stylesSP.sectionText}>{getDPCStatus()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.DEVICE_CONFIG_FIELD2}
        </h3>
        <h5 className={stylesSP.sectionText}>{getDPCKnox()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.DEVICE_CONFIG_FIELD3}
        </h3>
        <h5 className={stylesSP.sectionText}>{getDPCPackageName()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.DEVICE_CONFIG_FIELD4}
        </h3>
        <h5 className={stylesSP.sectionText}>{getDPCSignKey()}</h5>
      </div>
    );
  }

  function AppConfigInfoSection() {
    return (
      <div>
        <h3 className={stylesSP.sectionTitle}>
          {SUMMARY_FORM_STRINGS.APP_INFO_TITLE}
        </h3>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.APP_INFO_FIELD1}
        </h3>
        <h5 className={stylesSP.sectionText}>{getACPackageName()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.APP_INFO_FIELD2}
        </h3>
        <h5 className={stylesSP.sectionText}>{getACPackageSigningKey()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>
          {SUMMARY_FORM_STRINGS.APP_INFO_FIELD3}
        </h3>
        <h5 className={stylesSP.sectionText}>{getACPackageDownloadURL()}</h5>
      </div>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('goto qr page');
    history.push(`.${CreationRoutes.GENERATE_QR}`);
  };

  const onPressBack = () => {
    history.push(`.${CreationRoutes.OPTION_CONFIG}`);
  };

  const onPressCancel = () => {
    const form = document.querySelector('form');
    storeFormIntoJson(form, rootJson);
    saveAsDraft(rootJson);

    history.replace(routes.LIST);
  };

  return (
    <div data-tid="container" className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.headerContainer}>
          <div
            onClick={onPressBack}
            onKeyPress={onPressBack}
            role="button"
            tabIndex={0}
            className={styles.leftButtonContainer}
          >
            <img src={back} alt="Back" className={styles.iconBackArrow} />
          </div>
          <div>
            <h3 className={styles.pageTitle}>{EMM_CREATE_PAGE_TITLE}</h3>
            <PaginationIndicator noOfItems={7} selectedIndex={6} />
          </div>
          <div>
            <CloseButtonWithPopup saveAsDraftCallback={onPressCancel} />
          </div>
        </div>
        <h1 className={styles.title}>{SUMMARY_FORM_STRINGS.FORM_TITLE}</h1>
        <h2 className={styles.subText}>{SUMMARY_FORM_STRINGS.SUB_TEXT}</h2>

        <form id="summary_form" onSubmit={handleSubmit} className={styles.form}>
          <div className={stylesSP.details}>
            <div className={stylesSP.firstSection}>
              <BasicInfoSection />
              <NetworkInfoSection />
            </div>

            <div className={stylesSP.secondSection}>
              <LegalInfoSection />
              <DeviceOwnerInfo />
            </div>

            <div className={stylesSP.thirdSection}>
              <DeviceConfigInfoSection />
              <AppConfigInfoSection />
            </div>
          </div>
        </form>
      </div>
      <div className={styles.buttonContainer}>
        <div className={stylesSP.reset_button}>
          <CustomButton
            type="button"
            text={SUMMARY_FORM_STRINGS.BUTTON_RESET}
            backgroundColor="#ffffff"
            onClick={() => resetPopup?.showPopup()}
          />
        </div>
        <div className={stylesSP.generate_qr_button}>
          <CustomButton
            form="summary_form"
            type="submit"
            text={SUMMARY_FORM_STRINGS.BUTTON_GENERATE}
            width="135px"
          />
        </div>
      </div>
    </div>
  );
}
