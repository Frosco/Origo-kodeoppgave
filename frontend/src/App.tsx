import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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
  container: {
    margin: '8rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  header: {
    color: '#00008B'
  },
  paper: {
    maxWidth: '75%'
  }
});

const App = (): ReactElement => {
  const classes = useStyles();

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
        setStations(responseBody);
      });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1>Bysykkelstasjoner</h1>
      </div>
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
            {stations && stations.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.bikes}</TableCell>
                <TableCell align="right">{row.docks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
