import React, { ChangeEventHandler, useState } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

import Page from '../common/Page';
import { caesarShift } from '../../utils/caesarShift';
import { alphabets } from '../../utils/alphabets';
import FrequencyTable from '../common/FrequencyTable';

const useStyles = makeStyles({
  textInput: {
    width: '100%',
  },
});

const CaesarShift: React.FC = () => {
  const classes = useStyles();
  const [message, setMessage] = useState<string>();
  const [alphabet, setAlphabet] = useState<keyof typeof alphabets>('en');
  const [shiftAmount, setShiftAmount] = useState<number>(0);
  const handleMessageInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => setMessage(value);

  const handleAlphabetChange = ({ target: { value } }: any) => {
    setAlphabet(value as keyof typeof alphabets);
    setShiftAmount(0);
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleShiftAmountChange = ({ target: { value } }) => {
    setShiftAmount(value);
  };
  const options = [
    {
      value: 0,
      label: 'All options',
    },
    ...Array.from({ length: alphabets[alphabet].length - 1 }, (_, i) => ({
      value: i + 1,
      label: `${i + 1}`,
    })),
  ];

  const renderShiftSection = (i: number) => (
    <>
      <h2>Shift {i}</h2>
      <p>{message && caesarShift(message, i, alphabet)}</p>
      <hr />
    </>
  );

  return (
    <Page>
      <Box mb={2} display="flex">
        <Select
          label="Shift amount"
          value={shiftAmount}
          onChange={handleShiftAmountChange}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <Select
          label="Alphabet"
          value={alphabet}
          onChange={handleAlphabetChange}
        >
          {Object.keys(alphabets).map((key) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6}>
          <TextField
            className={classes.textInput}
            multiline
            variant="outlined"
            placeholder="Enter your message here"
            size="small"
            value={message}
            onChange={handleMessageInputChange}
          />
          {message && !!shiftAmount && (
            <FrequencyTable
              string={caesarShift(message, shiftAmount, alphabet)}
            />
          )}
        </Grid>
        <Grid item xs={6} sm={6}>
          {shiftAmount !== 0 && (
            <>
              {renderShiftSection(shiftAmount)}
              <FrequencyTable string={message || ''} />
            </>
          )}
          {shiftAmount === 0 &&
            Array.from({ length: alphabets[alphabet].length - 1 }, (_, i) =>
              renderShiftSection(i + 1),
            )}
        </Grid>
      </Grid>
    </Page>
  );
};

export default CaesarShift;
