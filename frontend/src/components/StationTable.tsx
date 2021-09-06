
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { StationStatus } from '../types';
import { ReactElement } from 'react';

const useStyles = makeStyles({
    paper: {
        maxWidth: '75%'
    },
    error: {
        color: 'red'
    }
});

const StationTable = ({stations}: {stations: StationStatus[] | undefined;}): ReactElement => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
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
    )
}

export default StationTable