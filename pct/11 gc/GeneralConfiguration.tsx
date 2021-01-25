import React, { useState, useEffect, FormEvent } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import Select from 'react-select';
import Switch from 'react-switch';

import DeviceParams from './DeviceParams';
import DeviceRoutes from './DeviceRoutes.json';
import routes from '../../../constants/routes.json';
import styles from '../emm/Creation.css';
import PaginationIndicator from '../../../components/PaginationIndicator';
import CustomButton from '../../../components/CustomButton';
import cancel from '../../../../resources/icons/cancel/cancel.png';
import add from '../../../../resources/icons/add/add.png';
import back from '../../../../resources/icons/back/back.png';
import LanguageList from '../../../constants/languageList';
import CountryList from '../../../constants/countryList';
import {
  CONTINUE,
  GENERAL_CONFIG_FORM_STRINGS,
} from '../../../constants/uiStrings';

export default function GeneralConfiguration({ rootJson }: DeviceParams) {
  const history = useHistory();
  // const { url, path } = useRouteMatch();
  const [isNFCEnabled, setIsNFCEnabled] = useState<boolean>(false);
  const [isWifiBlocklist, setIsWifiBlocklist] = useState<boolean>(false);
  const [countBlockList, setCountBlockList] = useState(0);

  function changeNFCStatus() {
    setIsNFCEnabled((prevValue) => !prevValue);
  }

  function changeWifiBlocklist() {
    if (isWifiBlocklist) {
      setCountBlockList(0);
    }
    setIsWifiBlocklist((prevValue) => !prevValue);
  }

  useEffect(() => {
    console.log('Rendered');
    // console.log(
    //   `GeneralConfiguration url=${url} path=${path} json=${JSON.stringify(
    //     rootJson
    //   )}`
    // );
  });

  const [state, setState] = React.useState({
    nfcEnabled: true,
    disallowToAddWifiToBlocklist: false,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);

    data.forEach((value: FormDataEntryValue, key: string) => {
      rootJson[key] = value;
    });

    history.push(`.${DeviceRoutes.SUMMARY}`);
  };

  const onPressBack = () => {
    history.replace(routes.LIST);
  };

  const onPressCancel = () => {
    history.replace(routes.LIST);
  };

  function NFCSection() {
    return (
      <div className={styles.sectionContainer} style={{ marginBottom: '20px' }}>
        <p className={styles.form} style={{ margin: '0px' }}>
          <p
            className={styles.formName}
            style={{ marginBottom: '10px', width: '440px' }}
          >
            {GENERAL_CONFIG_FORM_STRINGS.NFC}
          </p>
          <div className={styles.switchContainer}>
            <Switch
              id="nfc_switch"
              name="nfc"
              onChange={changeNFCStatus}
              checked={isNFCEnabled}
              height={16}
              width={30}
              uncheckedIcon={false}
              checkedIcon={false}
            />
            <label
              htmlFor="nfc_enbled"
              className={styles.buttonLabel}
              style={{ marginLeft: '10px' }}
            >
              {isNFCEnabled ? 'Enable' : 'Disable'}
            </label>
          </div>
        </p>
      </div>
    );
  }

  function onClickAddSSID() {
    setCountBlockList((prevValue) => prevValue + 1);
    console.log('Count Block List: ' + countBlockList);
  }

  function AddSSIDButtonSection() {
    return (
      <div className={styles.switchContainer} style={{ marginTop: '10px' }}>
        <div
          style={{ marginRight: '10px', alignItems: 'center' }}
          onClick={onClickAddSSID}
          onKeyPress={onClickAddSSID}
          role="button"
          tabIndex={0}
        >
          <img src={add} alt="Add" className={styles.addButtonImg} />
        </div>
        <p className={styles.label} style={{ margin: '0px', height: '16px' }}>
          ADD SSID
        </p>
      </div>
    );
  }

  function SSIDSectionOne() {
    return (
      <div style={{ marginTop: '20px' }}>
        <p className={styles.form} style={{ margin: '0px' }}>
          <p className={styles.formName} style={{ marginBottom: '10px' }}>
            SSID
          </p>
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <input
            name="ssid_one"
            type="text"
            className={styles.textInputBox}
            style={{ width: '400px' }}
            placeholder="Enter SSID"
          />
          <img
            src={cancel}
            alt="Delete"
            className={styles.addButtonImg}
            style={{ marginLeft: '10px' }}
          />
        </div>
      </div>
    );
  }

  function WIFIBlockListSection() {
    return (
      <div className={styles.sectionContainer} style={{ marginBottom: '20px' }}>
        <p className={styles.form} style={{ margin: '0px' }}>
          <p className={styles.formName} style={{ marginBottom: '10px' }}>
            {GENERAL_CONFIG_FORM_STRINGS.WIFI_DISALLOW}
          </p>
          <div className={styles.switchContainer}>
            <Switch
              id="wifiblock_switch"
              name="wifiblock_switch"
              onChange={changeWifiBlocklist}
              checked={isWifiBlocklist}
              height={16}
              width={30}
              uncheckedIcon={false}
              checkedIcon={false}
            />
            <label
              htmlFor="wifi_blocklist"
              className={styles.buttonLabel}
              style={{ height: '40px', width: '403px', marginLeft: '10px' }}
            >
              {GENERAL_CONFIG_FORM_STRINGS.WIFI_PREVENT}
            </label>
          </div>
          {isWifiBlocklist ? <SSIDSectionOne /> : null}
          {countBlockList > 0 ? <SSIDSectionOne /> : null}
          {countBlockList > 1 ? <SSIDSectionOne /> : null}
          {countBlockList > 2 ? <SSIDSectionOne /> : null}
          {countBlockList > 3 ? <SSIDSectionOne /> : null}
          {isWifiBlocklist && countBlockList < 4 ? (
            <AddSSIDButtonSection />
          ) : null}
        </p>
      </div>
    );
  }

  function SystemLanguageCountrySection() {
    return (
      <div className={styles.sectionContainer} style={{ marginBottom: '20px' }}>
        <p className={styles.form} style={{ margin: '0px' }}>
          <p className={styles.formName}>
            {GENERAL_CONFIG_FORM_STRINGS.SYSTEM_LANGUAGE_COUNTRY}
          </p>
          <div className={styles.labelContainer}>
            <label htmlFor="language" className={styles.label}>
              {GENERAL_CONFIG_FORM_STRINGS.SET_LANGUAGE}
            </label>
          </div>
          <div className={styles.dropDownSelector}>
            <Select
              name="language"
              options={LanguageList}
              defaultValue={LanguageList[0]}
              components={{
                IndicatorSeparator: () => null,
              }}
            />
          </div>
          <div className={styles.labelContainer}>
            <label htmlFor="country" className={styles.label}>
              {GENERAL_CONFIG_FORM_STRINGS.SET_COUNTRY}
            </label>
          </div>
          <div className={styles.dropDownSelector}>
            <Select
              name="country"
              options={CountryList}
              defaultValue={CountryList[0]}
              components={{
                IndicatorSeparator: () => null,
              }}
            />
          </div>
        </p>
      </div>
    );
  }

  function ConditionSection() {
    return (
      <div>
        <div className={styles.formfield}>
          <div className={styles.labelContainer}>
            <label htmlFor="condition_label_if" className={styles.label}>
              {GENERAL_CONFIG_FORM_STRINGS.IF}
            </label>
          </div>
          <input
            name="condition_if"
            type="text"
            className={styles.textInputBox}
            placeholder={GENERAL_CONFIG_FORM_STRINGS.PLACEHOLDER_KEY_IF}
          />
        </div>
        <div className={styles.formfield}>
          <div className={styles.labelContainer}>
            <label htmlFor="condition_label_then" className={styles.label}>
              {GENERAL_CONFIG_FORM_STRINGS.THEN}
            </label>
          </div>
          <input
            name="condition_then"
            type="text"
            className={styles.textInputBox}
            placeholder={GENERAL_CONFIG_FORM_STRINGS.PLACEHOLDER_KEY_THEN}
          />
        </div>
      </div>
    );
  }

  function AddNewConditionButtonSection() {
    return (
      <div className={styles.switchContainer} style={{ marginTop: '10px' }}>
        <div
          style={{ marginRight: '10px', alignItems: 'center' }}
          role="button"
          tabIndex={0}
        >
          <img src={add} alt="Add" className={styles.addButtonImg} />
        </div>
        <p className={styles.label} style={{ margin: '0px', height: '16px' }}>
          {GENERAL_CONFIG_FORM_STRINGS.ADD_NEW_CONDITIONS}
        </p>
      </div>
    );
  }

  function KeyboardPerAppSection() {
    return (
      <div className={styles.sectionContainer}>
        <p className={styles.form} style={{ margin: '0px' }}>
          <p className={styles.formName}>
            {GENERAL_CONFIG_FORM_STRINGS.KEYBOARD_PER_APP}
          </p>
          <ConditionSection />
          <AddNewConditionButtonSection />
        </p>
      </div>
    );
  }

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
            {GENERAL_CONFIG_FORM_STRINGS.PAGE_TITLE}
          </h3>
          <PaginationIndicator noOfItems={4} selectedIndex={3} />
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
        <h1 className={styles.title}>General configuration</h1>
        <h2 className={styles.subText}>Select and configure category below.</h2>
      </div>
    );
  }

  return (
    <div data-tid="container" className={styles.container}>
      <div className={styles.formContainer}>
        <HeaderSection />
        <TitleSection />
        <form
          id="general_config_form"
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <NFCSection />
          <WIFIBlockListSection />
          <SystemLanguageCountrySection />
          <KeyboardPerAppSection />
        </form>
      </div>
      <div className={styles.buttonContainer}>
        <CustomButton
          form="general_config_form"
          type="submit"
          text={CONTINUE}
        />
      </div>
    </div>
  );
}
