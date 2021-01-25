import React, { useState, useEffect, FormEvent } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import CountryList from '../../../constants/countryList';
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
import CloseButtonWithPopup from '../../../components/CustomPopup/CloseButtonWithPopup';
import LanguageList from '../../../constants/languageList';

export default function GeneralConfiguration(
  this: any,
  { rootJson }: DeviceParams
) {
  const history = useHistory();
  const { url, path } = useRouteMatch();

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

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if (event.target.name === 'disallowToAddWifiToBlocklist') {
      if (event.target.checked) {
        document
          .getElementById('disallowWifiBlocklistItem')
          ?.classList.remove(styles.hide);
      } else {
        document
          .getElementById('disallowWifiBlocklistItem')
          ?.classList.add(styles.hide);
      }
    }
  };

  const onChangeLanguage = (e: FormEvent<HTMLSelectElement>) => {
    const currentValue1 = e.currentTarget.value;
  };

  const onChangeCountry = (e: FormEvent<HTMLSelectElement>) => {
    const currentValue2 = e.currentTarget.value;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);

    if (rootJson.nfcEnabled !== 'true') {
      rootJson.nfcEnabled = 'false';
    }

    if (rootJson.disallowToAddWifiToBlocklist !== 'true') {
      rootJson.disallowToAddWifiToBlocklist = 'false';
    }

    data.forEach((value: FormDataEntryValue, key: string) => {
      rootJson[key] = value;
    });

    history.push(`.${DeviceRoutes.SUMMARY}`);
  };

  const onPressBack = () => {
    // history.push(`.${CreationRoutes.DO_PROFILE}`);
  };

  const onPressCancel = () => {
    // TODO
  };

  function NFCSection() {
    return (
      <div className={styles.sectionContainer}>
        <p className={styles.form} style={{ margin: '0px' }}>
          <p
            className={styles.formName}
            style={{ marginBottom: '10px', width: '440px' }}
          >
            1. NFC
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
            <label htmlFor="nfc_enbled" className={styles.buttonLabel}>
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
          {/* <p className={styles.form} style={{ margin: '0px' }}> */}
          <input
            name="ssid_one"
            type="text"
            className={styles.textInputBox}
            style={{ width: '400px' }}
            placeholder="Enter SSID"
          />
          <img
            src={add}
            alt="Add"
            className={styles.addButtonImg}
            style={{ marginLeft: '10px' }}
          />
          {/* </p> */}
        </div>
      </div>
    );
  }

  function SSIDSectionTwo() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>SSID</h1>
        <input />
      </div>
    );
  }

  function SSIDSectionThree() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>SSID</h1>
        <input />
      </div>
    );
  }

  function SSIDSectionFour() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>SSID</h1>
        <input />
      </div>
    );
  }

  function SSIDSectionFive() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>SSID</h1>
        <input />
      </div>
    );
  }

  function WIFIBlockListSection() {
    return (
      <div className={styles.sectionContainer}>
        <p className={styles.form} style={{ margin: '0px' }}>
          <p className={styles.formName} style={{ marginBottom: '10px' }}>
            2. Disallow to add WIFI to blocklist
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
            <div className={styles.form}>
              <label
                htmlFor="wifi_blocklist"
                className={styles.buttonLabel}
                style={{ height: '40px', width: '403px' }}
              >
                Prevent to block a specific AP connection because of adding to
                blocklist accidentally
              </label>
            </div>
          </div>
          {isWifiBlocklist ? <SSIDSectionOne /> : null}
          {countBlockList > 0 ? <SSIDSectionOne /> : null}
          {countBlockList > 1 ? <SSIDSectionOne /> : null}
          {countBlockList > 2 ? <SSIDSectionOne /> : null}
          {countBlockList > 3 ? <SSIDSectionOne /> : null}
          {/* {isWifiBlocklist ? <SSIDSectionOne /> : null}
          {countBlockList > 0 ? <SSIDSectionTwo /> : null}
          {countBlockList > 1 ? <SSIDSectionThree /> : null}
          {countBlockList > 2 ? <SSIDSectionFour /> : null}
          {countBlockList > 3 ? <SSIDSectionFive /> : null} */}

          {isWifiBlocklist && countBlockList < 4 ? (
            <AddSSIDButtonSection />
          ) : null}
        </p>
      </div>
    );
  }

  function SystemLanguageCountrySection() {
    return (
      <div className={styles.sectionContainer}>
        <p className={styles.form} style={{ margin: '0px' }}>
          <p className={styles.formName} style={{ marginBottom: '10px' }}>
            3. System Language & Country
          </p>
          <div className={styles.labelContainer}>
            <label htmlFor="language" className={styles.label}>
              Set Language
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
          <br />
          <div className={styles.labelContainer}>
            <label htmlFor="country" className={styles.label}>
              Set Country
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

  function SystemLanguageCountrySectionOLD() {
    return (
      <div>
        <h1>3. System Language & Country </h1>
        <div className={styles.labelContainer}>
          <label htmlFor="language" className={styles.label}>
            Set Language
          </label>
        </div>
        <Select
          name="language"
          options={LanguageList}
          defaultValue={LanguageList[0]}
        />
        <br />
        <div className={styles.labelContainer}>
          <label htmlFor="country" className={styles.label}>
            Set Country
          </label>
        </div>
        <Select
          name="country"
          options={CountryList}
          defaultValue={CountryList[0]}
        />
      </div>
    );
  }

  // function ConditionSection() {
  //   return (
  //     <div className={styles.sectionContainer}>
  //       <p className={styles.form} style={{ margin: '0px' }}>
  //         <p className={styles.formName} style={{ marginBottom: '10px' }}>
  //           3. System Language & Country
  //         </p>
  //         <div className={styles.labelContainer}>
  //           <label htmlFor="language" className={styles.label}>
  //             Set Language
  //           </label>
  //         </div>
  //         <div className={styles.dropDownSelector}>
  //           <Select
  //             name="language"
  //             options={LanguageList}
  //             defaultValue={LanguageList[0]}
  //             components={{
  //               IndicatorSeparator: () => null,
  //             }}
  //           />
  //         </div>
  //         <br />
  //         <div className={styles.labelContainer}>
  //           <label htmlFor="country" className={styles.label}>
  //             Set Country
  //           </label>
  //         </div>
  //         <div className={styles.dropDownSelector}>
  //           <Select
  //             name="country"
  //             options={CountryList}
  //             defaultValue={CountryList[0]}
  //             components={{
  //               IndicatorSeparator: () => null,
  //             }}
  //           />
  //         </div>
  //       </p>
  //     </div>
  //   );
  // }


  function ConditionSection() {
    return (
      <div>
        <p className={styles.formfield}>
          <label htmlFor="organizationName" className={styles.label}>
            IF
          </label>
          <br />
          <input
            name="condition_if"
            type="text"
            className={styles.textInputBox}
            placeholder="Samsung Electronics"
          />
        </p>
        <p className={styles.formfield}>
          <label htmlFor="organizationName" className={styles.label}>
            THEN
          </label>
          <br />
          <input
            name="condition_then"
            type="text"
            className={styles.textInputBox}
            placeholder="Samsung Electronics"
          />
        </p>
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
          Add new conditions
        </p>
      </div>
    );
  }

  function KeyboardPerAppSection() {
    return (
      <div className={styles.sectionContainer}>
        <p className={styles.form} style={{ margin: '0px' }}>
          <p className={styles.formName} style={{ marginBottom: '10px' }}>
            4. Keyboard per app
          </p>
          <ConditionSection />
          <AddNewConditionButtonSection />
        </p>
      </div>
    );
  }

  function KeyboardPerAppSectionOLD() {
    return (
      <div>
        <h1>4. Keyboard per app</h1>
        <ConditionSection />
        <AddNewConditionButtonSection />
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
          <h3 className={styles.pageTitle}>DEVICE CONFIGURATION</h3>
          <PaginationIndicator noOfItems={4} selectedIndex={3} />
        </div>
        <div>
          <CloseButtonWithPopup saveAsDraftCallback={onPressCancel} />
        </div>
      </div>
    );
  }

  function PageTitle() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1 className={styles.title}>General configuration</h1>
        <h2 className={styles.subText}>Select and configure category below.</h2>
      </div>
    );
  }

  return (
    <div data-tid="container" className={styles.container}>
      <div className={styles.formContainer}>
        <HeaderSection />
        <PageTitle />
        <form
          id="general_config_form"
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <NFCSection />
          <br />
          <WIFIBlockListSection />
          <br />
          <SystemLanguageCountrySection />
          <br />
          <KeyboardPerAppSection />

          {/* <p style={{width='440px'}}></p> */}
        </form>
      </div>
      <div className={styles.buttonContainer}>
        <CustomButton
          form="general_config_form"
          type="submit"
          text="Continue"
        />
      </div>
    </div>
  );

  // return (
  //   <div data-tid="container">
  //     <h1>General configuration</h1>
  //     <h2>&nbsp;&nbsp;Select and configure category below.</h2>

  //     <form onSubmit={handleSubmit}>
  //       <h3>1. NFC</h3>
  //       <FormGroup>
  //         <FormControlLabel
  //           control={
  //             <Switch
  //               checked={state.nfcEnabled}
  //               onChange={handleChange}
  //               name="nfcEnabled"
  //               color="primary"
  //               value="true"
  //             />
  //           }
  //           label={state.nfcEnabled ? 'Enabled' : 'Disabled'}
  //           // label="Enable"
  //         />
  //       </FormGroup>
  //       <br />
  //       <h3>2. DISALLOW TO ADD WIFI TO BLOCKLIST</h3>
  //       <FormGroup>
  //         <FormControlLabel
  //           control={
  //             <Switch
  //               checked={state.disallowToAddWifiToBlocklist}
  //               onChange={handleChange}
  //               name="disallowToAddWifiToBlocklist"
  //               color="primary"
  //               value="true"
  //             />
  //           }
  //           label="Prevent to block a specific AP connection because of adding to blocklist accidentally"
  //         />
  //       </FormGroup>
  //       <p
  //         id="disallowWifiBlocklistItem"
  //         className={`${styles.formfield} ${styles.hide}`}
  //       >
  //         <label htmlFor="disallowWifiBlocklist" className={styles.subTitle}>
  //           SSID :
  //         </label>
  //         <br />
  //         <input name="disallowWifiBlocklist" type="text" />
  //         <br />
  //         <br />

  //         <IconButton color="primary" aria-label="addNewSSID">
  //           <AddCircle />
  //         </IconButton>
  //         <label htmlFor="addNewSSIDItem" className={styles.subTitle}>
  //           ADD SSID
  //         </label>
  //         <br />
  //       </p>
  //       <br />
  //       <h3>3. SYSTEM LANGUAGE &amp; COUNTRY</h3>
  //       <label htmlFor="setLanguageValue" className={styles.subTitle}>
  //         Set Language
  //       </label>
  //       <br />
  //       <select name="setLanguageValue" onChange={onChangeLanguage}>
  //         <option value="TBD_0">TBD</option>
  //         <option value="TBD_1">TBD1</option>
  //         <option value="TBD_2">TBD2</option>
  //         <option value="TBD_3">TBD3</option>
  //       </select>
  //       <br />
  //       <br />
  //       <label htmlFor="setCountryValue" className={styles.subTitle}>
  //         Set Country
  //       </label>
  //       <br />
  //       <select name="setCountryValue" onChange={onChangeCountry}>
  //         <option value="TBD_0">TBD</option>
  //         <option value="TBD_1">TBD1</option>
  //         <option value="TBD_2">TBD2</option>
  //         <option value="TBD_3">TBD3</option>
  //       </select>
  //       <br />
  //       <br />
  //       <h3>4. KEYBOARD PER APP</h3>
  //       <label htmlFor="keyboardPerApp">Help text : TBD</label>
  //       <br />
  //       <br />
  //       <p className={styles.formfield}>
  //         <label htmlFor="keyboardPerAppIf" className={styles.subTitle}>
  //           IF:
  //         </label>
  //         <br />
  //         <input name="keyboardPerAppIf" type="text" />
  //       </p>
  //       <p className={styles.formfield}>
  //         <label htmlFor="keyboardPerAppThen" className={styles.subTitle}>
  //           THEN:
  //         </label>
  //         <br />
  //         <input name="keyboardPerAppThen" type="text" />
  //       </p>
  //       <IconButton color="primary" aria-label="add new conditions">
  //         <AddCircle />
  //       </IconButton>
  //       <label htmlFor="addNewConditionsValue" className={styles.subTitle}>
  //         ADD NEW CONDITIONS
  //       </label>
  //       <br />
  //       <br />
  //       <Link to={routes.LIST}>
  //         <button type="button">Go to list</button>
  //       </Link>
  //       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  //       <button type="submit">CONTINUE</button>
  //     </form>
  //   </div>
  // );
}
