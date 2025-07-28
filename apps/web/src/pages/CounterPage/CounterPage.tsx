import { useFetchCount } from '../../api/useFetchCount';

export const CounterPage = () => {
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
