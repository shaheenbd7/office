import React, { useState, useEffect, FormEvent } from 'react';
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
import cancel from '../../../../resources/icons/cancel/cancel.png';
import add from '../../../../resources/icons/add/add.png';
import back from '../../../../resources/icons/back/back.png';
import info from '../../../../resources/icons/info/info.png';
import LanguageList from '../../../constants/languageList';
import CountryList from '../../../constants/countryList';
import {
import KeyConfiguration from './KeyConfiguration';
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
  const [volumeLevelMedia, setVolumeLevelMedia] = useState<number>(0);
  const [
    volumeLevelNotification,
    setVolumeLevelNotification,
  ] = useState<number>(50);
  const [volumeLevelSystem, setVolumeLevelSystem] = useState<number>(0);
  const [volumeLevelRingtone, setVolumeLevelRingtone] = useState<number>(50);
  const [isSoundConfigEnabled, setIsSoundConfigEnabled] = useState<boolean>(
    true
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
    history.push(`.${DeviceRoutes.KeyConfiguration}`);
  };

  const onPressCancel = () => {
    history.replace(routes.LIST);
  };

  function NFCSection() {
    return (
      <div
        className={styles.sectionContainerColumn}
        style={{ marginBottom: '20px' }}
      >
        <div className={styles.sectionHeader}>
          <h1 className={styles.sectionTitle}>
            {GENERAL_CONFIG_FORM_STRINGS.NFC}
          </h1>
        </div>
        <div className={styles.divSwitchLabel}>
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
          <h1 className={styles.switchLabel}>
            {isNFCEnabled ? 'Enable' : 'Disable'}
          </h1>
        </div>
      </div>
    );
  }

  function SSIDListSection() {
    return (
      <div className={styles.ssidListContainer}>
        {ssidList.map((item, idx) => (
          <div key={item.sid}>
            <h1 className={styles.ssidTitle} key={Math.random()}>
              {GENERAL_CONFIG_FORM_STRINGS.SSID}
            </h1>
            <div className={styles.ssidInputDeleteContainer}>
              <input
                name={'ssid-' + idx}
                type="text"
                className={styles.ssidTextInputBox}
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
      <div
        className={styles.addSSIDButtonContainer}
        style={{ marginTop: '10px' }}
      >
        <div
          style={{ marginRight: '10px', alignItems: 'center' }}
          onClick={onClickAddSSID}
          onKeyPress={onClickAddSSID}
          role="button"
          tabIndex={0}
        >
          <img src={add} alt="Add" className={styles.addButtonImg} />
        </div>
        <div className={styles.label} style={{ margin: '0px', height: '16px' }}>
          {GENERAL_CONFIG_FORM_STRINGS.ADD_SSID}
        </div>
      </div>
    );
  }

  function WIFIBlockListSection() {
    return (
      <div
        className={styles.sectionContainerColumn}
        style={{ marginBottom: '20px' }}
      >
        <div className={styles.sectionHeader}>
          <h1 className={styles.sectionTitle}>
            {GENERAL_CONFIG_FORM_STRINGS.WIFI_DISALLOW}
          </h1>
          <img src={info} alt="Info" className={styles.iconInfo} />
        </div>
        <div className={styles.divSwitchLabel}>
          <Switch
            id="wifiblock_switch_id"
            name="wifiblock_switch"
            onChange={changeWifiBlocklist}
            checked={isWifiBlocklist}
            height={16}
            width={30}
            uncheckedIcon={false}
            checkedIcon={false}
          />
          <h1 className={styles.switchLabel}>
            {GENERAL_CONFIG_FORM_STRINGS.WIFI_PREVENT}
          </h1>
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
      <div className={styles.sectionContainerColumn}>
        <div className={styles.sectionHeader}>
          <h1 className={styles.sectionTitle}>
            {GENERAL_CONFIG_FORM_STRINGS.SYSTEM_LANGUAGE_COUNTRY}
          </h1>
        </div>
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
      <div className={styles.ssidListContainer}>
        <div>
          <div className={styles.sliderHeader}>
            <h1 className={styles.ssidTitle}>
              {GENERAL_CONFIG_FORM_STRINGS.SOUND_MEDIA}
            </h1>
            <h1 className={styles.volumeLevelText}>{volumeLevelMedia}%</h1>
          </div>
          <div className={styles.switchContainer}>
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
        <div>
          <div className={styles.sliderHeader}>
            <h1 className={styles.ssidTitle}>
              {GENERAL_CONFIG_FORM_STRINGS.SOUND_NOTIFICATION}
            </h1>
            <h1 className={styles.volumeLevelText}>
              {volumeLevelNotification}%
            </h1>
          </div>
          <div className={styles.switchContainer}>
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
        <div>
          <div className={styles.sliderHeader}>
            <h1 className={styles.ssidTitle}>
              {GENERAL_CONFIG_FORM_STRINGS.SOUND_SYSTEM}
            </h1>
            <h1 className={styles.volumeLevelText}>{volumeLevelSystem}%</h1>
          </div>
          <div className={styles.switchContainer}>
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
        <div>
          <div className={styles.sliderHeader}>
            <h1 className={styles.ssidTitle}>
              {GENERAL_CONFIG_FORM_STRINGS.SOUND_RINGTONE}
            </h1>
            <h1 className={styles.volumeLevelText}>{volumeLevelRingtone}%</h1>
          </div>
          <div className={styles.switchContainer}>
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
      <div
        className={styles.sectionContainerColumn}
        style={{ marginBottom: '20px' }}
      >
        <div className={styles.sectionHeader}>
          <h1 className={styles.sectionTitle}>
            {GENERAL_CONFIG_FORM_STRINGS.SOUND_TITLE}
          </h1>
        </div>
        <div className={styles.divSwitchLabel}>
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
          <h1 className={styles.switchLabel}>
            {GENERAL_CONFIG_FORM_STRINGS.SOUND_SELECT}
          </h1>
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
