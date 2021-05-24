import React, { ChangeEventHandler, useCallback, useState } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

import Page from '../common/Page';
import { alphabets } from '../../utils/alphabets';
import {
  viegenereCipherEncode,
  viegenereCipherDecode,
} from '../../utils/vigenereCipher';
import FrequencyTable from '../common/FrequencyTable';

const useStyles = makeStyles({
  textInput: {
    width: '100%',
  },
});

const VigenereCipher: React.FC = () => {
  const classes = useStyles();
  const [keyword, setKeyword] = useState<string>('');
  const [message, setMessage] = useState<string>();
  const [encodedMessage, setEncodedMessage] = useState<string>();
  const [alphabet, setAlphabet] = useState<keyof typeof alphabets>('en');

  const handleKeyInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => setKeyword(value);

  const handleMessageInputChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >(
    ({ target: { value } }) => {
      setMessage(value);

      const res =
        keyword && viegenereCipherEncode(value || '', keyword || '', alphabet);
      setEncodedMessage(res);
    },
    [alphabet, keyword],
  );

  const handleEncodedMessageInputChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >(
    ({ target: { value } }) => {
      setEncodedMessage(value);

      const res =
        keyword && viegenereCipherDecode(value || '', keyword || '', alphabet);
      setMessage(res);
    },
    [alphabet, keyword],
  );

  const handleAlphabetChange = ({ target: { value } }: any) => {
    setAlphabet(value as keyof typeof alphabets);
    setKeyword('');
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
          size="small"
          placeholder="Keyword"
          value={keyword}
          onChange={handleKeyInputChange}
        />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6}>
          <TextField
            className={classes.textInput}
            multiline
            variant="outlined"
            size="small"
            placeholder="Enter your message here"
            value={message}
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
            value={encodedMessage}
            onChange={handleEncodedMessageInputChange}
          />
          <FrequencyTable string={encodedMessage || ''} />
        </Grid>
      </Grid>
    </Page>
  );
};

export default VigenereCipher;
