import React, { useEffect, useState } from 'react';
import { Switch, Link, Redirect, Route, useRouteMatch } from 'react-router-dom';

import routes from '../../../constants/routes.json';
import DeviceRoutes from './DeviceRoutes.json';

import ProfileDetails from './ProfileDetails';
import DisplayConfiguration from './DisplayConfiguration';
import KeyConfiguration from './KeyConfiguration';
import GeneralConfiguration from './GeneralConfiguration';
import Summary from './Summary';

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

export default function RootPage() {
  const { url, path } = useRouteMatch();

  const creationInfoJson = {
    // creationID: '123',
    // creationStatus: 'Incomplete',
    _profileType: 'DEVICE_PERIPHERAL',
  };

  const [creationState, setCreationInfo] = useState<{ [key: string]: any }>(
    creationInfoJson
  );

  useEffect(() => {
    console.log(`RootPage url=${url} path=${path}`);
  });

  const print = (json: { [key: string]: any }) => {
    console.log(`RootPage print=${JSON.stringify(json)}`);
  };

  return (
    <div data-tid="container" style={{ height: '100%', overflowY: 'hidden' }}>
      <Switch>
        <Route
          path={`${path}/${DeviceRoutes.PROFILEDETAILS}`}
          component={() => (
            <ProfileDetails rootJson={creationState} print={print} />
          )}
        />
        <Route
          path={`${path}/${DeviceRoutes.DISPLAY}`}
          component={() => <DisplayConfiguration rootJson={creationState} />}
        />
        <Route
          path={`${path}/${DeviceRoutes.KEY}`}
          component={() => <KeyConfiguration rootJson={creationState} />}
        />
        <Route
          path={`${path}/${DeviceRoutes.GENERAL}`}
          component={() => <GeneralConfiguration rootJson={creationState} />}
        />
        <Route
          path={`${path}/${DeviceRoutes.SUMMARY}`}
          component={() => <Summary rootJson={creationState} />}
        />
        {/* exception */}
        <Route
          path={`${path}/${DeviceRoutes.NOT_FOUND}`}
          component={NotFound}
        />
        <Redirect to={`${path}/${DeviceRoutes.NOT_FOUND}`} />
      </Switch>
    </div>
  );
}
