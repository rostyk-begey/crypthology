import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';

import Page from '../common/Page';
import { alphabets } from '../../utils/alphabets';
import {
  trithemiusCipherEncode,
  trithemiusCipherDecode,
} from '../../utils/trithemiusCipher';
import FrequencyTable from '../common/FrequencyTable';

const useStyles = makeStyles({
  textInput: {
    width: '100%',
  },
});

const TrithemiusCipher: React.FC = () => {
  const classes = useStyles();
  const [shiftFn, setShiftFn] = useState<string>('i ** 2');
  const [message, setMessage] = useState<string>();
  const [encodedMessage, setEncodedMessage] = useState<string>();
  const [alphabet, setAlphabet] = useState<keyof typeof alphabets>('en');
  const handleShiftFnInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => setShiftFn(value);
  const handleMessageInputChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >(
    ({ target: { value } }) => {
      setMessage(value);

      try {
        const res = trithemiusCipherEncode(
          value || '',
          new Function('i', `return ${shiftFn}`) as any,
          alphabet,
        );
        setEncodedMessage(res);
      } catch (e) {}
    },
    [alphabet, shiftFn],
  );
  const handleEncodedMessageInputChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >(
    ({ target: { value } }) => {
      setEncodedMessage(value);

      try {
        const res = trithemiusCipherDecode(
          value || '',
          new Function('i', `return ${shiftFn}`) as any,
          alphabet,
        );
        setMessage(res);
      } catch (e) {}
    },
    [alphabet, shiftFn],
  );

  const handleAlphabetChange = ({ target: { value } }: any) => {
    setAlphabet(value as keyof typeof alphabets);
    setShiftFn('');
    setMessage('');
  };

  return (
    <Page>
      <Box mb={2} display="flex">
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
        <TextField
          variant="outlined"
          placeholder="Enter your shift function here"
          value={shiftFn}
          onChange={handleShiftFnInputChange}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">(i) =&gt;</InputAdornment>
            ),
          }}
        />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6}>
          <TextField
            className={classes.textInput}
            multiline
            variant="outlined"
            placeholder="Enter your message here"
            value={message}
            size="small"
            rows={2}
            onChange={handleMessageInputChange}
          />
          <FrequencyTable string={message || ''} />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            className={classes.textInput}
            multiline
            size="small"
            variant="outlined"
            placeholder="Output message"
            rows={2}
            value={shiftFn && encodedMessage}
            onChange={handleEncodedMessageInputChange}
          />
          <FrequencyTable string={encodedMessage || ''} />
        </Grid>
      </Grid>
    </Page>
  );
};

export default TrithemiusCipher;
