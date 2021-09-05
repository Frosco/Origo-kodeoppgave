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

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
});

const App = () : ReactElement => {
  const classes = useStyles();
  const url = "http://localhost:3100"
  
  const [stations, setStations] = useState<StationStatus[]>();

  useEffect(() => {
    fetch(url, {
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
  }, [url]);

  console.log(stations);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
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
  );
}

export default App;