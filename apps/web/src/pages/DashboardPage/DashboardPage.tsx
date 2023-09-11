import c from './DashboardPage.module.css';
import { Grid, Button } from '@mui/material';

import LayoutSpacing from '../../components/LayoutSpacing/LayoutSpacing';
import LogoHeader from '../../components/LogoHeader';
import UsersList from '../../components/UsersList';

const DashboardPage = () => {
  return (
    <>
      <LogoHeader text="Kandidati" />
      <LayoutSpacing className={c.content}>
        <Grid container spacing={2} xs={13}>
          <Grid item xs={12} md={2}>
            <div className={c.infoBox}>
              <h3>500</h3>
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
        <UsersList />
      </LayoutSpacing>
    </>
  );
};

export default DashboardPage;
