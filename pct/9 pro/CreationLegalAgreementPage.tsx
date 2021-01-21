import React, { useEffect, FormEvent } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import CreationParams from './CreationParams';
import CreationRoutes from './CreationRoutes.json';
import styles from './Creation.css';
import CustomButton from '../../../components/CustomButton';
import PaginationIndicator from '../../../components/PaginationIndicator';
import {
  LEAGAL_AGREE_FORM_STRINGS,
  TITLE,
  EXAMPLE_WEB,
  CONTINUE,
  EMM_CREATE_PAGE_TITLE,
} from '../../../constants/uiStrings';
import cancel from '../../../../resources/icons/cancel/cancel.png';
import back from '../../../../resources/icons/back/back.png';
import CSS from 'csstype';
import info from '../../../../resources/icons/info/info.png';

export default function CreationLegalAgreementPage({
  rootJson,
}: CreationParams) {

  const labelContainerInlineStyle: CSS.Properties = {
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };

  const labelInlineStyle: CSS.Properties = {
    margin: '0px',
    marginRight: '8px',
  };

  const subTextInlineStyle: CSS.Properties = {
    width: '440px',
  };

  const history = useHistory();
  const { url, path } = useRouteMatch();

  useEffect(() => {
    console.log(
      `CreationLegalAgreementPage url=${url} path=${path} json=${JSON.stringify(
        rootJson
      )}`
    );
  });

  const onPressBack = () => {
    history.push(`.${CreationRoutes.WIFI}`);
  };

  const onPressCancel = () => {
    // TODO: need to implement cancel action here
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    data.forEach((value: FormDataEntryValue, key: string) => {
      rootJson[key] = value;
    });

    history.push(`.${CreationRoutes.DO_PROFILE}`);
  };


  function GetTitleComponent() {
    return (
      <div>
        <div
          className={styles.labelContainer}
          style={labelContainerInlineStyle}
        >
          <label
            htmlFor="eulas_0_title"
            className={styles.label}
            style={labelInlineStyle}
          >
          {TITLE}
          </label>                
        </div>
        <input
          name="eulas_0_title"
          type="text"
          className={styles.textInputBox}
        />
    </div>  
    );
  }

  function GetCustomEulaContentComponent() {
    return (
      <div>
        <div
          className={styles.labelContainer}
          style={labelContainerInlineStyle}
        >
          <label
            htmlFor="_do_profile_server_uri"
            className={styles.label}
            style={labelInlineStyle}
          >
          {LEAGAL_AGREE_FORM_STRINGS.EULA_CONTENT}
          </label>
          <img src={info} alt="Info" className={styles.iconInfo} />
        </div>
        <input
          name="_do_profile_server_uri"
          type="text"
          className={styles.textInputBox}
          placeholder={EXAMPLE_WEB}
        />
      </div>          
    );
  }

  return (
    <div data-tid="container" className={styles.container}>
      <div className={`${styles.formContainer} ${styles.formContainerLegal}`}>
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
            <PaginationIndicator noOfItems={7} selectedIndex={3} />
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
        <h1 className={styles.title}>{LEAGAL_AGREE_FORM_STRINGS.FORM_TITLE}</h1>
        <h2 className={styles.subText}>
          {LEAGAL_AGREE_FORM_STRINGS.SUB_TEXT1}
          <br />
          {LEAGAL_AGREE_FORM_STRINGS.SUB_TEXT2}
        </h2>
        <form id="legal_form" onSubmit={handleSubmit} className={styles.form}>
          <h3 className={styles.formName}>
            {LEAGAL_AGREE_FORM_STRINGS.FORM_NAME}
          </h3>
          <p className={styles.placeholderText} style={subTextInlineStyle}>
            {LEAGAL_AGREE_FORM_STRINGS.FORM_SUBTEXT}
          </p>

          <p className={styles.formfield}>                 
            <GetTitleComponent />
            <GetCustomEulaContentComponent />
          </p>
        </form>
      </div>
      <div className={styles.buttonContainer}>
        <CustomButton form="legal_form" type="submit" text={CONTINUE} />
      </div>
    </div>
  );
}
