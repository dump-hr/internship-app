import { Button, Grid } from '@mui/material';

import { useFetchAllInterns } from '../../api/useFetchAllInterns';
import LayoutSpacing from '../../components/LayoutSpacing/LayoutSpacing';
import LogoHeader from '../../components/LogoHeader';
import UsersList from '../../components/UsersList';
import c from './DashboardPage.module.css';

const DashboardPage = () => {
  const { data: interns } = useFetchAllInterns();

  return (
    <>
      <LogoHeader text="Kandidati" />
      <LayoutSpacing className={c.content}>
        <Grid container spacing={2} xs={13}>
          <Grid item xs={12} md={2}>
            <div className={c.infoBox}>
              <h3>{interns?.length}</h3>
              <p>Broj prijava</p>
            </div>
          </Grid>
          <Grid item xs={12} md={2}>
            <div className={c.infoBox}>
              <h3>499</h3>
              <p>Broj intervjua</p>
            </div>
          </Grid>
          <Grid item xs={12} md={2}>
            <div className={c.infoBox}>
              <h3>9999</h3>
              <p>Broj poslanih mailova</p>
            </div>
          </Grid>
          <Grid item xs={12} md={5}>
            <div className={c.buttonsWrapper}>
              <Button>Pregledaj dev ispit</Button>
              <Button>Pošalji mail</Button>
            </div>
          </Grid>
        </Grid>
        <UsersList data={interns} />
      </LayoutSpacing>
    </>
  );
};

export default DashboardPage;
