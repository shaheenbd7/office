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

  function getTargetValueOnPage1(target: string) {
    let retVal = 'false';
    retVal = rootJson[target];
    if (retVal === 'undefined') {
      retVal = 'empty value !';
    }
    const intRetVal = retVal === 'true' ? 'enabled' : 'disabled';
    console.log(`retVal = ${target} :: ${retVal}`);
    switch (target) {
      case 'deviceProfileName':
        break;

      case 'screenTimeout':
        if (retVal === 'true') {
          const val = rootJson.screenTimeoutValue;
          retVal = `After ${val} seconds of inactivity.`;
        }
        break;

      case 'lockAutomatically':
        if (retVal === 'true') {
          const val = rootJson.lockAutomaticallyValue;
          retVal = `Enable, Lock the phone ${val} seconds after the screen turns off automatically, except when kept unlocked by Smart lock`;
        }
        break;

      case 'brightnessSlider':
        retVal = `Brightness is ${retVal}.`;
        break;

      case 'adaptiveBrightness':
        retVal = `Adaptive brightness is ${intRetVal}.`;
        break;

      case 'fontSizeSlider':
        retVal = `Font size is ${retVal}.`;
        break;

      case 'touchSensitivity':
        retVal = `Touch sensitivity is ${intRetVal}`;
        break;

      default:
        break;
    }
    return retVal;
  }

  function getTargetValueOnPage2(target: string) {
    let retVal = 'false';
    retVal = rootJson[target];
    if (retVal === 'undefined') {
      retVal = 'empty value !';
    }
    const intRetVal = retVal === 'true' ? 'enabled' : 'disabled';
    const intXcoverkey = rootJson.xCoverKey;
    const intTopkey = rootJson.topKey;
    console.log(`retVal = ${target} :: ${retVal}`);
    switch (target) {
      case 'navigation_type':
        retVal = `Type : ${retVal}`;
        break;

      case 'button_order':
        retVal = `Button order : ${retVal}`;
        break;

      case 'googleAssistant':
        // if (retVal === 'true') {
        retVal = `Google assistant is ${intRetVal}, Long press on home key to launch it.`;
        // }
        break;

      case 'xCoverKey':
        // retVal = `${retVal}`;
        if (retVal === 'Custom intent') {
          // document.getElementById('xcoverLaunch')?.classList.add(styles.hide);
          // document.getElementById('xcoverCustom')?.classList.remove(styles.hide);
        } else if (retVal === 'App launch') {
          // document.getElementById('xcoverCustom')?.classList.remove(styles.hide);
          // document.getElementById('xcoverLaunch')?.classList.remove(styles.hide);
        } else {
          // document.getElementById('xcoverLaunch')?.classList.remove(styles.hide);
          // document.getElementById('xcoverCustom')?.classList.remove(styles.hide);
        }
        break;

      case 'keyConfigXcoverkeyShortPkgname':
        if (intXcoverkey === 'Custom intent') {
          retVal = `Package name : ${retVal}`;
        }
        break;
      case 'keyConfigXcoverkeyShortPress':
        if (intXcoverkey === 'Custom intent') {
          retVal = `Short press : ${retVal}`;
        }
        break;
      case 'keyConfigXcoverkeyLongPkgname':
        if (intXcoverkey === 'Custom intent') {
          retVal = `Package name : ${retVal}`;
        }
        break;
      case 'keyConfigXcoverkeyLongPress':
        if (intXcoverkey === 'Custom intent') {
          retVal = `Long press : ${retVal}`;
        }
        break;
      case 'keyConfigXcoverkeyPkgname':
        if (intXcoverkey === 'App launch') {
          retVal = `Package name : ${retVal}`;
        }
        break;
      case 'keyConfigXcoverkeyPressed':
        if (intXcoverkey === 'App launch') {
          retVal = `Pressed : ${retVal}`;
        }
        break;
      case 'keyConfigXcoverkeyReleased':
        if (intXcoverkey === 'App launch') {
          retVal = `Released : ${retVal}`;
        }
        break;
      case 'topKey':
        // if (retVal === 'customIntent') {
        //   document.getElementById('topkeyLaunch')?.classList.add(styles.hide);
        // } else if (retVal === 'appLaunch') {
        //   document.getElementById('topkeyCustom')?.classList.add(styles.hide);
        // } else {
        //   document.getElementById('topkeyLaunch')?.classList.add(styles.hide);
        //   document.getElementById('topkeyCustom')?.classList.add(styles.hide);
        // }
        // retVal = `${retVal}`;
        break;

      case 'keyConfigTopkeyShortPkgname':
        if (intTopkey === 'Custom intent') {
          retVal = `Package name : ${retVal}`;
        }
        break;
      case 'keyConfigTopkeyShortPress':
        if (intTopkey === 'Custom intent') {
          retVal = `Short press : ${retVal}`;
        }
        break;
      case 'keyConfigTopkeyLongPkgname':
        if (intTopkey === 'Custom intent') {
          retVal = `Package name : ${retVal}`;
        }
        break;
      case 'keyConfigTopkeyLongPress':
        if (intTopkey === 'Custom intent') {
          retVal = `Long press : ${retVal}`;
        }
        break;
      case 'keyConfigTopkeyPkgname':
        if (intTopkey === 'App launch') {
          retVal = `Package name : ${retVal}`;
        }
        break;
      case 'keyConfigTopkeyPressed':
        if (intTopkey === 'App launch') {
          retVal = `Pressed : ${retVal}`;
        }
        break;
      case 'keyConfigTopkeyReleased':
        if (intTopkey === 'App launch') {
          retVal = `Released : ${retVal}`;
        }
        break;

      default:
        break;
    }
    return retVal;
  }

  function getTargetValueOnPage3(target: string) {
    let retVal = 'false';
    retVal = rootJson[target];
    if (retVal === 'undefined') {
      retVal = 'empty value !';
    }
    const intRetVal = retVal === 'true' ? 'enabled' : 'disabled';
    const intCptRetVal = retVal === 'true' ? 'Enabled' : 'Disabled';
    console.log(`retVal = ${target} :: ${retVal}`);
    switch (target) {
      case 'nfcEnabled':
        retVal = `Nfc is ${intRetVal}`;
        break;

      case 'disallowToAddWifiToBlocklist':
        retVal = `${intCptRetVal}, Prevent to block a specific AP connection because of adding to blocklist accidentally`;
        break;

      case 'setLanguageValue':
        retVal = `Language : ${retVal}`;
        break;

      case 'setCountryValue':
        retVal = `Country : ${retVal}`;
        break;

      case 'keyboardPerAppIf':
        // if (retVal !== '') {
        retVal = `IF : ${retVal}`;
        // }
        break;

      case 'keyboardPerAppThen':
        // if (retVal !== '') {
        retVal = `Then : ${retVal}`;
        // }
        break;

      default:
        break;
    }
    return retVal;
  }

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
      },
    })
  );

  const classes = useStyles();

  function GetPageContents() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper className={classes.paper} elevation={0}>
            DISPLAY CONFIGURATION
          </Paper>
          {/* <p> */}
          <b>1. Screen timeout</b>
          <br />
          {getTargetValueOnPage1('screenTimeout')}
          <br />
          <br />
          <b>2. Lock automatically</b>
          <br />
          {getTargetValueOnPage1('lockAutomatically')}
          <br />
          <br />
          <b>3. Brightness</b>
          <br />
          {getTargetValueOnPage1('brightnessSlider')}
          <br />
          {getTargetValueOnPage1('adaptiveBrightness')}
          <br />
          <br />
          <b>4. Font SIZE</b>
          <br />
          {getTargetValueOnPage1('fontSizeSlider')}
          <br />
          <br />
          <b>5. Touch sensitivity</b>
          <br />
          {getTargetValueOnPage1('touchSensitivity')}
          <br />
          {/* </p> */}
        </Grid>

        <Grid item xs={4}>
          <Paper className={classes.paper} elevation={0}>
            KEY CONFIGURATION
          </Paper>
          {/* <p> */}
          <b>1. Navigation bar</b>
          <br />
          {getTargetValueOnPage2('navigation_type')}
          <br />
          {getTargetValueOnPage2('button_order')}
          <br />
          {getTargetValueOnPage2('googleAssistant')}
          <br />
          <br />
          <b>2. X cover key</b>
          <br />
          {getTargetValueOnPage2('xCoverKey')}
          <br />
          <div>
            {getTargetValueOnPage2('keyConfigXcoverkeyShortPkgname')}
            <br />
            {getTargetValueOnPage2('keyConfigXcoverkeyShortPress')}
            <br />
            {getTargetValueOnPage2('keyConfigXcoverkeyLongPkgname')}
            <br />
            {getTargetValueOnPage2('keyConfigXcoverkeyLongPress')}
            <br />
          </div>
          <div>
            {getTargetValueOnPage2('keyConfigXcoverkeyPkgname')}
            <br />
            {getTargetValueOnPage2('keyConfigXcoverkeyPressed')}
            <br />
            {getTargetValueOnPage2('keyConfigXcoverkeyReleased')}
            <br />
          </div>
          <br />
          <b>3. Top key</b>
          <br />
          {getTargetValueOnPage2('topKey')}
          <br />
          <div>
            {getTargetValueOnPage2('keyConfigTopkeyShortPkgname')}
            <br />
            {getTargetValueOnPage2('keyConfigTopkeyShortPress')}
            <br />
            {getTargetValueOnPage2('keyConfigTopkeyLongPkgname')}
            <br />
            {getTargetValueOnPage2('keyConfigTopkeyLongPress')}
            <br />
          </div>
          <div>
            {getTargetValueOnPage2('keyConfigTopkeyPkgname')}
            <br />
            {getTargetValueOnPage2('keyConfigTopkeyPressed')}
            <br />
            {getTargetValueOnPage2('keyConfigTopkeyReleased')}
            <br />
          </div>
          {/* </p> */}
        </Grid>

        <Grid item xs={4}>
          <Paper className={classes.paper} elevation={0}>
            GENERAL CONFIGURATION
          </Paper>
          {/* <p> */}
          <b>1. NFC</b>
          <br />
          {getTargetValueOnPage3('nfcEnabled')}
          <br />
          <br />
          <b>2. Disable to add wifi blocklist</b>
          <br />
          {getTargetValueOnPage3('disallowToAddWifiToBlocklist')}
          <br />
          <br />
          <b>3. System Language &amp; Country</b>
          <br />
          {getTargetValueOnPage3('setLanguageValue')}
          <br />
          {getTargetValueOnPage3('setCountryValue')}
          <br />
          <br />
          <b>4. Key board per app</b>
          <br />
          {getTargetValueOnPage3('keyboardPerAppIf')}
          <br />
          {getTargetValueOnPage3('keyboardPerAppThen')}
          <br />
          {/* </p> */}
        </Grid>
      </Grid>
    );
  }

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
