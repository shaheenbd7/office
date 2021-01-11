import React, { useEffect, useState } from 'react';
import { Switch, Link, Redirect, Route, useRouteMatch } from 'react-router-dom';

import routes from '../../../constants/routes.json';
import CreationRoutes from './CreationRoutes.json';

import CreationBasicPage from './CreationBasicPage';
import CreationWifiPage from './CreationWifiPage';
import CreationLegalAgreementPage from './CreationLegalAgreementPage';
import CreationDoProfilePage from './CreationDoProfilePage';
import CreationOptionalConfigPage from './CreationOptionalConfigPage';
import CreationSummaryPage from './CreationSummaryPage';
import CreationQRCodePage from './CreationQRCodePage';

const NotFound = () => {
  return (
    <div>
      <span>Failed creation. Something is wrong.</span>
      <Link to={routes.LIST}>
        <button type="button">Go to list</button>
      </Link>
    </div>
  );
};

export default function CreationProfileRootPage() {
  const { url, path } = useRouteMatch();

  const qrInfoJson = {
    additionalScanCount: 0,
    profileID: '12345',
    serviceType: 'PCT',
  };

  const [qrInfoState, setQrInfo] = useState<{ [key: string]: any }>(qrInfoJson);

  useEffect(() => {
    console.log(`CreationDoPage url=${url} path=${path}`);
  });

  const print = (json: { [key: string]: any }) => {
    console.log(`CreationDoPage print=${JSON.stringify(json)}`);
  };

  return (
    <div data-tid="container" style={{ height: '100%', overflowY: 'hidden' }}>
      <h4>Create new profile</h4>
      <Switch>
        <Route
          path={`${path}/${CreationRoutes.BASIC}`}
          component={() => (
            <CreationBasicPage rootJson={qrInfoState} print={print} />
          )}
        />

        <Route
          path={`${path}/${CreationRoutes.WIFI}`}
          component={() => <CreationWifiPage rootJson={qrInfoState} />}
        />

        <Route
          path={`${path}/${CreationRoutes.LEGAL}`}
          component={() => (
            <CreationLegalAgreementPage rootJson={qrInfoState} />
          )}
        />

        <Route
          path={`${path}/${CreationRoutes.DO_PROFILE}`}
          component={() => <CreationDoProfilePage rootJson={qrInfoState} />}
        />

        <Route
          path={`${path}/${CreationRoutes.OPTION_CONFIG}`}
          component={() => (
            <CreationOptionalConfigPage rootJson={qrInfoState} />
          )}
        />

        <Route
          path={`${path}/${CreationRoutes.SUMMARY}`}
          component={() => <CreationSummaryPage rootJson={qrInfoState} />}
        />

        <Route
          path={`${path}/${CreationRoutes.GENERATE_QR}`}
          component={() => <CreationQRCodePage rootJson={qrInfoState} />}
        />

        {/* exception */}
        <Route
          path={`${path}/${CreationRoutes.NOT_FOUND}`}
          component={NotFound}
        />
        <Redirect to={`${path}/${CreationRoutes.NOT_FOUND}`} />
      </Switch>
    </div>
  );
}
