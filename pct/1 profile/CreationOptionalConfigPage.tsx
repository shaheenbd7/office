import React, { FormEvent, RefObject, useRef, useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import CreationParams from './CreationParams';
import styles from './Creation.css';
import CreationRoutes from './CreationRoutes.json';

export default function CreationOptionalConfigPage({
  rootJson,
}: CreationParams) {
  const history = useHistory();
  const { url, path } = useRouteMatch();

  useEffect(() => {
    console.log(
      `CreationOptionalConfigPage url=${url} path=${path} json=${JSON.stringify(
        rootJson
      )}`
    );
  });

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

  const onChangeEnabledPeripheralConfig = (e: FormEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.checked;
    if (currentValue) {
      showParagraph(refPeripheralConfigFileLocation);
      showParagraph(refKspAgentLocation);
      showParagraph(refPeripheralAgentPackageName);
      showParagraph(refPeripheralAgentSigningKey);
    } else {
      hideParagraph(refPeripheralConfigFileLocation);
      hideParagraph(refKspAgentLocation);
      hideParagraph(refPeripheralAgentPackageName);
      hideParagraph(refPeripheralAgentSigningKey);
    }
  };

  function isVisible(element: HTMLElement) {
    return !element.parentElement?.classList.contains(styles.hide);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    data.forEach((value: FormDataEntryValue, key: string) => {
      rootJson[key] = value;
    });

    history.push(`.${CreationRoutes.SUMMARY}`);
  };

  return (
    <div data-tid="container">
      <h1>Optional configuration</h1>
      <h2>
        Add device &amp; peripheral configuraiton policy or deploy 2nd
        application.
        <br />
        You can skip this step.
      </h2>
      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <h3>1. Device &amp; peripheral configuraiton</h3>
        <p className={styles.formfield}>
          <label htmlFor="_enable_peripheral_config">
            Enable this option when you want to configure...{' '}
          </label>
          <br />
          <input
            name="_enable_peripheral_config"
            type="checkbox"
            onChange={onChangeEnabledPeripheralConfig}
          />
        </p>
        <p className={`${styles.formfield} ${styles.hide}`}>
          <label htmlFor="appContent_0_href">
            Device &amp; peripheral configuraiton file location
          </label>
          <br />
          <input
            name="appContent_0_href"
            type="text"
            ref={refPeripheralConfigFileLocation}
          />
          &nbsp;&nbsp; (packageName:
          <input name="appContent_0_packageName" type="text" />)
        </p>
        <p className={`${styles.formfield} ${styles.hide}`}>
          <label htmlFor="management_secondaryAgents_0_href">
            Knox Service plug-in installation
          </label>
          <br />
          <input
            name="management_secondaryAgents_0_href"
            type="text"
            ref={refKspAgentLocation}
          />
        </p>
        <p className={`${styles.formfield} ${styles.hide}`}>
          <label htmlFor="management_secondaryAgents_0_packageName">
            Package name
          </label>
          <br />
          <input
            name="management_secondaryAgents_0_packageName"
            type="text"
            ref={refPeripheralAgentPackageName}
          />
        </p>
        <p className={`${styles.formfield} ${styles.hide}`}>
          <label htmlFor="management_secondaryAgents_0_signatures_0">
            Package signing key
          </label>
          <br />
          <input
            name="management_secondaryAgents_0_signatures_0"
            type="text"
            ref={refPeripheralAgentSigningKey}
          />
        </p>
        <h3>2. More Application</h3>
        <p className={styles.formfield}>
          <label htmlFor="management_secondaryAgents_1_packageName">
            Package name
          </label>
          <br />
          <input name="management_secondaryAgents_1_packageName" type="text" />
        </p>
        <p className={styles.formfield}>
          <label htmlFor="management_secondaryAgents_1_signatures_0">
            Package signing key
          </label>
          <br />
          <input name="management_secondaryAgents_1_signatures_0" type="text" />
        </p>
        <p className={styles.formfield}>
          <label htmlFor="management_secondaryAgents_1_href">
            Package download URL
          </label>
          <br />
          <input name="management_secondaryAgents_1_href" type="text" />
        </p>
        <br />
        <br />
        <Link to={`.${CreationRoutes.DO_PROFILE}`}>
          <button type="button">Go back</button>
        </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}
