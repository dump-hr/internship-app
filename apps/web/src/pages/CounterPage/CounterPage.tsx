import { InteractionType } from '@azure/msal-browser';
import { useMsalAuthentication } from '@azure/msal-react';

import { useFetchCount } from '../../api/useFetchCount';

const CounterPage = () => {
  useMsalAuthentication(InteractionType.Redirect);

  const { data } = useFetchCount();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        color: 'rgb(40, 45, 48)',
      }}
    >
      <div
        style={{
          fontSize: '100px',
        }}
      >
        Broj prijava:
      </div>
      <div
        style={{
          fontSize: '500px',
          fontWeight: '700',
          color: '#5cc2a0',
        }}
      >
        {data}
      </div>
    </div>
  );
};

export default CounterPage;
