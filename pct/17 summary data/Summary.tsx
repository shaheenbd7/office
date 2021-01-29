import React, { useEffect, FormEvent, useRef, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { ipcRenderer } from 'electron';

import DeviceParams from './DeviceParams';
import DeviceRoutes from './DeviceRoutes.json';
import routes from '../../../constants/routes.json';
import { POPUP_CONSTANTS } from '../../../constants/uiConstants';
import { saveAsComplete } from '../emm/CreationUtils';
import styles from './Styles.css';
import PaginationIndicator from '../../../components/PaginationIndicator';
import CustomButton from '../../../components/CustomButton';
import { saveAsDraft, storeFormIntoJson } from '../emm/CreationUtils';
import CloseButtonWithPopup from '../../../components/CustomPopup/CloseButtonWithPopup';
import cancel from '../../../../resources/icons/cancel/cancel.png';
import add from '../../../../resources/icons/add/add.png';
import back from '../../../../resources/icons/back/back.png';
import Popup, { PopupInfo } from '../../../components/CustomPopup/Popup';

import {
  CONTINUE,
  GENERAL_CONFIG_FORM_STRINGS,
  DEVICE_OWNER_SUMMARY_FORM_STRINGS,
  RESET_DATA,
  RESET_POPUP_DESCRIPTION,
  RESET,
  CANCEL,
} from '../../../constants/uiStrings';

export default function Summary({ rootJson }: DeviceParams) {
  const history = useHistory();
  const { url, path } = useRouteMatch();
  // const refBeforFormat = useRef<HTMLTextAreaElement>(null);

  const [resetPopup, setResetPopup] = useState<Popup>();

  useEffect(() => {
    const popupInfo: PopupInfo = {
      height: POPUP_CONSTANTS.HEIGHT,
      width: POPUP_CONSTANTS.WIDTH,
      titleBarText: RESET_DATA,
      descriptionText: RESET_POPUP_DESCRIPTION,
      positiveButtonText: RESET,
      negativeButtonText: CANCEL,
      // Both of these should not conflict with any existing IPC Channel
      positiveActionIpcChannel: 'resetProfileSummaryPage',
      negativeActionIpcChannel: 'hidePopupSummaryPage',
    };

    const popup = new Popup(popupInfo);
    setResetPopup(popup);

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
      `Summary url=${url} path=${path} json=${JSON.stringify(rootJson)}`
    );
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const beforeFormat = rootJson;
    saveAsComplete(beforeFormat, beforeFormat);

    history.replace(routes.LIST);
  };

  function onPressBack() {
    history.push(`.${DeviceRoutes.GENERAL}`);
  }

  const onPressCancel = () => {
    const form = document.querySelector('form');
    storeFormIntoJson(form, rootJson);
    saveAsDraft(rootJson);

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
        <CloseButtonWithPopup
          saveAsDraftCallback={onPressCancel}
          fromDeviceConfigurationProfile
        />
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
            onClick={() => resetPopup?.showPopup()}
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

  function KeyConfigPageNavBar() {

    let navType = 'Type: ' + getTargetValue('navigation_type', false);
    let buttonOrder = 'Button order: ' + getTargetValue('button_order', false);
    let assitant = 'Google assistant is '+  getTargetValue('googleAssistant', false) + ', Long press on home key to launch it.';

    if (rootJson['googleAssistant'] == undefined ||  getTargetValue('navigation_type', false) == 'Swipe gestures') {
      return (
        <div>
          <h1 className={styles.sectionText}>{navType}</h1>
          <h1 className={styles.sectionText}>{buttonOrder}</h1>
        </div>
      );
    }

    return (
      <div>
        <h1 className={styles.sectionText}>{navType}</h1>
        <h1 className={styles.sectionText}>{buttonOrder}</h1>
        <h1 className={styles.sectionText}>{assitant}</h1>
      </div>
    );
  }

  function KeyConfigPageXCover() {
    let xCoverKey = rootJson['xCoverKey'];

    if (xCoverKey == 'Ms teams') {
      return (
        <div>
          <h1 className={styles.sectionText}>{xCoverKey}</h1>
        </div>
      );
    } else if (xCoverKey == 'Custom intent') {
      let pkgName =
        'Package name: ' + getTargetValue('keyConfigXcoverkeyPkgname', false);
      let pressed =
        'Short press: ' + getTargetValue('keyConfigXcoverkeyPressed', false);
      let released =
        'Long press: ' + getTargetValue('keyConfigXcoverkeyReleased', false);
      return (
        <div>
          <h1 className={styles.sectionText}>{xCoverKey}</h1>
          <h1 className={styles.sectionText}>{pkgName}</h1>
          <h1 className={styles.sectionText}>{pressed}</h1>
          <h1 className={styles.sectionText}>{released}</h1>
        </div>
      );
    } else if (xCoverKey == 'APP launch') {
      let shortPkgName =
        'Package name: ' +
        getTargetValue('keyConfigXcoverkeyShortPkgname', false);
      let shortPress =
        'Short press: ' + getTargetValue('keyConfigXcoverkeyShortPress', false);
      let longPkgName =
        'Package name: ' +
        getTargetValue('keyConfigXcoverkeyLongPkgname', false);
      let longPress =
        'Long press: ' + getTargetValue('keyConfigXcoverkeyLongPress', false);
      return (
        <div>
          <h1 className={styles.sectionText}>{xCoverKey}</h1>
          <h1 className={styles.sectionText}>{shortPkgName}</h1>
          <h1 className={styles.sectionText}>{shortPress}</h1>
          <h1 className={styles.sectionText}>{longPkgName}</h1>
          <h1 className={styles.sectionText}>{longPress}</h1>
        </div>
      );
    } else {
      return (
        <div>
          <h1 className={styles.sectionText}>{xCoverKey}</h1>
        </div>
      );
    }
  }

  function KeyConfigPageTop() {

    let xCoverKey = rootJson['topKey'];

    if(xCoverKey == undefined) return null;

    if(xCoverKey == 'Custom intent') {
      let pkgName = 'Package name: ' + getTargetValue('keyConfigTopkeyPkgname', false);
      let pressed = 'Short press: ' + getTargetValue('keyConfigTopkeyPressed', false);
      let released = 'Long press: ' + getTargetValue('keyConfigTopkeyReleased', false);
      return (
        <div>
          <h1 className={styles.sectionText}>{xCoverKey}</h1>
          <h1 className={styles.sectionText}>{pkgName}</h1>
          <h1 className={styles.sectionText}>{pressed}</h1>
          <h1 className={styles.sectionText}>{released}</h1>
        </div>
      );
    }
    else if(xCoverKey == 'APP launch') {
      let shortPkgName = 'Package name: ' + getTargetValue('keyConfigTopkeyShortPkgname', false);
      let shortPress = 'Short press: ' + getTargetValue('keyConfigTopkeyShortPress', false);
      let longPkgName = 'Package name: ' + getTargetValue('keyConfigTopkeyLongPkgname', false);
      let longPress = 'Long press: ' + getTargetValue('keyConfigTopkeyLongPress', false);
      return (
        <div>
          <h1 className={styles.sectionText}>{xCoverKey}</h1>
          <h1 className={styles.sectionText}>{shortPkgName}</h1>
          <h1 className={styles.sectionText}>{shortPress}</h1>
          <h1 className={styles.sectionText}>{longPkgName}</h1>
          <h1 className={styles.sectionText}>{longPress}</h1>
        </div>
      );
    }

    return null;
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
          <KeyConfigPageNavBar />
        </div>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>
            {DEVICE_OWNER_SUMMARY_FORM_STRINGS.KEY_XCOVER}
          </h1>
          <KeyConfigPageXCover />
        </div>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>
            {DEVICE_OWNER_SUMMARY_FORM_STRINGS.KEY_TOP}
          </h1>
          <KeyConfigPageTop />
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
