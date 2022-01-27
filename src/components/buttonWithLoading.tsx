import { css, SerializedStyles } from '@emotion/react';
import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface ButtonWithLoadingProps extends ButtonProps {
  loading: boolean;
  outerCss?: SerializedStyles;
}

const ButtonWithLoading: React.FC<ButtonWithLoadingProps> = ({
                                                               loading,
                                                               outerCss,
                                                               ...props
                                                             }) => {
  //Botão com indicador de carregamento.
  const classes = {
    outerDiv: css`
      position: relative;
      width: fit-content;
    `,
    progress: css`
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -12px;
      margin-left: -12px;
    `,
  };
  return (
    <div css={[outerCss, classes.outerDiv]}>
      {loading && <CircularProgress size={24} css={classes.progress} />}
      <Button disabled={loading} {...props}>
        {props.children}
      </Button>
    </div>
  );
};

export default ButtonWithLoading;
