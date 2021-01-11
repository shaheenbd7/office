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

import styles from './SummaryPage.css';
import CustomButton from '../../../components/CustomButton';


import CreationRoutes from './CreationRoutes.json';

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

  function getProfileName() {
    let name = rootJson["_profileName"];
    return (name == "" ? "DEMO" : name);
  }

  function getOrganization() {
    let organization = rootJson["organizationName"];
    return (organization == "" ? "DEMO Organization" : organization);
  }

  function getDescription() { 
    let description = rootJson["_description"];
    return (description == "" ? "blank....." : description);
  }

  function getNetworkName() {
    let description = rootJson["_description"];
    return (description == "" ? "blank....." : description);
  }

  function getNetworkHiddenStatus() { 
    let description = rootJson["_description"];
    return (description == "" ? "blank....." : description);
  }

  function getWifiMacAddress() { 
    let description = rootJson["_description"];
    return (description == "" ? "blank....." : description);
  }

  function getProxy() { 
    let description = rootJson["_description"];
    return (description == "" ? "blank....." : description);
  }

  function getSecurity() { 
    let description = rootJson["_description"];
    return (description == "" ? "blank....." : description);
  }

  function getEAP() { 
    let description = rootJson["_description"];
    return (description == "" ? "blank....." : description);
  }

  function getIdentity() { 
    let description = rootJson["_description"];
    return (description == "" ? "blank....." : description);
  }

  function getPassword() { 
    let description = rootJson["_description"];
    return (description == "" ? "blank....." : description);
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
        <h3 className={styles.sectionTitle}>Basic information::</h3>
        <h3 className={styles.sectionSubTitle}>Profile Name::</h3>
        <h5 className={styles.sectionText}>{getProfileName()}</h5>
        <h3 className={styles.sectionSubTitle}>Organization</h3>
        <h5 className={styles.sectionText}>{getOrganization()}</h5>
        <h3 className={styles.sectionSubTitle}>Description</h3> 
        <h5 className={styles.sectionText}>{getDescription()}</h5>
      </div>
    );
  }

  function NetworkInfoSection() {
    return (
      <div>
            <h3 className={styles.sectionTitle}>Network information</h3>
            <h3 className={styles.sectionSubTitle}>Name</h3>
            <h5 className={styles.sectionText}>{getNetworkName()}</h5>
            <h3 className={styles.sectionSubTitle}>Hidden network</h3>
            <h5 className={styles.sectionText}>{getNetworkHiddenStatus()}</h5>
            <h3 className={styles.sectionSubTitle}>WIFI MAC adress randomization</h3>
            <h5 className={styles.sectionText}>{getWifiMacAddress()}</h5>
            <h3 className={styles.sectionSubTitle}>Proxy</h3>
            <h5 className={styles.sectionText}>{getProxy()}</h5>
            <h3 className={styles.sectionSubTitle}>Security</h3>
            <h5 className={styles.sectionText}>{getSecurity()}</h5>
            <h3 className={styles.sectionSubTitle}>EAP method</h3>
            <h5 className={styles.sectionText}>{getEAP()}</h5>
            <h3 className={styles.sectionSubTitle}>Password</h3>
            <h5 className={styles.sectionText}>{getPassword()}</h5>
            <h3 className={styles.sectionSubTitle}>Phase 2 authetication</h3>
            <h5 className={styles.sectionText}>{getPhase2Auth()}</h5>
            <h3 className={styles.sectionSubTitle}>CA certificate</h3>
            <h5 className={styles.sectionText}>{getCACertificate()}</h5>
            <h3 className={styles.sectionSubTitle}>Proxy</h3>
            <h5 className={styles.sectionText}>{getProxy()}</h5>
            <h3 className={styles.sectionSubTitle}>User certificate</h3>
            <h5 className={styles.sectionText}>{getUserCertificate()}</h5>
      </div>
    );
  }

  function LegalInfoSection() {
    return (
      <div>
            <h3 className={styles.sectionTitle}>Legal information</h3>
            <h3 className={styles.sectionSubTitle}>EULA title</h3>
            <h5 className={styles.sectionText}>{getEulaTitle()}</h5>
            <h3 className={styles.sectionSubTitle}>EULA URL</h3>
            <h5 className={styles.sectionText}>{getEulaUrl()}</h5>
      </div>
    );
  }

  function DeviceOwnerInfo() {
    return (
      <div>
            <h3 className={styles.sectionTitle}>Device Owner profile information</h3>
            <h3 className={styles.sectionSubTitle}>Device owner EMM</h3>
            <h5 className={styles.sectionText}>{getData()}</h5>
            <h3 className={styles.sectionSubTitle}>Device Owner APK download URL</h3>
            <h5 className={styles.sectionText}>{getData()}</h5>
            <h3 className={styles.sectionSubTitle}>Admin package name</h3>
            <h5 className={styles.sectionText}>{getData()}</h5>
            <h3 className={styles.sectionSubTitle}>Admin package signature checksum</h3>
            <h5 className={styles.sectionText}>{getData()}</h5>
            <h3 className={styles.sectionSubTitle}>Device Owner profile server URI</h3>
            <h5 className={styles.sectionText}>{getData()}</h5>
            <h3 className={styles.sectionSubTitle}>Custom JSON data</h3>
            <h5 className={styles.sectionText}>{getData()}</h5>
            <h3 className={styles.sectionSubTitle}>Root/Intermediate certificate</h3>
            <h5 className={styles.sectionText}>{getData()}</h5>            
      </div>
    );
  }
  
  function DeviceConfigInfoSection() {
    return (
      <div>
            <h3 className={styles.sectionTitle}>Device and Peripheral Configuration</h3>
            <h3 className={styles.sectionSubTitle}>Device and Peripheral Configuration</h3>
            <h5 className={styles.sectionText}>{getData()}</h5> 
            <h3 className={styles.sectionSubTitle}>Knox service plug-in installation</h3>
            <h5 className={styles.sectionText}>{getData()}</h5> 
            <h3 className={styles.sectionSubTitle}>Pacakage name</h3>
            <h5 className={styles.sectionText}>{getData()}</h5> 
            <h3 className={styles.sectionSubTitle}>Pacakage signing key</h3>
            <h5 className={styles.sectionText}>{getData()}</h5> 
      </div>
    );
  }

  function AppConfigInfoSection() {
    return (
      <div>
            <h3 className={styles.sectionTitle}>Application Configuration</h3>
            <h3 className={styles.sectionSubTitle}>Package name</h3>
            <h5 className={styles.sectionText}>{getData()}</h5>
            <h3 className={styles.sectionSubTitle}>Package signing key</h3>
            <h5 className={styles.sectionText}>{getData()}</h5>
            <h3 className={styles.sectionSubTitle}>Package download URL</h3>
            <h5 className={styles.sectionText}>{getData()}</h5>
      </div>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('goto qr page');
  
    history.push(`.${CreationRoutes.GENERATE_QR}`);
  };

  return (
    <div>
    <div className={styles.pageContainer}>
      
      <div className={styles.header}>
          <h1 className={styles.pageTitle}>Summary</h1>
          <h2 className={styles.pageSubTitle}>Check your information.</h2>
      </div>

      <form id="summary_form" onSubmit={handleSubmit}>

      <div className={styles.details}>

          <div className={styles.firstSection}>
            <BasicInfoSection />
            <NetworkInfoSection />
          </div>

          <div className={styles.secondSection}>
            <LegalInfoSection />
            <DeviceOwnerInfo  />
          </div>

          <div className={styles.thirdSection}>
            <DeviceConfigInfoSection />
            <AppConfigInfoSection />
          </div>     
      </div>
      </form>

      <br />
      <br />          
      {/* Footer(button) */}
      <div className={styles.footer}>    

        <Link to={routes.LIST}>
            <button type="button">RESET</button>
        </Link>

        <Link to={`.${CreationRoutes.GENERATE_QR}`}>
            <button type="submit"> Generate QR code</button>
        </Link>

        
        {/* <CustomButton form="summary_form" type="submit" text="Generate QR code" />
        <Link to={`.${CreationRoutes.GENERATE_QR}`}>
          <CustomButton type="button" text="reset" />
        </Link> */}

        

        {/* <div className={styles.buttonContainer}>
          <CustomButton form="summary_form" type="submit" text="Generate QR code" />

        </div> 
          <Link to={routes.LIST}>
            <CustomButton text="Reset" />
          </Link>

          <Link to={`.${CreationRoutes.WIFI}`}>
              <button type="button">Go WIFI</button>
          </Link>
          
          <Link to={`.${CreationRoutes.GENERATE_QR}`}>
              <button type="button">QR PAGE</button>
          </Link>           */}
      </div>

      

    </div>
  </div>
  );
}
