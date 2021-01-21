import React, {
  FormEvent,
  useEffect,
  createRef,
  useState,
  useRef,
} from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';

import routes from '../../../constants/routes.json';

import CreationParams from './CreationParams';

import CreationRoutes from './CreationRoutes.json';

import stylesSP from './SummaryPage.css';
import styles from './Creation.css';

import {
  OPTIONAL_CONFIG_FORM_STRINGS,
  DEVICE_AND_PERIPHERAL_CONFIG,
  OPTIONAL_CONFIG_TOGGLE_DESCRIPTION,
  MORE_APP,
  ADD_PACKAGE_DESCRIPTION,
  DNP_CONFIGURATION,
  ADD_NEW_PACKAGE,
  NEW_PACKAGE,
  DNP_GUIDE,
  CONTINUE,
  EMM_CREATE_PAGE_TITLE,
  SUMMARY_FORM_STRINGS,
} from '../../../constants/uiStrings';
import CustomButton from '../../../components/CustomButton';

import PaginationIndicator from '../../../components/PaginationIndicator';
import cancel from '../../../../resources/icons/cancel/cancel.png';
import add from '../../../../resources/icons/add/add.png';
import back from '../../../../resources/icons/back/back.png';

export default function CreationSummaryPage({ rootJson }: CreationParams) {
  const history = useHistory();
  const { url, path } = useRouteMatch();

  useEffect(() => {
    console.log(
      `CreationSummaryPage url=${url} path=${path} json=${JSON.stringify(
        rootJson
      )}`
    );
  });

  function isFilled(mstring: string) {
    if (mstring == '') return "No Input";
    return mstring;
  }
  // Basic Information
  function getProfileName() {
    let name = isFilled(rootJson['_profileName']);
    return name;
  }

  function getOrganization() {
    let organization = isFilled(rootJson['organizationName']);
    return organization;
  }

  function getDescription() {
    let description = isFilled(rootJson['_description']);
    return description;
  }
  // Network Information
  function getNetworkName() {
    return isFilled(rootJson['wifiInfo_ssid']);
  }

  function getNetworkHiddenStatus() {
    let status = rootJson['wifiInfo_hidden'];
    if (status == true) return 'On';
    else return 'OFF';
  }

  function getWifiMacAddress() {
    let status = rootJson['wifiInfo_skipMacRandomization'];
    if (status == true) return 'On';
    else return 'OFF';
  }

  function getProxy() {
    let proxy = rootJson['wifiInfo_proxyAutoConfigUrl'];
    return isFilled(proxy);
  }

  function getSecurity() {
    let value = rootJson['wifiInfo_securityType'];
    return isFilled(value);
  }

  function getEAP() {
    let value = 'PEAP';
    return isFilled(value);
  }
  function getPassword() {
    let pass = rootJson['_description'];
    return pass == '' ? '********' : pass;
  }

  function getPhase2Auth() {
    return isFilled("");
  }

  function getCACertificate() {
    return isFilled("");
  }

  function getUserCertificate() {
    return isFilled("");
  }

  function getEulaTitle() {
    return isFilled("");
  }

  function getEulaUrl() {
    return isFilled("");
  }

  function getData() {
    return isFilled("");
  }

  function BasicInfoSection() {
    return (
      <div>
        <h3 className={stylesSP.sectionTitle}>{SUMMARY_FORM_STRINGS.BASIC_INFO_TITLE}</h3>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.BASIC_INFO_FIELD1}</h3>
        <h5 className={stylesSP.sectionText}>{getProfileName()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.BASIC_INFO_FIELD2}</h3>
        <h5 className={stylesSP.sectionText}>{getOrganization()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.BASIC_INFO_FIELD3}</h3>
        <h5 className={stylesSP.sectionText}>{getDescription()}</h5>
      </div>
    );
  }

  function NetworkInfoSection() {
    return (
      <div>
        <h3 className={stylesSP.sectionTitle}>{SUMMARY_FORM_STRINGS.NETWORK_INFO_TITLE}</h3>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.NETWORK_INFO_FIELD1}</h3>
        <h5 className={stylesSP.sectionText}>{getNetworkName()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.NETWORK_INFO_FIELD2}</h3>
        <h5 className={stylesSP.sectionText}>{getNetworkHiddenStatus()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.NETWORK_INFO_FIELD3}</h3>
        <h5 className={stylesSP.sectionText}>{getWifiMacAddress()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.NETWORK_INFO_FIELD4}</h3>
        <h5 className={stylesSP.sectionText}>{getProxy()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.NETWORK_INFO_FIELD5}</h3>
        <h5 className={stylesSP.sectionText}>{getSecurity()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.NETWORK_INFO_FIELD6}</h3>
        <h5 className={stylesSP.sectionText}>{getEAP()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.NETWORK_INFO_FIELD7}</h3>
        <h5 className={stylesSP.sectionText}>{getPassword()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.NETWORK_INFO_FIELD8}</h3>
        <h5 className={stylesSP.sectionText}>{getPhase2Auth()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.NETWORK_INFO_FIELD9}</h3>
        <h5 className={stylesSP.sectionText}>{getCACertificate()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.NETWORK_INFO_FIELD10}</h3>
        <h5 className={stylesSP.sectionText}>{getProxy()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.NETWORK_INFO_FIELD11}</h3>
        <h5 className={stylesSP.sectionText}>{getUserCertificate()}</h5>
      </div>
    );
  }

  function LegalInfoSection() {
    return (
      <div>
        <h3 className={stylesSP.sectionTitle}>{SUMMARY_FORM_STRINGS.LEGAL_INFO_TITLE}</h3>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.LEGAL_INFO_FIELD1}</h3>
        <h5 className={stylesSP.sectionText}>{getEulaTitle()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.LEGAL_INFO_FIELD2}</h3>
        <h5 className={stylesSP.sectionText}>{getEulaUrl()}</h5>
      </div>
    );
  }

  function DeviceOwnerInfo() {
    return (
      <div>
        <h3 className={stylesSP.sectionTitle}>{SUMMARY_FORM_STRINGS.DEVICE_PROFILE_TILE}</h3>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.DEVICE_PROFILE_FIELD1}</h3>
        <h5 className={stylesSP.sectionText}>{getData()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.DEVICE_PROFILE_FIELD2}</h3>
        <h5 className={stylesSP.sectionText}>{getData()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.DEVICE_PROFILE_FIELD3}</h3>
        <h5 className={stylesSP.sectionText}>{getData()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.DEVICE_PROFILE_FIELD4}</h3>
        <h5 className={stylesSP.sectionText}>{getData()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.DEVICE_PROFILE_FIELD5}</h3>
        <h5 className={stylesSP.sectionText}>{getData()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.DEVICE_PROFILE_FIELD6}</h3>
        <h5 className={stylesSP.sectionText}>{getData()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.DEVICE_PROFILE_FIELD7}</h3>
        <h5 className={stylesSP.sectionText}>{getData()}</h5>
      </div>
    );
  }

  function DeviceConfigInfoSection() {
    return (
      <div>
        <h3 className={stylesSP.sectionTitle}>{SUMMARY_FORM_STRINGS.DEVICE_CONFIG_TILE}</h3>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.DEVICE_CONFIG_FIELD1}</h3>
        <h5 className={stylesSP.sectionText}>{getData()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.DEVICE_CONFIG_FIELD2}</h3>
        <h5 className={stylesSP.sectionText}>{getData()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.DEVICE_CONFIG_FIELD3}</h3>
        <h5 className={stylesSP.sectionText}>{getData()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.DEVICE_CONFIG_FIELD4}</h3>
        <h5 className={stylesSP.sectionText}>{getData()}</h5>
      </div>
    );
  }

  function AppConfigInfoSection() {
    return (
      <div>
        <h3 className={stylesSP.sectionTitle}>{SUMMARY_FORM_STRINGS.APP_INFO_TITLE}</h3>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.APP_INFO_FIELD1}</h3>
        <h5 className={stylesSP.sectionText}>{getData()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.APP_INFO_FIELD2}</h3>
        <h5 className={stylesSP.sectionText}>{getData()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>{SUMMARY_FORM_STRINGS.APP_INFO_FIELD3}</h3>
        <h5 className={stylesSP.sectionText}>{getData()}</h5>
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
    // TODO: need to implement cancel action here
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
          <div
            onClick={onPressCancel}
            onKeyPress={onPressCancel}
            role="button"
            tabIndex={0}
            className={styles.rightButtonContainer}
          >
            <img src={cancel} alt="Cancel" className={styles.cancel} />
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
          <Link to={routes.LIST}>
            <CustomButton
              type="button"
              text={SUMMARY_FORM_STRINGS.BUTTON_RESET}
              backgroundColor="#ffffff"
            />
          </Link>
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
