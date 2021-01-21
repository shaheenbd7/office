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

export default function CreationLegalAgreementPage({
  rootJson,
}: CreationParams) {
  const history = useHistory();
  const { url, path } = useRouteMatch();

  useEffect(() => {
    console.log(
      `CreationLegalAgreementPage url=${url} path=${path} json=${JSON.stringify(
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

    history.push(`.${CreationRoutes.DO_PROFILE}`);
  };

  const onPressBack = () => {
    history.push(`.${CreationRoutes.WIFI}`);
  };

  const onPressCancel = () => {
    // TODO: need to implement cancel action here
  };

  return (
    <div data-tid="container" className={styles.container}>
      <div className={`${styles.formContainer} ${styles.formContainerLegal}`}>
      <div className={styles.headerContainer}>
          <div
            onClick={onPressBack}
            onKeyPress={onPressBack}
            role="button"
            tabIndex={0}
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
          >
            <img src={cancel} alt="Cancel" className={styles.cancel} />
          </div>
        </div>
        <h1 className={styles.title}>
          {LEAGAL_AGREE_FORM_STRINGS.FORM_TITLE}
        </h1>
        <h2 className={styles.subText}>
          {LEAGAL_AGREE_FORM_STRINGS.SUB_TEXT1}
          <br />
          {LEAGAL_AGREE_FORM_STRINGS.SUB_TEXT2}
        </h2>
        <form id="legal_form" onSubmit={handleSubmit} className={styles.form}>
          <h3 className={styles.formName}>
            {LEAGAL_AGREE_FORM_STRINGS.FORM_NAME}
          </h3>
          <p className={styles.formfield}>
            <label htmlFor="eulas_0_title" className={styles.label}>
              {TITLE}
            </label>
            <br />
            <input
              name="eulas_0_title"
              type="text"
              className={styles.textInputBox}
            />
          </p>
          <p className={styles.formfield}>
            <label htmlFor="eulas_0_href" className={styles.label}>
              {' '}
              {LEAGAL_AGREE_FORM_STRINGS.EULA_CONTENT}(i)
            </label>
            <br />
            <input
              name="eulas_0_href"
              type="text"
              className={styles.textInputBox}
              placeholder={EXAMPLE_WEB}
            />
          </p>
        </form>
      </div>
      <div className={styles.buttonContainer}>
        <CustomButton form="legal_form" type="submit" text={CONTINUE} />
      </div>
    </div>
  );
}
