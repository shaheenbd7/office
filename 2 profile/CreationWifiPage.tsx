import React, {
  useEffect,
  useRef,
  useState,
  FormEvent,
  RefObject,
} from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import Switch from 'react-switch';
import Select from 'react-select';

import CreationUtils from './CreationUtils';
import CreationParams from './CreationParams';
import CreationRoutes from './CreationRoutes.json';
import styles from './Creation.css';
import CustomButton from '../../../components/CustomButton';
import PaginationIndicator from '../../../components/PaginationIndicator';
import {
  WIFI_FORM_STRINGS,
  NAME,
  ASTERIX,
  HIDDEN_NET,
  ADD_HIDDEN_NET,
  WIFI_MAC_RAND,
  ON,
  OFF,
  PROXY,
  PASSWORD,
  ENTER_PASS,
  PAC_WEB,
  EXAMPLE_WEB,
  EAP_METHOD,
  IDENTITY,
  PHASE2_AUTH,
  CA_CERT,
  USER_CERT,
  SECURITY,
  CONTINUE,
  EMM_CREATE_PAGE_TITLE,
} from '../../../constants/uiStrings';
import cancel from '../../../../resources/icons/cancel/cancel.png';

export default function CreationWifiPage({ rootJson }: CreationParams) {
  const history = useHistory();
  const { url, path } = useRouteMatch();

  useEffect(() => {
    console.log(
      `CreationWifiPage url=${url} path=${path} json=${JSON.stringify(
        rootJson
      )}`
    );
  });

  // below security type.
  const refEapMethod = useRef<HTMLSelectElement>(null);
  const refIdentity = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const refPhase2Auth = useRef<HTMLSelectElement>(null);
  const refCaCertificate = useRef<HTMLInputElement>(null);
  const refUserCertificate = useRef<HTMLInputElement>(null);

  function hideParagraph(ref: RefObject<HTMLElement>) {
    ref.current?.parentElement?.classList.add(styles.hide);
  }

  function showParagraph(ref: RefObject<HTMLElement>) {
    ref.current?.parentElement?.classList.remove(styles.hide);
  }

  function isVisible(element: HTMLElement) {
    return !element.parentElement?.classList.contains(styles.hide);
  }

  const proxyOptions = [
    { value: 'none', label: 'None' },
    { value: 'proxy_autio_config', label: 'Proxy auto config' },
  ];

  const defaultSecurityFields = {
    showEapField: false,
    showIdentityField: false,
    showPasswordField: false,
    showPhase2AuthField: false,
    showCaCertificateField: false,
    showUserCertificateField: false,
  };

  const securityOptions = [
    { value: 'NONE', label: 'None' },
    { value: 'WEP', label: 'WEP' },
    { value: 'WPA', label: 'WPA/WPA2/WPA3-Personal' },
    { value: 'EAP', label: 'WPA/WPA2/WPA3-Enterprise' },
  ];

  const eapOptions = [
    { value: 'PEAP', label: 'PEAP' },
    { value: 'TLS', label: 'TLS' },
    { value: 'TTLS', label: 'TTLS' },
  ];

  const [showPacUrl, setShowPacUrl] = useState<boolean>(false);
  const [isAddHiddenNetwork, setIsAddHiddenNetwork] = useState<boolean>(true);
  const [isWifiMacRandomized, setIsWifiMacRandomized] = useState<boolean>(true);
  const [securityType, setSecurityType] = useState(securityOptions[0]);
  const [securityFormConfiguration, setSeurityFormConfiguration] = useState(
    defaultSecurityFields
  );
  const [selectedEapOption, setSelectedEapOption] = useState(eapOptions[0]);

  const onChangeProxy = (e: { value: string; label: string }) => {
    const currentValue = e.value;
    if (currentValue === 'proxy_autio_config') {
      setShowPacUrl(true);
    } else {
      setShowPacUrl(false);
    }
  };

  const onChangeEapMethod = (input: { value: string; label: string }) => {
    setSelectedEapOption(input);

    if (input.value === 'PEAP') {
      setSeurityFormConfiguration({
        ...defaultSecurityFields,
        showEapField: true,
        showIdentityField: true,
        showPasswordField: true,
        showPhase2AuthField: true,
        showCaCertificateField: true,
      });
    } else if (input.value === 'TLS') {
      setSeurityFormConfiguration({
        ...defaultSecurityFields,
        showEapField: true,
        showIdentityField: true,
        showCaCertificateField: true,
        showUserCertificateField: true,
      });
    } else if (input.value === 'TTLS') {
      setSeurityFormConfiguration({
        ...defaultSecurityFields,
        showEapField: true,
        showIdentityField: true,
        showPasswordField: true,
        showPhase2AuthField: true,
        showCaCertificateField: true,
      });
    } else if (input.value === 'PWD') {
      setSeurityFormConfiguration({
        ...defaultSecurityFields,
        showEapField: true,
        showIdentityField: true,
        showPasswordField: true,
      });
    } else if (input.value === 'SIM') {
      // nothing
    } else if (input.value === 'AKA') {
      // nothing
    } else if (input.value === 'AKA_PRIME') {
      // nothing
    }
  };

  const onChangeSecurity = (input: { value: string; label: string }) => {
    setSecurityType(input);

    const currentValue = input.value;
    if (currentValue === 'NONE') {
      setSeurityFormConfiguration({ ...defaultSecurityFields });
    }
    if (currentValue === 'WEP') {
      setSeurityFormConfiguration({
        ...defaultSecurityFields,
        showPasswordField: true,
      });
    } else if (currentValue === 'WPA') {
      setSeurityFormConfiguration({
        ...defaultSecurityFields,
        showPasswordField: true,
      });
    } else if (currentValue === 'EAP') {
      setSeurityFormConfiguration({
        ...defaultSecurityFields,
        showEapField: true,
      });
      onChangeEapMethod(selectedEapOption);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const data = new FormData(formElement);
    data.forEach((value: FormDataEntryValue, key: string) => {
      const element = formElement.elements.namedItem(key) as HTMLElement;
      if (isVisible(element)) {
        rootJson[key] = value;
      }
    });
    rootJson['wifiInfo_hidden'] = isAddHiddenNetwork;
    rootJson['wifiInfo_skipMacRandomization'] = isWifiMacRandomized;

    history.push(`.${CreationRoutes.LEGAL}`);
  };

  function changeSetHiddenNetworkState() {
    setIsAddHiddenNetwork((prevValue) => !prevValue);
  }

  function changeSetRandomizedWifiMacAddress() {
    setIsWifiMacRandomized((prevValue) => !prevValue);
  }

  function PacUrlSection() {
    return (
      <div className={styles.indent}>
        <div className={`${styles.labelContainer}  ${styles.indent}`}>
          <label htmlFor="wifiInfo_proxyAutoConfigUrl" className={styles.label}>
            {`${PAC_WEB} ${ASTERIX}`}
          </label>
        </div>
        <input
          name="wifiInfo_proxyAutoConfigUrl"
          type="text"
          className={`${styles.textInputBox} ${styles.indentedWidth}`}
          placeholder={EXAMPLE_WEB}
        />
      </div>
    );
  }

  function PasswordSection() {
    return (
      <div className={styles.indent}>
        <div className={styles.labelContainer}>
          <label htmlFor="wifiInfo_password" className={styles.label}>
            {`${PASSWORD} ${ASTERIX}`}
          </label>
        </div>
        <input
          name="wifiInfo_password"
          type="password"
          ref={refPassword}
          className={`${styles.textInputBox} ${styles.indentedWidth}`}
          placeholder={ENTER_PASS}
        />
      </div>
    );
  }

  function EapSection() {
    return (
      <div>
        <div className={`${styles.labelContainer}  ${styles.indent}`}>
          <label htmlFor="wifiInfo_eapMethod" className={styles.label}>
            {EAP_METHOD}
          </label>
        </div>
        <div
          className={`${styles.dropDownSelector}  ${styles.indent} ${styles.indentedDropDownWidth}`}
        >
          <Select
            name="wifiInfo_eapMethod"
            ref={refEapMethod}
            options={eapOptions}
            onChange={onChangeEapMethod}
            defaultValue={selectedEapOption}
          />
        </div>
      </div>
    );
  }

  function IdentitySection() {
    return (
      <div className={styles.indent}>
        <div className={styles.labelContainer}>
          <label htmlFor="wifiInfo_identity" className={styles.label}>
            {`${IDENTITY} ${ASTERIX}`}
          </label>
        </div>
        <input
          name="wifiInfo_identity"
          type="text"
          ref={refIdentity}
          className={`${styles.textInputBox} ${styles.indentedWidth}`}
        />
      </div>
    );
  }

  function Phase2AuthSection() {
    let phase2AuthOptions;

    switch (selectedEapOption.value) {
      case 'PEAP':
        phase2AuthOptions = [
          { value: 'MSCHAPV2', label: 'MSCHAPV2' },
          { value: 'GTC', label: 'GTC' },
          { value: 'SIM', label: 'SIM' },
          { value: 'AKA', label: 'AKA' },
        ];
        break;
      case 'TTLS':
        phase2AuthOptions = [
          { value: 'PAP', label: 'PAP' },
          { value: 'MSCHAP', label: 'MSCHAP' },
          { value: 'MSCHAPV2', label: 'MSCHAPV2' },
          { value: 'GTC', label: 'GTC' },
        ];
        break;
      default:
        phase2AuthOptions = null;
    }

    return (
      <div>
        <div className={`${styles.labelContainer}  ${styles.indent}`}>
          <label htmlFor="wifiInfo_phase2Auth" className={styles.label}>
            {PHASE2_AUTH}
          </label>
        </div>
        <div
          className={`${styles.dropDownSelector}  ${styles.indent} ${styles.indentedDropDownWidth}`}
        >
          <Select
            name="wifiInfo_phase2Auth"
            ref={refPhase2Auth}
            options={phase2AuthOptions}
            defaultValue={phase2AuthOptions ? phase2AuthOptions[0] : null}
          />
        </div>
      </div>
    );
  }

  function CaCertificateSection() {
    return (
      <div className={`${styles.formfield}  ${styles.indent}`}>
        <div className={styles.labelContainer}>
          <label htmlFor="_caCertificate_file" className={styles.label}>
            {`${CA_CERT} ${ASTERIX}`}
          </label>
        </div>
        <input
          name="_caCertificate_file"
          type="file"
          onChange={(e) => {
            CreationUtils.onFileSelected(
              e.currentTarget,
              refCaCertificate.current!
            );
          }}
        />
        (for Dev:
        <input
          name="wifiInfo_caCertificate"
          type="text"
          readOnly
          ref={refCaCertificate}
        />
        )
      </div>
    );
  }

  function UserCertificateSection() {
    return (
      <div className={`${styles.formfield}  ${styles.indent}`}>
        <div className={styles.labelContainer}>
          <label htmlFor="_userCertificate_file" className={styles.label}>
            {`${USER_CERT} ${ASTERIX}`}
          </label>
        </div>
        <input
          name="_userCertificate_file"
          type="file"
          onChange={(e) => {
            CreationUtils.onFileSelected(
              e.currentTarget,
              refUserCertificate.current!
            );
          }}
        />
        (for Dev:
        <input
          name="wifiInfo_userCertificate"
          type="text"
          readOnly
          ref={refUserCertificate}
        />
        )
      </div>
    );
  }

  return (
    <div data-tid="container" className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.headerContainer}>
          <div>
            <Link to={`.${CreationRoutes.BASIC}`}>
              <button type="button">Go back</button>
            </Link>
          </div>
          <div>
            <h3 className={styles.pageTitle}>{EMM_CREATE_PAGE_TITLE}</h3>
            <PaginationIndicator noOfItems={7} selectedIndex={2} />
          </div>
          <div>
            <img src={cancel} alt="Cancel" className={styles.cancel} />
          </div>
        </div>
        <h1 className={styles.title}>{WIFI_FORM_STRINGS.FORM_TITLE}</h1>
        <h2 className={styles.subText}>{WIFI_FORM_STRINGS.SUB_TEXT}</h2>
        <form id="wifi_form" onSubmit={handleSubmit} className={styles.form}>
          <h3 className={styles.formName}>{WIFI_FORM_STRINGS.FORM_NAME}</h3>
          <div>
            <div className={styles.labelContainer}>
              <label htmlFor="wifiInfo_ssid" className={styles.label}>
                {`${NAME} ${ASTERIX}`}
              </label>
            </div>
            <input
              name="wifiInfo_ssid"
              type="text"
              className={styles.textInputBox}
            />
          </div>
          <div className={styles.labelContainer}>
            <label htmlFor="wifiInfo_hidden" className={styles.label}>
              {HIDDEN_NET}
            </label>
            {/* <input name="wifiInfo_hidden" type="checkbox" defaultChecked /> */}
          </div>
          <div className={styles.switchContainer}>
            <Switch
              id="wifiInfo_hidden"
              name="wifiInfo_hidden"
              onChange={changeSetHiddenNetworkState}
              checked={isAddHiddenNetwork}
              height={16}
              width={30}
              uncheckedIcon={false}
              checkedIcon={false}
            />
            <label htmlFor="wifiInfo_hidden" className={styles.buttonLabel}>
              {ADD_HIDDEN_NET}
            </label>
          </div>
          <div className={styles.labelContainer}>
            <label
              htmlFor="wifiInfo_skipMacRandomization"
              className={styles.label}
            >
              {WIFI_MAC_RAND}
            </label>
            {/* <input
            name="wifiInfo_skipMacRandomization"
            type="checkbox"
            defaultChecked
          /> */}
          </div>
          <div className={styles.switchContainer}>
            <Switch
              id="wifiInfo_skipMacRandomization"
              name="wifiInfo_skipMacRandomization"
              onChange={changeSetRandomizedWifiMacAddress}
              checked={isWifiMacRandomized}
              height={16}
              width={30}
              uncheckedIcon={false}
              checkedIcon={false}
            />
            <label className={styles.buttonLabel}>
              {isWifiMacRandomized ? ON : OFF}
            </label>
          </div>
          <div className={styles.labelContainer}>
            <label htmlFor="_proxy" className={styles.label}>
              {PROXY}
            </label>
          </div>
          <div className={styles.dropDownSelector}>
            <Select
              name="_proxy"
              options={proxyOptions}
              onChange={onChangeProxy}
              defaultValue={proxyOptions[0]}
            />
          </div>

          {showPacUrl ? <PacUrlSection /> : null}

          <div className={styles.labelContainer}>
            <label htmlFor="wifiInfo_securityType" className={styles.label}>
              {SECURITY}
            </label>
          </div>
          <div className={styles.dropDownSelector}>
            <Select
              name="wifiInfo_securityType"
              options={securityOptions}
              onChange={onChangeSecurity}
              defaultValue={securityType}
            />
          </div>

          {securityFormConfiguration.showEapField ? <EapSection /> : null}

          {securityFormConfiguration.showIdentityField ? (
            <IdentitySection />
          ) : null}

          {securityFormConfiguration.showPasswordField ? (
            <PasswordSection />
          ) : null}

          {securityFormConfiguration.showPhase2AuthField ? (
            <Phase2AuthSection />
          ) : null}

          {securityFormConfiguration.showCaCertificateField ? (
            <CaCertificateSection />
          ) : null}

          {securityFormConfiguration.showUserCertificateField ? (
            <UserCertificateSection />
          ) : null}
        </form>
      </div>
      <div className={styles.buttonContainer}>
        <CustomButton form="wifi_form" type="submit" text={CONTINUE} />
      </div>
    </div>
  );
}
