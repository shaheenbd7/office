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

  const [showPacUrl, setShowPacUrl] = useState<boolean>(false);

  const onChangeProxy = (e: { value: string; label: string }) => {
    const currentValue = e.value;
    if (currentValue === 'proxy_autio_config') {
      setShowPacUrl(true);
    } else {
      setShowPacUrl(false);
    }
  };

  const [eapMethodState, setEapMethod] = useState<string>();
  const [isAddHiddenNetwork, setIsAddHiddenNetwork] = useState<boolean>(true);
  const [isWifiMacRandomized, setIsWifiMacRandomized] = useState<boolean>(true);

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

  const [securityType, setSecurityType] = useState(securityOptions[0]);
  const [securityFormConfiguration, setSeurityFormConfiguration] = useState(
    defaultSecurityFields
  );

  // const [selectedProxyOption, setSelectedProxyOption] = useState<String>('none');

  const eapOptions = [
    { value: 'PEAP', label: 'PEAP' },
    { value: 'TLS', label: 'TLS' },
    { value: 'TTLS', label: 'TTLS' },
  ];

  const [selectedEapOption, setSelectedEapOption] = useState(eapOptions[0]);

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

    history.push(`.${CreationRoutes.LEGAL}`);
  };

  type Phase2AuthSelectProps = {
    eapMethod: string | undefined;
  };

  function changeSetHiddenNetworkState() {
    setIsAddHiddenNetwork((prevValue) => !prevValue);
  }

  function changeSetRandomizedWifiMacAddress() {
    setIsWifiMacRandomized((prevValue) => !prevValue);
  }

  function PacUrlSection() {
    return (
      <p className={`${styles.formfield} ${styles.indent}`}>
        <label htmlFor="wifiInfo_proxyAutoConfigUrl" className={styles.label}>
          PAC web address *
        </label>
        <br />
        <input
          name="wifiInfo_proxyAutoConfigUrl"
          type="text"
          className={`${styles.textInputBox} ${styles.indentedWidth}`}
          placeholder="http://www.example.com/"
        />
      </p>
    );
  }

  function PasswordSection() {
    return (
      <p className={`${styles.formfield}  ${styles.indent}`}>
        <label htmlFor="wifiInfo_password" className={styles.label}>
          Password *
        </label>
        <br />
        <input
          name="wifiInfo_password"
          type="password"
          ref={refPassword}
          className={`${styles.textInputBox} ${styles.indentedWidth}`}
          placeholder="Enter password"
        />
      </p>
    );
  }

  function EapSection() {
    return (
      <div>
        <p className={`${styles.formfield}  ${styles.indent}`}>
          <label htmlFor="wifiInfo_eapMethod" className={styles.label}>
            EAP method
          </label>
        </p>
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
      <p className={`${styles.formfield}  ${styles.indent}`}>
        <label htmlFor="wifiInfo_identity" className={styles.label}>
          Identity *
        </label>
        <br />
        <input
          name="wifiInfo_identity"
          type="text"
          ref={refIdentity}
          className={`${styles.textInputBox} ${styles.indentedWidth}`}
        />
      </p>
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
        <p className={`${styles.formfield}  ${styles.indent}`}>
          <label htmlFor="wifiInfo_phase2Auth" className={styles.label}>
            Phase 2 authentication
          </label>
        </p>
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
      <p className={`${styles.formfield}  ${styles.indent}`}>
        <label htmlFor="_caCertificate_file" className={styles.label}>
          CA certificate *
        </label>
        <br />
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
      </p>
    );
  }

  function UserCertificateSection() {
    return (
      <p className={`${styles.formfield}  ${styles.indent}`}>
        <label htmlFor="_userCertificate_file" className={styles.label}>
          User certificate *
        </label>
        <br />
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
      </p>
    );
  }

  return (
    <div data-tid="container" className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>WIFI network</h1>
        <h2 className={styles.subText}>Set WIFI network information.</h2>
        <form id="wifi_form" onSubmit={handleSubmit} className={styles.form}>
          <h3 className={styles.formName}>WIFI NETWORK INFORMATION</h3>
          <p className={styles.formfield}>
            <label htmlFor="wifiInfo_ssid" className={styles.label}>
              Name *
            </label>
            <br />
            <input
              name="wifiInfo_ssid"
              type="text"
              className={styles.textInputBox}
            />
          </p>
          <p className={styles.formfield}>
            <label htmlFor="wifiInfo_hidden" className={styles.label}>
              Hidden network
            </label>
            <br />
            {/* <input name="wifiInfo_hidden" type="checkbox" defaultChecked /> */}
          </p>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Switch
              id="wifiInfo_hidden"
              onChange={changeSetHiddenNetworkState}
              checked={isAddHiddenNetwork}
              height={16}
              width={30}
              uncheckedIcon={false}
              checkedIcon={false}
            />
            <label htmlFor="wifiInfo_hidden" className={styles.buttonLabel}>Add a hidden network</label>
          </div>
          <p className={styles.formfield}>
            <label
              htmlFor="wifiInfo_skipMacRandomization"
              className={styles.label}
            >
              WIFI MAC address randomization
            </label>
            <br />
            {/* <input
            name="wifiInfo_skipMacRandomization"
            type="checkbox"
            defaultChecked
          /> */}
          </p>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Switch
              id="wifiInfo_skipMacRandomization"
              onChange={changeSetRandomizedWifiMacAddress}
              checked={isWifiMacRandomized}
              height={16}
              width={30}
              uncheckedIcon={false}
              checkedIcon={false}
            />
            <label className={styles.buttonLabel}>
              {isWifiMacRandomized ? `On` : `Off`}
            </label>
          </div>
          <p className={styles.formfield}>
            <label htmlFor="_proxy" className={styles.label}>
              Proxy
            </label>
            <br />
          </p>
          <div className={styles.dropDownSelector}>
            <Select
              name="_proxy"
              options={proxyOptions}
              onChange={onChangeProxy}
              defaultValue={proxyOptions[0]}
            />
          </div>

          {showPacUrl ? <PacUrlSection /> : null}

          <p className={styles.formfield}>
            <label htmlFor="wifiInfo_securityType" className={styles.label}>
              Security
            </label>
          </p>
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

          <br />
          <Link to={`.${CreationRoutes.BASIC}`}>
            <button type="button">Go back</button>
          </Link>
        </form>
      </div>
      <div className={styles.buttonContainer}>
        <CustomButton form="wifi_form" type="submit" text="Continue" />
      </div>
    </div>
  );
}
