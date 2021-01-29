import React, { useEffect, FormEvent, useRef } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import DeviceParams from './DeviceParams';
import DeviceRoutes from './DeviceRoutes.json';
import routes from '../../../constants/routes.json';
import { saveAsComplete } from '../emm/CreationUtils';
import styles from './Styles.css';
import PaginationIndicator from '../../../components/PaginationIndicator';
import CustomButton from '../../../components/CustomButton';
import cancel from '../../../../resources/icons/cancel/cancel.png';
import add from '../../../../resources/icons/add/add.png';
import back from '../../../../resources/icons/back/back.png';
import {
  CONTINUE,
  GENERAL_CONFIG_FORM_STRINGS,
  DEVICE_OWNER_SUMMARY_FORM_STRINGS,
} from '../../../constants/uiStrings';
import { check } from 'prettier';

export default function Summary({ rootJson }: DeviceParams) {
  const history = useHistory();
  const { url, path } = useRouteMatch();
  // const refBeforFormat = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    console.log(
      `Summary url=${url} path=${path} json=${JSON.stringify(rootJson)}`
    );
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const beforeFormat = rootJson;
    saveAsComplete(beforeFormat, beforeFormat);

    history.replace(routes.LIST);
  };

  const onPressBack = () => {
    history.push(`.${DeviceRoutes.GENERAL}`);
  };

  const onPressCancel = () => {
    history.replace(routes.LIST);
  };

  function HeaderSection() {
    return (
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
          <h3 className={styles.pageTitle}>
            {DEVICE_OWNER_SUMMARY_FORM_STRINGS.PAGE_TITLE}
          </h3>
          <PaginationIndicator noOfItems={5} selectedIndex={5} />
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
    );
  }

  function TitleSection() {
    return (
      <div className={styles.sectionContainer}>
        <h1 className={styles.title}>
          {DEVICE_OWNER_SUMMARY_FORM_STRINGS.FORM_TITLE}
        </h1>
        <h2 className={styles.subText}>
          {DEVICE_OWNER_SUMMARY_FORM_STRINGS.SUB_TEXT}
        </h2>
      </div>
    );
  }

  function FooterSection() {
    return (
      <div className={styles.buttonContainer}>
        <div style={{ padding: '10px' }}>
          <CustomButton
            type="button"
            text={DEVICE_OWNER_SUMMARY_FORM_STRINGS.BUTTON_RESET}
            backgroundColor="#ffffff"
            // onClick={() => resetPopup?.showPopup()}
          />
        </div>
        <div style={{ padding: '10px' }}>
          <CustomButton
            form="summary_form"
            type="submit"
            text={DEVICE_OWNER_SUMMARY_FORM_STRINGS.BUTTON_GENERATE}
            width="135px"
          />
        </div>
      </div>
    );
  }

  function getTargetValue(target: string, isCapital: boolean) {
    let retValue = 'Empty Value !';
    if (rootJson[target] == undefined) {
      retValue = 'Empty Value !';
    } else if (rootJson[target] == 'true') {
      retValue = isCapital ? 'Enabled' : 'enabled';
    } else if (rootJson[target] == 'false') {
      retValue = isCapital ? 'Disabled' : 'disabled';
    } else {
      retValue = rootJson[target];
    }
    return retValue;
  }

  function DisplayConfigPageScreenTimeout() {
    let retValue = '';
    if (
      rootJson['screenTimeout'] == undefined ||
      rootJson['screenTimeout'] == 'false'
    ) {
      retValue = 'Disabled.';
    } else {
      retValue =
        'After ' +
        getTargetValue('screenTimeoutValue', false) +
        ' seconds of inactivity.';
    }

    return <h1 className={styles.sectionText}>{retValue}</h1>;
  }

  function DisplayConfigPageLock() {
    let retValue = '';
    if (
      rootJson['lockAutomatically'] == undefined ||
      rootJson['lockAutomatically'] == 'false'
    ) {
      retValue = 'Disabled.';
    } else {
      retValue =
        'Enabled, Lock the phone ' +
        getTargetValue('lockAutomaticallyValue', false) +
        ' seconds after the screen turns off automatically, except when kept unlocked by Smart lock.';
    }

    return <h1 className={styles.sectionText}>{retValue}</h1>;
  }

  function DisplayConfigPageBrightness() {

    let brightness = 'Brightness is '+getTargetValue('brightnessSlider', false)+'.';
    let adaptive = 'Adaptive brigtness is ' + getTargetValue('brightnessSlider', false) +'.';

    return (
      <div>
        <h1 className={styles.sectionText}>{brightness}</h1>
        <h1 className={styles.sectionText}>{adaptive}</h1>
      </div>
    );
  }

  function DisplayConfigPageFont() {
    let retVal = 'Font size is ' + getTargetValue('fontSizeSlider', false);
     return (
      <h1 className={styles.sectionText}>{retVal}</h1>
     );
  }

  function DisplayConfigPageTouch() {
    let retVal = 'Touch sesitivity is ' + getTargetValue('touchSensitivity', false);
     return (
      <h1 className={styles.sectionText}>{retVal}</h1>
     );
  }

  function DisplayConfigurationSection() {
    return (
      <div className={styles.displayConfigSection}>
        <h1 className={styles.sectionTitle}>
          {DEVICE_OWNER_SUMMARY_FORM_STRINGS.DISLAY_TITLE}
        </h1>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>
            {DEVICE_OWNER_SUMMARY_FORM_STRINGS.DISLAY_SCREEN}
          </h1>
          <DisplayConfigPageScreenTimeout />
        </div>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>
            {DEVICE_OWNER_SUMMARY_FORM_STRINGS.DISLAY_LOCK}
          </h1>
          <DisplayConfigPageLock />
        </div>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>
            {DEVICE_OWNER_SUMMARY_FORM_STRINGS.DISPLAY_BRIGTHNESS}
          </h1>
          <DisplayConfigPageBrightness />
        </div>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>
            {DEVICE_OWNER_SUMMARY_FORM_STRINGS.DISPLAY_FONT}
          </h1>
          <DisplayConfigPageFont />
        </div>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>
            {DEVICE_OWNER_SUMMARY_FORM_STRINGS.DISPLAY_TOUCH}
          </h1>
          <DisplayConfigPageTouch />
        </div>
      </div>
    );
  }

  function KeyConfigurationSection() {
    return (
      <div className={styles.keyConfigSection}>
        <h1 className={styles.sectionTitle}>
          {DEVICE_OWNER_SUMMARY_FORM_STRINGS.KEY_TITLE}
        </h1>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>
            {DEVICE_OWNER_SUMMARY_FORM_STRINGS.KEY_NAV}
          </h1>
          <h1 className={styles.sectionText}>Type: Buttons</h1>
          <h1 className={styles.sectionText}>
            Button order: Back / Home / Apps
          </h1>
          <h1 className={styles.sectionText}>
            Google assistant is enable, Long press on home key to launch it.
          </h1>
        </div>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>
            {DEVICE_OWNER_SUMMARY_FORM_STRINGS.KEY_XCOVER}
          </h1>
          <h1 className={styles.sectionText}>MS team</h1>
        </div>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>
            {DEVICE_OWNER_SUMMARY_FORM_STRINGS.KEY_TOP}
          </h1>
          <h1 className={styles.sectionText}>Custome intent</h1>
          <h1 className={styles.sectionText}>Package name: test.test.com</h1>
          <h1 className={styles.sectionText}>
            Short presss: com.sec.android.app.camera/com.sec.android.a…
          </h1>
          <h1 className={styles.sectionText}>
            Long presss: com.sec.android.app.camera/com.sec.android.a…
          </h1>
        </div>
      </div>
    );
  }

  function GeneralConfigPageNFC() {
      let retVal = rootJson['nfc'];
      if(retVal==='on') retVal = 'NFC is enabled.';
      else retVal = 'NFC is disabled.';
      return (
        <h1 className={styles.sectionText}>{retVal}</h1>
      );
  }

  function GeneralConfigPageWifiBlock() {
    let retVal = rootJson['wifiblock_switch'];
    if(retVal ==='on') retVal = 'Enabled, ';
    else retVal = 'Disabled, ';
    retVal += 'Prevent to block a specific AP connection because of adding to blocklist accidentally.'
    let ssidList = '';
    if(rootJson['ssid-0'] != undefined) ssidList += rootJson['ssid-0'];
    if(rootJson['ssid-1'] != undefined) ssidList += ', ' + rootJson['ssid-1'];
    if(rootJson['ssid-2'] != undefined) ssidList += ', ' + rootJson['ssid-2'];
    if(rootJson['ssid-3'] != undefined) ssidList += ', ' + rootJson['ssid-3'];
    if(rootJson['ssid-4'] != undefined) ssidList += ', ' + rootJson['ssid-4'];

    if(ssidList.length > 1) {
        ssidList = 'SSID: ' + ssidList;
        return (
          <div>
            <h1 className={styles.sectionText}>{retVal}</h1>
            <h1 className={styles.sectionText}>{ssidList}</h1>
          </div>
        );
    }

    return (
      <div>
        <h1 className={styles.sectionText}>{retVal}</h1>
      </div>
    );
  }

  function GeneralConfigPageSound() {

    const isSound = rootJson['setLanguageValue'];

    if(isSound == undefined || isSound == 'off') {
      const status = 'Disabled.';
      return (
        <h1 className={styles.sectionText}>{status}</h1>
      );
    }

    const media = 'Media volume is ' +  getTargetValue('volumeMedia', false);
    const notification = 'Notification volume is ' +getTargetValue('volumeNotification', false);
    const system = 'System volume is ' + getTargetValue('volumeSystem', false);
    const ringtone = 'Ringtone volume is ' + getTargetValue('volumeRingtone', false);

    return (
      <div>
        <h1 className={styles.sectionText}>{media}</h1>
        <h1 className={styles.sectionText}>{notification}</h1>
        <h1 className={styles.sectionText}>{system}</h1>
        <h1 className={styles.sectionText}>{ringtone}</h1>
      </div>
    );
  }

  function GeneralConfigPageSystem() {
    let language = 'Language: ' + getTargetValue('setLanguageValue', false);
    let country = 'Country: ' + getTargetValue('setCountryValue', false);
    return (
      <div>
        <h1 className={styles.sectionText}>{language}</h1>
        <h1 className={styles.sectionText}>{country}</h1>
      </div>
    );
  }

  function GeneralConfigurationSection() {
    return (
      <div className={styles.generalConfigSection}>
        <h1 className={styles.sectionTitle}>
          {DEVICE_OWNER_SUMMARY_FORM_STRINGS.GENERAL_TITLE}
        </h1>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>
            {DEVICE_OWNER_SUMMARY_FORM_STRINGS.GENERAL_NFC}
          </h1>
          <GeneralConfigPageNFC />
        </div>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>
            {DEVICE_OWNER_SUMMARY_FORM_STRINGS.GENERAL_WIFI}
          </h1>
          <GeneralConfigPageWifiBlock />
        </div>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>
            {DEVICE_OWNER_SUMMARY_FORM_STRINGS.GENERAL_SOUND}
          </h1>
          <GeneralConfigPageSound />
        </div>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>
            {DEVICE_OWNER_SUMMARY_FORM_STRINGS.GENERAL_SYSTEM}
          </h1>
          <GeneralConfigPageSystem />
        </div>
      </div>
    );
  }

  function PageContents() {
    return (
      <div className={styles.sectionContainerRow}>
        <DisplayConfigurationSection />
        <div className={styles.verticalLine} />
        <KeyConfigurationSection />
        <div className={styles.verticalLine} />
        <GeneralConfigurationSection />
      </div>
    );
  }

  return (
    <div data-tid="container" className={styles.container}>
      <div className={styles.formContainer}>
        <HeaderSection />
        <TitleSection />
        <form
          id="summary_form"
          onSubmit={handleSubmit}
          className={styles.summaryForm}
        >
          <PageContents />
        </form>
      </div>
      <FooterSection />
    </div>
  );
}
