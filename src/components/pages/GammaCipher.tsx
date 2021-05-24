import React, { ChangeEventHandler, useCallback, useState } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Page from '../common/Page';
import { gammaCipherEncode, gammaCipherDecode } from '../../utils/gammaCipher';

const useStyles = makeStyles({
  textInput: {
    width: '100%',
  },
});

const GammaCipher: React.FC = () => {
  const classes = useStyles();
  const [gamma, setGamma] = useState<string>('');
  const [message, setMessage] = useState<string>();
  const [encodedMessage, setEncodedMessage] = useState<string>();

  const handleGammaInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setGamma(value);
  };

  const handleMessageInputChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >(
    ({ target: { value } }) => {
      setMessage(value);

      const res = gamma && gammaCipherEncode(value || '', gamma);
      setEncodedMessage((res.match(/.{1,4}/g) || []).join(' '));
    },
    [gamma],
  );

  const handleEncodedMessageInputChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >(
    ({ target: { value } }) => {
      setEncodedMessage(value);

      const res = gamma && gammaCipherDecode(value || '', gamma || '');
      setMessage(res);
    },
    [gamma],
  );

  return (
    <Page>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Gamma"
            value={gamma}
            rows={4}
            multiline
            onChange={handleGammaInputChange}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            className={classes.textInput}
            multiline
            variant="outlined"
            size="small"
            placeholder="Enter your message here"
            value={message}
            rows={10}
            onChange={handleMessageInputChange}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            className={classes.textInput}
            multiline
            size="small"
            variant="outlined"
            placeholder="Output message"
            rows={10}
            value={encodedMessage}
            onChange={handleEncodedMessageInputChange}
          />
        </Grid>
      </Grid>
    </Page>
  );
};

export default GammaCipher;
