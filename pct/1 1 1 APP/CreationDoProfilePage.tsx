import React, { FormEvent, useEffect, useRef } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import CreationUtils, { saveAsDraft, storeFormIntoJson } from './CreationUtils';
import CreationParams from './CreationPageAttrs';
import Select from 'react-select';
import CSS from 'csstype';

import CreationRoutes from './CreationRoutes.json';
import EmmList from './refs/EmmList.json';
import styles from './Creation.css';
import PaginationIndicator from '../../../components/PaginationIndicator';
import CustomButton from '../../../components/CustomButton';
import {
  DEVICE_OWNER_FORM_STRINGS,
  CHOOSE_EMM,
  ASTERIX,
  CONTINUE,
  ADMIN_COMP,
  ADMIN_SIGN,
  DO_APK,
  DO_URI,
  CUSTOM_JSON,
  SELECTED_ITEM,
  EMM_CREATE_PAGE_TITLE,
  CONFIG_PRIVATE_URL,
  ROOT_CERT,
  EXAMPLE_WEB,
  UPLOAD_CERTIFICATE_FILE,
} from '../../../constants/uiStrings';
import cancel from '../../../../resources/icons/cancel/cancel.png';
import back from '../../../../resources/icons/back/back.png';
import info from '../../../../resources/icons/info/info.png';

