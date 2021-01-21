import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { storeFormIntoJson } from './CreationUtils';
import CreationParams from './CreationPageAttrs';
import React, {
  FormEvent,
  RefObject,
  useState,
  useRef,
  useEffect,
} from 'react';
import Switch from 'react-switch';

import styles from './Creation.css';
import CreationRoutes from './CreationRoutes.json';
import PaginationIndicator from '../../../components/PaginationIndicator';
import CustomButton from '../../../components/CustomButton';
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
import cancel from '../../../../resources/icons/cancel/cancel.png';
import add from '../../../../resources/icons/add/add.png';
import back from '../../../../resources/icons/back/back.png';

export default function CreationOptionalConfigPage({
  rootJson,
}: CreationParams) {
  const history = useHistory();
  const { url, path } = useRouteMatch();

  /*
   *  User : com.samsung.android.knox.kpu
   *  Eng : com.samsung.android.knox.kpu.demo
   *  Beta User: com.samsung.android.knox.kpu.beta
   *  Sometimes : com.samsung.android.knox.kpu.poc
   */
  const KSP_PACKAGE_NAME_FOR_RELEASE = 'com.samsung.android.knox.kpu';
  const KSP_PACKAGE_NAME_FOR_DEVELOP = 'com.samsung.android.knox.kpu.demo';

  useEffect(() => {
    console.log(
      `CreationOptionalConfigPage url=${url} path=${path} json=${JSON.stringify(
        rootJson
      )}`
    );
  });

  const [
    showDeviceAndPerepheralSection,
    setShowDeviceAndPerepheralSection,
  ] = useState<boolean>(false);
  const [showAddNewPackageSection, setAddNewPackageSection] = useState<boolean>(
    false
  );

  const refPeripheralConfigFileLocation = useRef<HTMLInputElement>(null);
  const refKspAgentLocation = useRef<HTMLInputElement>(null);
  const refPeripheralAgentPackageName = useRef<HTMLInputElement>(null);
  const refPeripheralAgentSigningKey = useRef<HTMLInputElement>(null);

  function hideParagraph(ref: RefObject<HTMLElement>) {
    ref.current?.parentElement?.classList.add(styles.hide);
  }

  function showParagraph(ref: RefObject<HTMLElement>) {
    ref.current?.parentElement?.classList.remove(styles.hide);
  }

  const onChangeEnabledPeripheralConfig = () => {
    setShowDeviceAndPerepheralSection((prevValue) => !prevValue);
  };

  const onClickAddNewPackage = () => {
    setAddNewPackageSection((prevValue) => !prevValue);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = document.querySelector('form');
    storeFormIntoJson(form, rootJson);

    history.push(`.${CreationRoutes.SUMMARY}`);
  };

  const onPressBack = () => {
    history.push(`.${CreationRoutes.DO_PROFILE}`);
  };

  const onPressCancel = () => {
    // TODO: need to implement cancel action here
  };

  function DeviceAndPerepheralSection() {
    return (
      <div className={styles.sectionContainer}>
        <p className={styles.form} style={{ margin: '0px' }}>
          <label
            className={styles.label}
            style={{ marginTop: '21px', marginBottom: '10px' }}
            htmlFor="appContent_0_href"
          >
            {DNP_CONFIGURATION.FIELD1}
          </label>
          <input
            name="appContent_0_href"
            type="text"
            ref={refPeripheralConfigFileLocation}
            className={styles.textInputBox}
          />
          &nbsp;&nbsp; (for Dev:
          <input
            name="appContent_0_packageName"
            size={30}
            type="text"
            defaultValue={KSP_PACKAGE_NAME_FOR_DEVELOP}
          />
          )
        </p>
        <p className={styles.form} style={{ margin: '0px' }}>
          <label
            className={styles.label}
            style={{ marginTop: '21px', marginBottom: '10px' }}
            htmlFor="management_secondaryAgents_0_href"
          >
            {DNP_CONFIGURATION.FIELD2}
          </label>
          <input
            name="management_secondaryAgents_0_href"
            type="text"
            ref={refKspAgentLocation}
            className={styles.textInputBox}
          />
        </p>
        <p className={styles.form} style={{ margin: '0px' }}>
          <label
            className={styles.label}
            style={{ marginTop: '21px', marginBottom: '10px' }}
            htmlFor="management_secondaryAgents_0_packageName"
          >
            {DNP_CONFIGURATION.FIELD3}
          </label>
          <input
            name="management_secondaryAgents_0_packageName"
            type="text"
            ref={refPeripheralAgentPackageName}
            className={styles.textInputBox}
          />
        </p>
        <p className={styles.form} style={{ margin: '0px' }}>
          <label
            className={styles.label}
            style={{ marginTop: '21px', marginBottom: '10px' }}
            htmlFor="management_secondaryAgents_0_signatures_0"
          >
            {DNP_CONFIGURATION.FIELD4}
          </label>
          <input
            name="management_secondaryAgents_0_signatures_0"
            type="text"
            ref={refPeripheralAgentSigningKey}
            className={styles.textInputBox}
          />
        </p>
      </div>
    );
  }

  function AddNewPackageButtonSection() {
    return (
      <div className={styles.switchContainer} style={{ marginTop: '10px' }}>
        <div
          style={{ marginRight: '10px', alignItems: 'center' }}
          onClick={onClickAddNewPackage}
          onKeyPress={onClickAddNewPackage}
          role="button"
          tabIndex={0}
        >
          <img src={add} alt="Add" className={styles.addButtonImg} />
        </div>
        <p className={styles.label} style={{ margin: '0px', height: '16px' }}>
          {ADD_NEW_PACKAGE}
        </p>
      </div>
    );
  }

  function AddNewPackageSection() {
    return (
      <div className={styles.sectionContainer}>
        <p className={styles.form} style={{ margin: '0px' }}>
          <label
            className={styles.label}
            style={{ marginBottom: '10px' }}
            htmlFor="management_secondaryAgents_1_packageName"
          >
            {NEW_PACKAGE.FIELD1}
          </label>
          <input
            name="management_secondaryAgents_1_packageName"
            type="text"
            className={styles.textInputBox}
          />
        </p>
        <p className={styles.form} style={{ margin: '0px' }}>
          <label
            className={styles.label}
            style={{ marginBottom: '10px' }}
            htmlFor="management_secondaryAgents_1_signatures_0"
          >
            {NEW_PACKAGE.FIELD2}
          </label>
          <input
            name="management_secondaryAgents_1_signatures_0"
            type="text"
            className={styles.textInputBox}
          />
        </p>
        <p className={styles.form} style={{ margin: '0px' }}>
          <label
            className={styles.label}
            style={{ marginBottom: '10px' }}
            htmlFor="management_secondaryAgents_1_href"
          >
            {NEW_PACKAGE.FIELD3}
          </label>
          <input
            name="management_secondaryAgents_1_href"
            type="text"
            className={styles.textInputBox}
          />
        </p>
      </div>
    );
  }

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
            <PaginationIndicator noOfItems={7} selectedIndex={5} />
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
        <h1 className={styles.title}>
          {OPTIONAL_CONFIG_FORM_STRINGS.FORM_TITLE}
        </h1>
        <h2 className={styles.subText}>
          {OPTIONAL_CONFIG_FORM_STRINGS.SUB_TEXT1}
          <br />
          {OPTIONAL_CONFIG_FORM_STRINGS.SUB_TEXT2}
        </h2>

        <form
          id="optional_config_form"
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <p className={styles.formName} style={{ marginBottom: '10px' }}>
            {DEVICE_AND_PERIPHERAL_CONFIG}
          </p>
          <div className={styles.switchContainer}>
            <div
              style={{ height: '60px', paddingTop: '3px', marginRight: '5px' }}
            >
              <Switch
                id="_enable_peripheral_config"
                name="_enable_peripheral_config"
                onChange={onChangeEnabledPeripheralConfig}
                checked={showDeviceAndPerepheralSection}
                height={16}
                width={30}
                uncheckedIcon={false}
                checkedIcon={false}
              />
            </div>
            <div className={styles.form}>
              <label
                htmlFor="_enable_peripheral_config"
                className={styles.buttonLabel}
                style={{ height: '60px', width: '403px' }}
              >
                {OPTIONAL_CONFIG_TOGGLE_DESCRIPTION}
              </label>
              <p className={styles.hyperLink}>{DNP_GUIDE}</p>
            </div>
          </div>
          {showDeviceAndPerepheralSection ? (
            <DeviceAndPerepheralSection />
          ) : null}
          <h3
            className={styles.formName}
            style={
              showDeviceAndPerepheralSection
                ? { marginTop: '30px' }
                : { marginTop: '20px' }
            }
          >
            {MORE_APP}
          </h3>
          <p
            className={styles.buttonLabel}
            style={{
              height: '40px',
              width: '440px',
              marginBottom: '0px',
              marginTop: '10px',
            }}
          >
            {ADD_PACKAGE_DESCRIPTION}
          </p>
          {!showAddNewPackageSection ? <AddNewPackageButtonSection /> : null}
          {showAddNewPackageSection ? <AddNewPackageSection /> : null}
        </form>
      </div>
      <div className={styles.buttonContainer}>
        <CustomButton
          form="optional_config_form"
          type="submit"
          text={CONTINUE}
        />
      </div>
    </div>
  );
}
