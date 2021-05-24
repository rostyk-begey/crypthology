import React, { memo } from 'react';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import { Paper, TableBody, TableCell, TableRow } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import frequencyTable from '../../utils/frequencyTable';

interface Props {
  string: string;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// eslint-disable-next-line react/display-name
const FrequencyTable: React.FC<Props> = memo(({ string }) => {
  const classes = useStyles();
  const data = frequencyTable(string);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableRow>
          <TableCell variant="head" component="th" scope="row">
            Letter
          </TableCell>
          {Object.entries(data).map(([key]) => (
            <TableCell key={key} align="center">
              {key}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell variant="head" component="th" scope="row">
            Entries
          </TableCell>
          {Object.entries(data).map(([key, value]) => (
            <TableCell key={key} align="center">
              {value as string}
            </TableCell>
          ))}
        </TableRow>
      </Table>
    </TableContainer>
  );
});

export default FrequencyTable;
