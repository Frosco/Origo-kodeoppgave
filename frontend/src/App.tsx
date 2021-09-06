import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ReactElement, useEffect, useState } from 'react';
import StationTable from './components/StationTable';
import { StationStatus } from './types';

const prodApiUrl = 'https://oslobysykkelstasjoner.no/api';
const devApiUrl = 'http://localhost:3100';

let apiUrl: string;
if (process.env.NODE_ENV === 'production') {
  apiUrl = prodApiUrl;
} else {
  apiUrl = devApiUrl;
}

const useStyles = makeStyles({
  rootContainer: {
    margin: '8rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  header: {
    color: '#00008B'
  },
  search: {
    margin: '1rem'
  }
});

const App = (): ReactElement => {
  const classes = useStyles();

  const [unfilteredStations, setUnfilteredStations] = useState<StationStatus[]>();
  const [stations, setStations] = useState<StationStatus[]>();

  useEffect(() => {
    fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseBody) => {
        setUnfilteredStations(responseBody);
        setStations(responseBody);
      });
  }, []);

  return (
    <div className={classes.rootContainer}>
      <div className={classes.header}>
        <h1>Bysykkelstasjoner</h1>
      </div>

      <TextField
        className={classes.search}
        id="standard-search"
        label="Søk etter stasjon"
        type="search"
        onChange={(event): void => {
          const val = event?.target?.value ?? "";
          const filteredStations = unfilteredStations?.filter(s => s.name.toLowerCase().includes(val));
          if (filteredStations) {
            setStations(filteredStations);
          }
          else {
            setStations(unfilteredStations)
          }
        }} />

        <StationTable stations={stations}/>
      
    </div>
  );
}

export default App;
