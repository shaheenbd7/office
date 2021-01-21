import React, {
  useEffect,
  useRef,
  useState,
  FormEvent,
  RefObject,
} from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';

import routes from '../../../constants/routes.json';
import CreationParams from './CreationParams';
import CreationRoutes from './CreationRoutes.json';
import styles from './Creation.css';
import {
  BASIC_FORM_STRINGS,
  CONTINUE,
  EMM_CREATE_PAGE_TITLE,
  PROFILE_NAME,
  ASTERIX,
  ORGANIZATION,
  DESCRIPTION,
} from '../../../constants/uiStrings';
import CustomButton from '../../../components/CustomButton';

import PaginationIndicator from '../../../components/PaginationIndicator';
import cancel from '../../../../resources/icons/cancel/cancel.png';
import back from '../../../../resources/icons/back/back.png';

export default function CreationBasicPage({ rootJson }: CreationParams) {
  const history = useHistory();
  const { url, path } = useRouteMatch();

  useEffect(() => {
    console.log(
      `CreationBasicPage url=${url} path=${path} json=${JSON.stringify(
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

    history.push(`.${CreationRoutes.WIFI}`);
  };

  const onPressBack = () => {
    history.push(`.${CreationRoutes.SUMMARY}`);
  };

  const onPressCancel = () => {
    // TODO: need to implement cancel action here
  };

  return (

    <div data-tid="container" className={styles.container}>
      <div className={styles.basicFormContainer}>
      <div className={styles.headerContainer}>
          <div className={styles.blankSpace}>            
          </div>
          <div>
            <h3 className={styles.pageTitle}>{EMM_CREATE_PAGE_TITLE}</h3>
            <PaginationIndicator noOfItems={7} selectedIndex={7} />
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
          <h1 className={styles.title}>{BASIC_FORM_STRINGS.FORM_TITLE}</h1>
          <h2 className={styles.subText}>{BASIC_FORM_STRINGS.SUB_TEXT}</h2>
          <form id="basic_from"  onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.formName}>{BASIC_FORM_STRINGS.FORM_NAME}</h3>
            <p className={styles.formfield}>
                <label htmlFor="profile_name" className={styles.label}>
                 {PROFILE_NAME} {ASTERIX}
                </label>
                <br />
                <input name="_profileName" type="text" className={styles.textInputBox} />
           </p>
           <p className={styles.formfield}>
                <label htmlFor="organizationName" className={styles.label}>
                  {ORGANIZATION} {ASTERIX}
                </label>
                <br />
                <input
                  name="organizationName"
                  type="text"
                  className={styles.textInputBox}
                  placeholder = "Samsung Electronics" />
           </p>

           <p className={styles.formfield}>
                <label htmlFor="_description" className={styles.label}>
                    {DESCRIPTION}
                </label>
                <br />
                <textarea name="_description" className={styles.textAreaBox}/>
           </p>

          </form>
      </div>
      <div className={styles.buttonContainer}>
          <CustomButton form="basic_from" type="submit" text={CONTINUE} />
      </div>
    </div>
  );
}
