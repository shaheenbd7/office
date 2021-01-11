import React, { useEffect, FormEvent } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import routes from '../../../constants/routes.json';
import CreationParams from './CreationParams';
import CreationRoutes from './CreationRoutes.json';
import styles from './Creation.css';

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

  return (
    <div data-tid="container">
      <h1>Profile details</h1>
      <h2>Define your profile details.</h2>

      <form onSubmit={handleSubmit}>
        <h3>Basic information</h3>
        <p className={styles.formfield}>
          <label htmlFor="_profileName">Profile name *</label>
          <br />
          <input name="_profileName" type="text" />
        </p>
        <p className={styles.formfield}>
          <label htmlFor="organizationName">Organization *</label>
          <br />
          <input name="organizationName" type="text" />
        </p>
        <p className={styles.formfield}>
          <label htmlFor="_description">Description</label>
          <br />
          <textarea name="_description" />
        </p>
        <br />
        <Link to={routes.LIST}>
          <button type="button">Go to list</button>
        </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {/* <Link to={`.${CreationRoutes.WIFI}`}> */}
        <button type="submit">Continue</button>
        {/* </Link> */}
      </form>
    </div>
  );
}
