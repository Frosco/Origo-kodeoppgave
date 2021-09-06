import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { ReactElement, useEffect, useState } from 'react';
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
  },
  paper: {
    maxWidth: '75%'
  },
  error: {
    color: 'red'
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

      <TableContainer className={classes.paper} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Stasjon</TableCell>
              <TableCell align="right">Sykler</TableCell>
              <TableCell align="right">Lås</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stations ?
              stations.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.bikes}</TableCell>
                  <TableCell align="right">{row.docks}</TableCell>
                </TableRow>
              )) :
              <p className={classes.error}>Vi kan dessverre ikke vise stasjonene akkurat nå. Prøv igjen senere.</p>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
