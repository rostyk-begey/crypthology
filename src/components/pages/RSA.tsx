import React, { ChangeEventHandler, useCallback, useState } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NodeRSA from 'node-rsa';

import Page from '../common/Page';

const useStyles = makeStyles({
  textInput: {
    width: '100%',
  },
});

const RSAInstance = new NodeRSA({ b: 512 });

const RSA: React.FC = () => {
  const classes = useStyles();
  const [publicKey, setPublicKey] = useState<string>();
  const [privateKey, setPrivateKey] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [encryptedMessage, setEncryptedMessage] = useState<string>();

  const handlePublicKeyInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setPublicKey(value);
  };

  const handlePrivateKeyInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setPrivateKey(value);
  };

  const handleMessageInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setMessage(value);
  };

  const handleEncryptedMessageInputChange: ChangeEventHandler<HTMLInputElement> =
    ({ target: { value } }) => {
      setEncryptedMessage(value);
    };

  const handleClearButtonClick = () => {
    setPublicKey('');
    setPrivateKey('');
    setMessage('');
    setEncryptedMessage('');
  };

  const handleGenerateButtonClick = () => {
    setPublicKey(RSAInstance.exportKey('public'));
    setPrivateKey(RSAInstance.exportKey('private'));
  };

  const handleEncryptButtonClick = useCallback(() => {
    if (privateKey && publicKey) {
      try {
        RSAInstance.importKey(publicKey, 'public');
        RSAInstance.importKey(privateKey, 'private');
        setEncryptedMessage(RSAInstance.encrypt(message || '', 'base64'));
      } catch (e) {
        alert(`error: ${e.message}`);
      }
    }
  }, [privateKey, publicKey, message]);

  const handleDecryptButtonClick = useCallback(() => {
    if (privateKey && publicKey) {
      try {
        RSAInstance.importKey(publicKey, 'public');
        RSAInstance.importKey(privateKey, 'private');
        setMessage(RSAInstance.decrypt(encryptedMessage || '', 'utf8'));
      } catch (e) {
        alert(`error: ${e.message}`);
      }
    }
  }, [privateKey, publicKey, encryptedMessage]);

  return (
    <Page>
      <Box mb={2} display="flex">
        <Button onClick={handleGenerateButtonClick}>Generate key pair</Button>
        <Button onClick={handleEncryptButtonClick}>Encrypt</Button>
        <Button onClick={handleDecryptButtonClick}>Decrypt</Button>
        <Button onClick={handleClearButtonClick}>Clear</Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6}>
          <TextField
            className={classes.textInput}
            multiline
            variant="outlined"
            size="small"
            label="Public key"
            value={publicKey || ''}
            rows={10}
            onChange={handlePublicKeyInputChange}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            className={classes.textInput}
            multiline
            variant="outlined"
            size="small"
            label="Private key"
            value={privateKey || ''}
            rows={10}
            onChange={handlePrivateKeyInputChange}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            className={classes.textInput}
            multiline
            variant="outlined"
            size="small"
            label="Plaintext"
            value={message || ''}
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
            label="Encrypted message"
            rows={10}
            value={encryptedMessage || ''}
            onChange={handleEncryptedMessageInputChange}
          />
        </Grid>
      </Grid>
    </Page>
  );
};

export default RSA;