export default function CreationDoProfilePage({ rootJson }: CreationParams) {
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
      `CreationDoProfilePage url=${url} path=${path} json=${JSON.stringify(
        rootJson
      )}`
    );
  });

  const refAgentHref = useRef<HTMLInputElement>(null);
  const refAdminComponent = useRef<HTMLInputElement>(null);
  const refAdminPackageName = useRef<HTMLInputElement>(null);
  const refSignatureChecksum = useRef<HTMLInputElement>(null);
  const refProfileServerUri = useRef<HTMLInputElement>(null);
  const refProfileServerUriParamName = useRef<HTMLInputElement>(null);
  const refCustomJsonData = useRef<HTMLTextAreaElement>(null);
  const refMdmProfileCustomData = useRef<HTMLInputElement>(null);

  const refCertificatesAlias = useRef<HTMLInputElement>(null);
  const refCertificatesPem = useRef<HTMLInputElement>(null);

  const emmOptions = [
    { value: 'Knox Manage', label: 'Knox Manage' },
    { value: 'Workspace ONE UEM', label: 'Workspace one UEM' },
    { value: 'SOTI', label: 'SOTI' },
    { value: 'MobileIron', label: 'Mobileiron' },
    { value: 'BlackBerry', label: 'Blackberry' },
    { value: 'Microsoft Intune', label: 'Microsoft intune' },
    { value: 'MaaS360', label: 'Maas 360' },
    { value: 'Citrix', label: 'Citrix' },
    { value: '42Gears SureMDM', label: '42gears SureMDM' },
    { value: '7P', label: '7P' },
    { value: 'FAMOC', label: 'FAMOC' },
  ];

  const onChangeEmm = (e: { value: string; label: string }) => {
    const currentValue = e.value;

    const emm = EmmList.find((item) => currentValue === item.customerName);
    const uri = emm?.externalIntent.mdmApkUri || '';
    const paramName = emm?.externalIntent.kmeUri || '';
    const adminComponentName = emm?.adminComponent || '';
    const adminPackageName = emm?.packageName || '';
    const signatureChecksum = emm?.signatureChecksum || '';

    refAgentHref!.current!.value = uri;
    refAdminComponent!.current!.value = adminComponentName;
    refAdminPackageName!.current!.value = adminPackageName;
    refSignatureChecksum!.current!.value = signatureChecksum;

    refProfileServerUriParamName!.current!.value = paramName;
  };

  const onPressBack = () => {
    history.push(`.${CreationRoutes.LEGAL}`);
  };

  const onPressCancel = () => {
    // TODO: need to implement cancel action here
  };

  function mergeCustomJson() {
    const profileServerUri = refProfileServerUri.current?.value;
    const profileServerUriParamName = refProfileServerUriParamName!.current
      ?.value;
    const customJson = JSON.parse(refCustomJsonData.current?.value || '{}');

    const newCustomJson: { [key: string]: any } = {};
    if (profileServerUriParamName) {
      newCustomJson[profileServerUriParamName] = profileServerUri;
    }
    Object.keys(customJson).forEach((key) => {
      newCustomJson[key] = customJson[key];
    });
    refMdmProfileCustomData.current!.value = JSON.stringify(newCustomJson);
  }

  const onClickCloseButton = () => {
    const form = document.querySelector('form');
    storeFormIntoJson(form, rootJson);
    saveAsDraft(rootJson);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    mergeCustomJson();

    event.preventDefault();
    const form = document.querySelector('form');
    storeFormIntoJson(form, rootJson);

    history.push(`.${CreationRoutes.OPTION_CONFIG}`);
  };

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
            <PaginationIndicator noOfItems={7} selectedIndex={4} />
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
        <h1 className={styles.title}>{DEVICE_OWNER_FORM_STRINGS.FORM_TITLE}</h1>
        <h2 className={styles.subText}>{DEVICE_OWNER_FORM_STRINGS.SUB_TEXT}</h2>

        <form
          id="do_profile_form"
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <h3 className={styles.formName}>
            {DEVICE_OWNER_FORM_STRINGS.FORM_NAME}
          </h3>
          <p className={styles.placeholderText} style={subTextInlineStyle}>
            {DEVICE_OWNER_FORM_STRINGS.SUB_TEXT2}
          </p>
          <div>
            <div
              className={styles.labelContainer}
              style={labelContainerInlineStyle}
            >
              <label
                htmlFor="_emm_vendor"
                className={styles.label}
                style={labelInlineStyle}
              >
                {`${CHOOSE_EMM}${ASTERIX}`}
              </label>

              <img src={info} alt="Info" className={styles.iconInfo} />
            </div>
            <div className={styles.dropDownSelector}>
              <Select
                name="_emm_vendor"
                options={emmOptions}
                onChange={onChangeEmm}
                placeholder={SELECTED_ITEM}
              />
            </div>
          </div>
          <div>
            <div
              className={styles.labelContainer}
              style={labelContainerInlineStyle}
            >
              <label
                htmlFor="management_agent_href"
                className={styles.label}
                style={labelInlineStyle}
              >
                {`${DO_APK}${ASTERIX}`}
              </label>
              <img src={info} alt="Info" className={styles.iconInfo} />
            </div>
            <input
              name="management_agent_href"
              type="text"
              className={styles.textInputBox}
              ref={refAgentHref}
              placeholder={CONFIG_PRIVATE_URL}
            />
          </div>
          <div>
            <div
              className={styles.labelContainer}
              style={labelContainerInlineStyle}
            >
              <label
                htmlFor="management_agent_adminComponent"
                className={styles.label}
                style={labelInlineStyle}
              >
                {`${ADMIN_COMP}${ASTERIX}`}
              </label>
              <img src={info} alt="Info" className={styles.iconInfo} />
            </div>
            <input
              name="management_agent_adminComponent"
              type="text"
              className={styles.textInputBox}
              ref={refAdminComponent}
            />
          </div>
          <input
            name="management_agent_packageName"
            type="text"
            style={{ display: 'none' }}
            ref={refAdminPackageName}
            readOnly
          />
          <div>
            <div
              className={styles.labelContainer}
              style={labelContainerInlineStyle}
            >
              <label
                htmlFor="management_agent_signatures_0"
                className={styles.label}
                style={labelInlineStyle}
              >
                {`${ADMIN_SIGN}${ASTERIX}`}
              </label>
              <img src={info} alt="Info" className={styles.iconInfo} />
            </div>
            <input
              name="management_agent_signatures_0"
              type="text"
              className={styles.textInputBox}
              ref={refSignatureChecksum}
            />
          </div>
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
                {DO_URI}
              </label>
            </div>
            <input
              name="_do_profile_server_uri"
              type="text"
              className={styles.textInputBox}
              ref={refProfileServerUri}
              placeholder={EXAMPLE_WEB}
            />
          </div>
          <input
            name="_do_profil_server_uri_name"
            type="text"
            style={{ display: 'none' }}
            ref={refProfileServerUriParamName}
            readOnly
          />
          <div>
            <div
              className={styles.labelContainer}
              style={labelContainerInlineStyle}
            >
              <label
                htmlFor="_custom_json_data"
                className={styles.label}
                style={labelInlineStyle}
              >
                {CUSTOM_JSON}
              </label>
            </div>
            <textarea
              name="_custom_json_data"
              type="text"
              className={styles.textAreaBoxJsonInput}
              ref={refCustomJsonData}
            />
          </div>
          <input
            name="management_payload_mdmProfileCustomData"
            type="hidden"
            readOnly
            ref={refMdmProfileCustomData}
          />
          <div>
            <div
              className={styles.labelContainer}
              style={labelContainerInlineStyle}
            >
              <label
                htmlFor="_certificate_file"
                className={styles.label}
                style={labelInlineStyle}
              >
                {ROOT_CERT}
              </label>
            </div>
            <div className={styles.uploadCertificateBtn}>
              <label
                htmlFor="upload_intermediate_certificate"
                className={styles.uploadCertificateBtnText}
              >
                {UPLOAD_CERTIFICATE_FILE}
              </label>
              <input
                name="_certificate_file"
                id="upload_intermediate_certificate"
                style={{ display: 'none' }}
                type="file"
                onChange={(e) => {
                  CreationUtils.onFileSelected(
                    e.currentTarget,
                    refCertificatesPem.current!,
                    refCertificatesAlias.current!
                  );
                }}
              />
            </div>
          </div>
          <input
            name="management_certificates_0_alias"
            type="text"
            style={{ display: 'none' }}
            readOnly
            ref={refCertificatesAlias}
          />
          <input
            name="management_certificates_0_pem"
            type="text"
            style={{ display: 'none' }}
            readOnly
            ref={refCertificatesPem}
          />
        </form>
      </div>
      <div className={styles.buttonContainer}>
        <CustomButton form="do_profile_form" type="submit" text={CONTINUE} />
      </div>
    </div>
  );
}
