import React, { FormEvent, useEffect, useRef } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import CreationUtils from './CreationUtils';
import CreationParams from './CreationParams';
import CreationRoutes from './CreationRoutes.json';
import EmmList from './refs/EmmList.json';
import styles from './Creation.css';

export default function CreationDoProfilePage({ rootJson }: CreationParams) {
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

  const onChangeEmm = (e: FormEvent<HTMLSelectElement>) => {
    const currentValue = e.currentTarget.value;

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mergeCustomJson();

    const data = new FormData(event.target as HTMLFormElement);
    data.forEach((value: FormDataEntryValue, key: string) => {
      rootJson[key] = value;
    });

    history.push(`.${CreationRoutes.OPTION_CONFIG}`);
  };

  return (
    <div data-tid="container">
      <h1>Device Owner profile information</h1>
      <h2>Contact your Device Owner profile for the information.</h2>
      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <h3>Device Owner profile</h3>
        <p className={styles.formfield}>
          <label htmlFor="_emm_vendor">Choose your EMM *</label>
          <br />
          <select name="_emm_vendor" onChange={onChangeEmm}>
            <option>Select EMM</option>
            <option value="Knox Manage">Knox Manage</option>
            <option value="Workspace ONE UEM">Workspace one UEM</option>
            <option value="SOTI">SOTI</option>
            <option value="MobileIron">Mobileiron</option>
            <option value="BlackBerry">Blackberry</option>
            <option value="Microsoft Intune">Microsoft intune</option>
            <option value="MaaS360">Maas 360</option>
            <option value="Citrix">Citrix</option>
            <option value="42Gears SureMDM">42gears SureMDM</option>
            <option value="7P">7P</option>
            <option value="FAMOC">FAMOC</option>
          </select>
        </p>
        <p className={styles.formfield}>
          <label htmlFor="management_agent_href">
            Device Owner APK download URL *
          </label>
          <br />
          <input name="management_agent_href" type="text" ref={refAgentHref} />
        </p>
        <p className={styles.formfield}>
          <label htmlFor="management_agent_adminComponent">
            Admin package component name *
          </label>
          <br />
          <input
            name="management_agent_adminComponent"
            type="text"
            ref={refAdminComponent}
          />
          &nbsp;&nbsp;&nbsp; (for Dev:
          <input
            name="management_agent_packageName"
            type="text"
            ref={refAdminPackageName}
            readOnly
          />
          )
        </p>
        <p className={styles.formfield}>
          <label htmlFor="management_agent_signatures_0">
            Admin package signature checksum *
          </label>
          <br />
          <input
            name="management_agent_signatures_0"
            type="text"
            ref={refSignatureChecksum}
          />
        </p>
        <p className={styles.formfield}>
          <label htmlFor="_do_profile_server_uri">
            Device owner profile server URI
          </label>
          <br />
          <input
            name="_do_profile_server_uri"
            type="text"
            ref={refProfileServerUri}
          />
          &nbsp;&nbsp;&nbsp; (for Dev:
          <input
            name="_do_profil_server_uri_name"
            type="text"
            ref={refProfileServerUriParamName}
            readOnly
          />
          )
        </p>
        <p className={styles.formfield}>
          <label htmlFor="_custom_json_data">
            Custom JSON Data (as defined by Device Owner profile)
          </label>
          <br />
          <textarea
            name="_custom_json_data"
            ref={refCustomJsonData}
            defaultValue='{"test": "test"}'
          />
        </p>
        <input
          name="management_payload_mdmProfileCustomData"
          type="hidden"
          readOnly
          ref={refMdmProfileCustomData}
        />
        <p className={styles.formfield}>
          <label htmlFor="_certificate_file">
            Root/intermediate certificate
          </label>
          <br />
          <input
            name="_certificate_file"
            type="file"
            onChange={(e) => {
              CreationUtils.onFileSelected(
                e.currentTarget,
                refCertificatesPem.current!,
                refCertificatesAlias.current!
              );
            }}
          />
          (for Dev:
          <input
            name="management_certificates_0_alias"
            type="text"
            readOnly
            ref={refCertificatesAlias}
          />
          <input
            name="management_certificates_0_pem"
            type="text"
            readOnly
            ref={refCertificatesPem}
          />
          )
        </p>
        <br />
        <br />
        <Link to={`.${CreationRoutes.LEGAL}`}>
          <button type="button">Go back</button>
        </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}
