import React, { useState, useEffect, FormEvent, CSSProperties, } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Select from 'react-select';
import Switch from 'react-switch';
import DeviceParams from './DeviceParams';
import DeviceRoutes from './DeviceRoutes.json';
import routes from '../../../constants/routes.json';
import styles from './Styles.css';
import PaginationIndicator from '../../../components/PaginationIndicator';
import CustomButton from '../../../components/CustomButton';
import { saveAsDraft, storeFormIntoJson } from '../emm/CreationUtils';
import CloseButtonWithPopup from '../../../components/CustomPopup/CloseButtonWithPopup';
import cancel from '../../../../resources/icons/cancel/cancel.png';
import add from '../../../../resources/icons/add/add.png';
import back from '../../../../resources/icons/back/back.png';
import info from '../../../../resources/icons/info/info.png';
import LanguageList from '../../../constants/languageList';
import CountryList from '../../../constants/countryList';
import {
  CONTINUE,
  GENERAL_CONFIG_FORM_STRINGS,
} from '../../../constants/uiStrings';

export default function GeneralConfiguration({ rootJson }: DeviceParams) {
  const history = useHistory();
  const { url, path } = useRouteMatch();
  const [isNFCEnabled, setIsNFCEnabled] = useState<boolean>(true);
  const [isWifiBlocklist, setIsWifiBlocklist] = useState<boolean>(false);
  const initialSSIDList = [{ sid: 1 }];
  const [ssidList, setSSIDList] = useState(initialSSIDList);
  const defaultValueMedia = 0;
  const defaultValueNotification = 50;
  const defaultValueSystem = 0;
  const defaultValueRingtone = 50;
  const [volumeLevelMedia, setVolumeLevelMedia] = useState<number>(
    defaultValueMedia
  );
  const [
    volumeLevelNotification,
    setVolumeLevelNotification,
  ] = useState<number>(defaultValueNotification);
  const [volumeLevelSystem, setVolumeLevelSystem] = useState<number>(
    defaultValueSystem
  );
  const [volumeLevelRingtone, setVolumeLevelRingtone] = useState<number>(
    defaultValueRingtone
  );
  const [isSoundConfigEnabled, setIsSoundConfigEnabled] = useState<boolean>(
    false
  );

  const onChangeVolumeSliderMedia = (event: any, newValue: number) => {
    setVolumeLevelMedia(newValue);
  };
  const onChangeVolumeSliderNotification = (event: any, newValue: number) => {
    setVolumeLevelNotification(newValue);
  };
  const onChangeVolumeSliderSystem = (event: any, newValue: number) => {
    setVolumeLevelSystem(newValue);
  };
  const onChangeVolumeSliderRingtone = (event: any, newValue: number) => {
    setVolumeLevelRingtone(newValue);
  };
  const changeSoundConfig = () => setIsSoundConfigEnabled((prev) => !prev);

  function changeNFCStatus() {
    setIsNFCEnabled((prevValue) => !prevValue);
  }

  function changeWifiBlocklist() {
    if (isWifiBlocklist) {
      setSSIDList(() => initialSSIDList);
    }
    setIsWifiBlocklist((prevValue) => !prevValue);
  }

  function onClickAddSSID() {
    setSSIDList((preValue) => [...preValue, { sid: Math.random() }]);
  }

  function onClickDeleteSSID(idx: number) {
    console.log(idx);
    if (ssidList.length > 1) {
      setSSIDList(() => ssidList.filter((s, sindex) => idx !== sindex));
    }
  }

  const VolumeSlider = withStyles({
    root: {
      color: '#37b3ff',
      height: '2px',
      padding: '7px 0',
      width: '400px',
    },
    thumb: {
      height: 8,
      width: 8,
      backgroundColor: '#37b3ff',
      marginTop: -4,
      marginLeft: -4,
    },
    track: {
      height: '2px',
    },
    rail: {
      height: '2px',
      backgroundColor: '#e5e5e5',
    },
  })(Slider);

  const switchInlineStyle: CSSProperties = {
    marginTop: '3px',
  };

  const containerInlineStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };

  const buttonLabelInlineStyle: CSSProperties = {
    height: '40px',
  };

  const sectionHeaderStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  };

  useEffect(() => {
    console.log('Rendered');
    console.log(
      `GeneralConfiguration url=${url} path=${path} json=${JSON.stringify(
        rootJson
      )}`
    );
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
    history.push(`.${DeviceRoutes.KEY}`);
  };

  const onPressCancel = () => {
    const form = document.querySelector('form');
    storeFormIntoJson(form, rootJson);
    saveAsDraft(rootJson);

    history.replace(routes.LIST);
  };

  function NFCSection() {
    return (
      <div>
        <h3 className={styles.formName}>{GENERAL_CONFIG_FORM_STRINGS.NFC}</h3>
        <div className={`${styles.switchContainer} ${styles.mediumMarginTop}`}>
          <div style={switchInlineStyle}>
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
          </div>
          <label htmlFor="nfcSwitch" className={styles.buttonLabel}>
            {isNFCEnabled
              ? GENERAL_CONFIG_FORM_STRINGS.ENABLE
              : GENERAL_CONFIG_FORM_STRINGS.ENABLE}
          </label>
        </div>
      </div>
    );
  }

  function SSIDListSection() {

    return (
      <div className={styles.indentSSID}>
        {ssidList.map((item, idx) => (
          <div key={item.sid}>
            <div className={styles.labelContainer}>
              <label htmlFor="ssid" className={styles.label}>
                 {GENERAL_CONFIG_FORM_STRINGS.SSID}
              </label>
            </div>
            <div style={containerInlineStyle}>
              <input
                name={'ssid-' + idx}
                type="text"
                className={`${styles.indentedWidthSSID} ${styles.textInputBox} `}
                placeholder="Enter SSID"
              />
              <div
                onClick={() => onClickDeleteSSID(idx)}
                onKeyPress={() => onClickDeleteSSID(idx)}
                role="button"
                tabIndex={0}
                className={styles.deleteButtonContainer}
              >
                <img
                  src={cancel}
                  alt="Delete"
                  className={styles.cancel}
                  style={{ marginLeft: '10px' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function AddSSIDButtonSection() {
    return (
      <div className={styles.addSSIDButtonContainer}>
        <div
          style={{
            marginRight: '10px',
            alignItems: 'center',
            marginTop: '20px',
          }}
          onClick={onClickAddSSID}
          onKeyPress={onClickAddSSID}
          role="button"
          tabIndex={0}
        >
          <img src={add} alt="Add" className={styles.addButtonImg} />
        </div>
        <div className={styles.labelContainer}>
          <label htmlFor="ssid" className={styles.label}>
            {GENERAL_CONFIG_FORM_STRINGS.ADD_SSID}
          </label>
        </div>
      </div>
    );
  }

  function WIFIBlockListSection() {

    return (
      <div>
        <div
          className = {styles.largeMarginTop}
          style = {containerInlineStyle}
        >
          <h3 className={`${styles.formName}`}>
            {GENERAL_CONFIG_FORM_STRINGS.WIFI_DISALLOW}
          </h3>
          <img src={info} alt="Info" className={styles.iconInfo} />
        </div>
        <div className={`${styles.switchContainer} ${styles.mediumMarginTop}`}>
          <div style={switchInlineStyle}>
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
          </div>
          <label
            htmlFor="wifiblock_switch"
            className={styles.buttonLabel}
            style={buttonLabelInlineStyle}
          >
            {GENERAL_CONFIG_FORM_STRINGS.WIFI_PREVENT}
          </label>
        </div>
        {isWifiBlocklist ? <SSIDListSection /> : null}
        {isWifiBlocklist && ssidList.length < 5 ? (
          <AddSSIDButtonSection />
        ) : null}
      </div>
    );
  }

  function SystemLanguageCountrySection() {

    return (
      <div style={sectionHeaderStyle}>
        <h3 className={`${styles.formName} ${styles.largeMarginTop}`}>
          {GENERAL_CONFIG_FORM_STRINGS.SYSTEM_LANGUAGE_COUNTRY}
        </h3>
        <div className={styles.labelContainer}>
          <label htmlFor="country" className={styles.label}>
            {GENERAL_CONFIG_FORM_STRINGS.SET_LANGUAGE}
          </label>
        </div>
        <div className={styles.dropDownSelector}>
          <Select
            name="setLanguageValue"
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
            name="setCountryValue"
            options={CountryList}
            defaultValue={CountryList[0]}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
        </div>
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
          <PaginationIndicator noOfItems={5} selectedIndex={4} />
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
          {GENERAL_CONFIG_FORM_STRINGS.FORM_TITLE}
        </h1>
        <h2 className={styles.subText}>
          {GENERAL_CONFIG_FORM_STRINGS.SUB_TEXT}
        </h2>
      </div>
    );
  }

  function FooterSection() {
    return (
      <div className={styles.buttonContainer}>
        <CustomButton
          form="general_config_form"
          type="submit"
          text={CONTINUE}
        />
      </div>
    );
  }

  function SoundSliderSection() {

    return (
      <div className={`${styles.indentSSID}`}>
        <div className={styles.smallMarginBottom}>
          <div className={styles.labelSlideContainer}>
            <h1 className={styles.label}>
              {GENERAL_CONFIG_FORM_STRINGS.SOUND_MEDIA}
            </h1>
            <h1 className={styles.labelSlide}>{volumeLevelMedia}%</h1>
          </div>
          <div>
            <VolumeSlider
              name="volumeMedia"
              value={volumeLevelMedia}
              aria-labelledby="continuous-slider"
              min={0}
              max={100}
              onChange={onChangeVolumeSliderMedia}
            />
          </div>
        </div>
        <div className={styles.smallMarginBottom}>
          <div className={styles.labelSlideContainer}>
            <h1 className={styles.label}>
            {GENERAL_CONFIG_FORM_STRINGS.SOUND_NOTIFICATION}
            </h1>
            <h1 className={styles.labelSlide}>{volumeLevelNotification}%</h1>
          </div>
          <div>
            <VolumeSlider
              name="volumeNotification"
              value={volumeLevelNotification}
              aria-labelledby="continuous-slider"
              min={0}
              max={100}
              onChange={onChangeVolumeSliderNotification}
            />
          </div>
        </div>
        <div className={styles.smallMarginBottom}>
          <div className={styles.labelSlideContainer}>
            <h1 className={styles.label}>
            {GENERAL_CONFIG_FORM_STRINGS.SOUND_SYSTEM}
            </h1>
            <h1 className={styles.labelSlide}>{volumeLevelSystem}%</h1>
          </div>
          <div>
            <VolumeSlider
              name="volumeSystem"
              value={volumeLevelSystem}
              aria-labelledby="continuous-slider"
              min={0}
              max={100}
              onChange={onChangeVolumeSliderSystem}
            />
          </div>
        </div>
        <div className={styles.smallMarginBottom}>
          <div className={styles.labelSlideContainer}>
            <h1 className={styles.label}>
            {GENERAL_CONFIG_FORM_STRINGS.SOUND_RINGTONE}
            </h1>
            <h1 className={styles.labelSlide}>{volumeLevelRingtone}%</h1>
          </div>
          <div>
            <VolumeSlider
              name="volumeRingtone"
              value={volumeLevelRingtone}
              aria-labelledby="continuous-slider"
              min={0}
              max={100}
              onChange={onChangeVolumeSliderRingtone}
            />
          </div>
        </div>
      </div>
    );
  }

  function SoundSection() {

    return (
      <div style={sectionHeaderStyle}>
          <h3 className={`${styles.formName} ${styles.largeMarginTop}`}>
            {GENERAL_CONFIG_FORM_STRINGS.SOUND_TITLE}
          </h3>
        <div className={`${styles.switchContainer} ${styles.mediumMarginTop}`}>
          <div style={switchInlineStyle}>
            <Switch
              id="sound_switch"
              name="sound"
              onChange={changeSoundConfig}
              checked={isSoundConfigEnabled}
              height={16}
              width={30}
              uncheckedIcon={false}
              checkedIcon={false}
            />
          </div>
          <label
            htmlFor="wifiblock_switch"
            className={styles.buttonLabel}
            style={buttonLabelInlineStyle}
          >
            {GENERAL_CONFIG_FORM_STRINGS.SOUND_SELECT}
          </label>
        </div>
        {isSoundConfigEnabled ? <SoundSliderSection /> : null}
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
          <SoundSection />
          <SystemLanguageCountrySection />
        </form>
      </div>
      <FooterSection />
    </div>
  );
}
