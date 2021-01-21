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
} from '../../../constants/uiStrings';
import CustomButton from '../../../components/CustomButton';

import PaginationIndicator from '../../../components/PaginationIndicator';
import cancel from '../../../../resources/icons/cancel/cancel.png';
import add from '../../../../resources/icons/add/add.png';
import back from '../../../../resources/icons/back/back.png';;



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
     if(mstring=="") return "No Input";
     return mstring;
  }
// Basic Information
  function getProfileName() {
    let name = isFilled(rootJson["_profileName"]);
    return name;
  }

  function getOrganization() {
    let organization = isFilled(rootJson["organizationName"]);
    return organization;
  }

  function getDescription() {
    let description = isFilled(rootJson["_description"]);
    return description;
  }
// Network Information
  function getNetworkName() {
    return isFilled(rootJson["wifiInfo_ssid"]);
  }

  function getNetworkHiddenStatus() {
    let status = rootJson["wifiInfo_hidden"];
    if(status == true) return "On";
    else               return "OFF";
  }

  function getWifiMacAddress() {
    let status = rootJson["wifiInfo_skipMacRandomization"];
    if(status == true) return "On";
    else               return "OFF";
  }

  function getProxy() {
    let proxy = rootJson["wifiInfo_proxyAutoConfigUrl"];
    return isFilled(proxy);
  }

  function getSecurity() {
    let value = rootJson["wifiInfo_securityType"];
    return isFilled(value);
  }

  function getEAP() {
    let value = "PEAP";
    return isFilled(value);
  }
  function getPassword() {
    let pass = rootJson["_description"];
    return (pass==""?"********":pass);
  }

  function getPhase2Auth() {
    let description = rootJson["_description"];
    return (description == "" ? "blank....." : description);
  }

  function getCACertificate() {
    let description = rootJson["_description"];
    return (description == "" ? "blank....." : description);
  }

  function getUserCertificate() {
    let description = rootJson["_description"];
    return (description == "" ? "blank....." : description);
  }

  function getEulaTitle() {
    return "blank";
  }

  function getEulaUrl() {
    return "blank";
  }

  function getData() {
    return "blank";
  }

  function addNeccesaryInfo() {
    return "Pofile ID: " + rootJson["profileID"];
  }

  function BasicInfoSection() {
    return (
      <div>
        <h3 className={stylesSP.sectionTitle}>Basic information</h3>
        <h3 className={stylesSP.sectionSubTitle}>Profile Name</h3>
        <h5 className={stylesSP.sectionText}>{getProfileName()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>Organization</h3>
        <h5 className={stylesSP.sectionText}>{getOrganization()}</h5>
        <h3 className={stylesSP.sectionSubTitle}>Description</h3>
        <h5 className={stylesSP.sectionText}>{getDescription()}</h5>
      </div>
    );
  }

  function NetworkInfoSection() {
    return (
      <div>
            <h3 className={stylesSP.sectionTitle}>Network information</h3>
            <h3 className={stylesSP.sectionSubTitle}>Name</h3>
            <h5 className={stylesSP.sectionText}>{getNetworkName()}</h5>
            <h3 className={stylesSP.sectionSubTitle}>Hidden network</h3>
            <h5 className={stylesSP.sectionText}>{getNetworkHiddenStatus()}</h5>
            <h3 className={stylesSP.sectionSubTitle}>WIFI MAC adress randomization</h3>
            <h5 className={stylesSP.sectionText}>{getWifiMacAddress()}</h5>
            <h3 className={stylesSP.sectionSubTitle}>Proxy</h3>
            <h5 className={stylesSP.sectionText}>{getProxy()}</h5>
            <h3 className={stylesSP.sectionSubTitle}>Security</h3>
            <h5 className={stylesSP.sectionText}>{getSecurity()}</h5>
            <h3 className={stylesSP.sectionSubTitle}>EAP method</h3>
            <h5 className={stylesSP.sectionText}>{getEAP()}</h5>
            <h3 className={stylesSP.sectionSubTitle}>Password</h3>
            <h5 className={stylesSP.sectionText}>{getPassword()}</h5>
            <h3 className={stylesSP.sectionSubTitle}>Phase 2 authetication</h3>
            <h5 className={stylesSP.sectionText}>{getPhase2Auth()}</h5>
            <h3 className={stylesSP.sectionSubTitle}>CA certificate</h3>
            <h5 className={stylesSP.sectionText}>{getCACertificate()}</h5>
            <h3 className={stylesSP.sectionSubTitle}>Proxy</h3>
            <h5 className={stylesSP.sectionText}>{getProxy()}</h5>
            <h3 className={stylesSP.sectionSubTitle}>User certificate</h3>
            <h5 className={stylesSP.sectionText}>{getUserCertificate()}</h5>
      </div>
    );
  }

  function LegalInfoSection() {
    return (
      <div>
            <h3 className={stylesSP.sectionTitle}>Legal information</h3>
            <h3 className={stylesSP.sectionSubTitle}>EULA title</h3>
            <h5 className={stylesSP.sectionText}>{getEulaTitle()}</h5>
            <h3 className={stylesSP.sectionSubTitle}>EULA URL</h3>
            <h5 className={stylesSP.sectionText}>{getEulaUrl()}</h5>
      </div>
    );
  }

  function DeviceOwnerInfo() {
    return (
      <div>
            <h3 className={stylesSP.sectionTitle}>Device Owner profile information</h3>
            <h3 className={stylesSP.sectionSubTitle}>Device owner EMM</h3>
            <h5 className={stylesSP.sectionText}>{getData()}</h5>
            <h3 className={stylesSP.sectionSubTitle}>Device Owner APK download URL</h3>
            <h5 className={stylesSP.sectionText}>{getData()}</h5>
            <h3 className={stylesSP.sectionSubTitle}>Admin package name</h3>
            <h5 className={stylesSP.sectionText}>{getData()}</h5>
            <h3 className={stylesSP.sectionSubTitle}>Admin package signature checksum</h3>
            <h5 className={stylesSP.sectionText}>{getData()}</h5>
            <h3 className={stylesSP.sectionSubTitle}>Device Owner profile server URI</h3>
            <h5 className={stylesSP.sectionText}>{getData()}</h5>
            <h3 className={stylesSP.sectionSubTitle}>Custom JSON data</h3>
            <h5 className={stylesSP.sectionText}>{getData()}</h5>
            <h3 className={stylesSP.sectionSubTitle}>Root/Intermediate certificate</h3>
            <h5 className={stylesSP.sectionText}>{getData()}</h5>
      </div>
    );
  }

  function DeviceConfigInfoSection() {
    return (
      <div>
            <h3 className={stylesSP.sectionTitle}>Device & Peripheral Configuration</h3>
            <h3 className={stylesSP.sectionSubTitle}>Device & Peripheral Configuration</h3>
            <h5 className={stylesSP.sectionText}>{getData()}</h5>
            <h3 className={stylesSP.sectionSubTitle}>Knox service plug-in installation</h3>
            <h5 className={stylesSP.sectionText}>{getData()}</h5>
            <h3 className={stylesSP.sectionSubTitle}>Pacakage name</h3>
            <h5 className={stylesSP.sectionText}>{getData()}</h5>
            <h3 className={stylesSP.sectionSubTitle}>Pacakage signing key</h3>
            <h5 className={stylesSP.sectionText}>{getData()}</h5>
      </div>
    );
  }

  function AppConfigInfoSection() {
    return (
      <div>
            <h3 className={stylesSP.sectionTitle}>Application Configuration</h3>
            <h3 className={stylesSP.sectionSubTitle}>Package name</h3>
            <h5 className={stylesSP.sectionText}>{getData()}</h5>
            <h3 className={stylesSP.sectionSubTitle}>Package signing key</h3>
            <h5 className={stylesSP.sectionText}>{getData()}</h5>
            <h3 className={stylesSP.sectionSubTitle}>Package download URL</h3>
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
      <div className={stylesSP.formContainerSP}>
        <div className={styles.headerContainer}>
          <div
            onClick={onPressBack}
            onKeyPress={onPressBack}
            role="button"
            tabIndex={0}
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
          >
            <img src={cancel} alt="Cancel" className={styles.cancel} />
          </div>
        </div>
        <h1 className={styles.title}>Summary</h1>
        <h2 className={styles.subText}>Check your information.</h2>

        <form id="summary_form" onSubmit={handleSubmit} className={stylesSP.summaryFormContainer}>
          <div className={stylesSP.details}>

              <div className={stylesSP.firstSection}>
                <BasicInfoSection />
                <NetworkInfoSection />
              </div>

              <div className={stylesSP.secondSection}>
                <LegalInfoSection />
                <DeviceOwnerInfo  />
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
              <CustomButton type="button" text="RESET" backgroundColor='#ffffff' />
          </Link>
        </div>
        <div className={stylesSP.generate_qr_button}>
            <CustomButton form="summary_form" type="submit" text="Generate QR code" />
        </div>
      </div>
    </div>
  );

  // return (

  //   <div className={sharedStyles.container}>
  //     <div className={sharedStyles.headerContainer}>
  //         <div>
  //           <Link to={`.${CreationRoutes.WIFI}`}>
  //             <button type="button">Go to List</button>
  //           </Link>
  //         </div>
  //         <div>
  //           <h3 className={sharedStyles.pageTitle}>{EMM_CREATE_PAGE_TITLE}</h3>
  //           <PaginationIndicator noOfItems={7} selectedIndex={6} />
  //         </div>
  //         <div>
  //           <img src={cancel} alt="Cancel" className={styles.cancel} />
  //         </div>
  //     </div>
  //     <div className={styles.pageContainer}>

  //       <div className={styles.header}>
  //           <h1 className={styles.pageTitle}>Summary</h1>
  //           <h2 className={styles.pageSubTitle}>Check your information.</h2>
  //       </div>

        // <form id="summary_form" onSubmit={handleSubmit} className={styles.summaryFormContainer}>
        //   <div className={styles.details}>

        //       <div className={styles.firstSection}>
        //         <BasicInfoSection />
        //         <NetworkInfoSection />
        //       </div>

        //       <div className={styles.secondSection}>
        //         <LegalInfoSection />
        //         <DeviceOwnerInfo  />
        //       </div>

        //       <div className={styles.thirdSection}>
        //         <DeviceConfigInfoSection />
        //         <AppConfigInfoSection />
        //       </div>
        //   </div>
        // </form>
  //     </div>

  //     <br />
  //     <br />
  //     {/* Footer(button) */}
  //     <div className={sharedStyles.buttonContainer}>
  //       <div className={styles.reset_button}>
  //         <Link to={routes.LIST}>
  //             <CustomButton type="button" text="RESET" backgroundColor='#ffffff' />
  //         </Link>
  //       </div>
  //       <div className={styles.generate_qr_button}>
  //           <CustomButton form="summary_form" type="submit" text="GENERATE QR CODE" />
  //       </div>
  //     </div>
  //   </div>
  // );
}
