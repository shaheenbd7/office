import React, { useEffect, FormEvent, useRef } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DeviceParams from './DeviceParams';
import routes from '../../../constants/routes.json';
import { saveAsComplete } from '../emm/CreationUtils';
//import styles from '../emm/Creation.css';
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
import { getPageCount } from '@material-ui/data-grid';

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

  function onPressBack() {
    // TODO
  }

  function onPressCancel() {
    // TODO
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
          <PaginationIndicator noOfItems={4} selectedIndex={4} />
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
        <h1 className={styles.title}>{DEVICE_OWNER_SUMMARY_FORM_STRINGS.FORM_TITLE}</h1>
        <h2 className={styles.subText}>{DEVICE_OWNER_SUMMARY_FORM_STRINGS.SUB_TEXT}</h2>
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

  function DisplayConfigurationSection() {
    return (
      <div className={styles.displayConfigSection}>
        <h1 className={styles.sectionTitle}>{DEVICE_OWNER_SUMMARY_FORM_STRINGS.DISLAY_TITLE}</h1>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>{DEVICE_OWNER_SUMMARY_FORM_STRINGS.DISLAY_SCREEN}</h1>
          <h1 className={styles.sectionText}>
            After 30 seconds of inactivity.
          </h1>
        </div>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>{DEVICE_OWNER_SUMMARY_FORM_STRINGS.DISLAY_LOCK}</h1>
          <h1 className={styles.sectionText}>
            Enable, Lock the phone 5 seconds after the screen turns off
            automatically, except when kept unlocked by Smart lock.
          </h1>
        </div>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>{DEVICE_OWNER_SUMMARY_FORM_STRINGS.DISPLAY_BRIGTHNESS}</h1>
          <h1 className={styles.sectionText}>
            Brightness is 100. Adaptive brigtness is enable.
          </h1>
        </div>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>{DEVICE_OWNER_SUMMARY_FORM_STRINGS.DISPLAY_FONT}</h1>
          <h1 className={styles.sectionText}>Font size is 1.</h1>
        </div>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>{DEVICE_OWNER_SUMMARY_FORM_STRINGS.DISPLAY_TOUCH}</h1>
          <h1 className={styles.sectionText}>Touch sesitivity is enable.</h1>
        </div>
      </div>
    );
  }

  function KeyConfigurationSection() {
    return (
      <div className={styles.keyConfigSection}>
        <h1 className={styles.sectionTitle}>{DEVICE_OWNER_SUMMARY_FORM_STRINGS.KEY_TITLE}</h1>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>{DEVICE_OWNER_SUMMARY_FORM_STRINGS.KEY_NAV}</h1>
          <h1 className={styles.sectionText}>Type: Buttons</h1>
          <h1 className={styles.sectionText}>Button order: Back / Home / Apps</h1>
          <h1 className={styles.sectionText}>Google assistant is enable, Long press on home key to launch it.</h1>
        </div>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>{DEVICE_OWNER_SUMMARY_FORM_STRINGS.KEY_XCOVER}</h1>
          <h1 className={styles.sectionText}>MS team</h1>
        </div>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>{DEVICE_OWNER_SUMMARY_FORM_STRINGS.KEY_TOP}</h1>
          <h1 className={styles.sectionText}>Custome intent</h1>
          <h1 className={styles.sectionText}>Package name: test.test.com</h1>
          <h1 className={styles.sectionText}>Short presss: com.sec.android.app.camera/com.sec.android.a…</h1>
          <h1 className={styles.sectionText}>Long presss: com.sec.android.app.camera/com.sec.android.a…</h1>
        </div>
      </div>
    );
  }

  function GeneralConfigurationSection() {
    return (
      <div className={styles.generalConfigSection}>
        <h1 className={styles.sectionTitle}>{DEVICE_OWNER_SUMMARY_FORM_STRINGS.GENERAL_TITLE}</h1>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>{DEVICE_OWNER_SUMMARY_FORM_STRINGS.GENERAL_NFC}</h1>
          <h1 className={styles.sectionText}>NFC is enable.</h1>
        </div>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>{DEVICE_OWNER_SUMMARY_FORM_STRINGS.GENERAL_WIFI}</h1>
          <h1 className={styles.sectionText}>Enable, Prevent to block a specific AP connection because of adding to blocklist accidentally.</h1>
        </div>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>{DEVICE_OWNER_SUMMARY_FORM_STRINGS.GENERAL_SYSTEM}</h1>
          <h1 className={styles.sectionText}>Language: %s</h1>
          <h1 className={styles.sectionText}>Country: %s</h1>
        </div>
        <div className={styles.subSection}>
          <h1 className={styles.sectionTitleSub}>{DEVICE_OWNER_SUMMARY_FORM_STRINGS.GENERAL_KEYBOARD}</h1>
          <h1 className={styles.sectionText}>IF: %s</h1>
          <h1 className={styles.sectionText}>Then: %s</h1>
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
          {/* <GetPageContents /> */}
        </form>
      </div>
      <FooterSection />
    </div>
  );
}
