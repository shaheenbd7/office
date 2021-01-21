import React, { FormEvent, useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import CreationParams from './CreationParams';
import CreationRoutes from './CreationRoutes.json';
import styles from './Creation.css';

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

  return (
    <div data-tid="container">
      <h1>Legal Agreement</h1>
      <h2>Custom privacy...</h2>
      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <h3>Legal agreement information</h3>
        <p className={styles.formfield}>
          <label htmlFor="eulas_0_title">Title</label>
          <br />
          <input name="eulas_0_title" />
        </p>
        <p className={styles.formfield}>
          <label htmlFor="eulas_0_href">Custom EULA contents (i)</label>
          <br />
          <input name="eulas_0_href" />
        </p>
        <br />
        <br />
        <Link to={`.${CreationRoutes.WIFI}`}>
          <button type="button">Go back</button>
        </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}
