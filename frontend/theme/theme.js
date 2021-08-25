import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      fcx: 400,
      sm: 760,
      md: 960,
      lg: 1280,
      xl: 1400,
      xxxl: 1800,
    },
  },
  spacing: 4,
  borderRadius: 1,
  palette: {
    primary: {
      main: '#0d4bdc',
      dark: '#142561',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#d463e4',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#585a5d',
      secondary: '#536382',
      disabled: '#D3DDE7',
      hint: '#8987A3',
    },
    divider: '#DFE6ED',
    background: {
      paper: '#ffffff',
      default: '#F7F3F2',
    },
  },
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(11, 24, 56, 0.5)',
      },
    },
    MuiButton: {
      root: {
        padding: '0.5rem 2rem',
        '&$disabled': {
          color: '#bdceda',
        },
      },
      contained: {
        backgroundColor: '#f5fafc',
        border: '1px solid rgba(105,143,212,0.2)',
        '&:hover': {
          backgroundColor: '#f5fafc',
          border: '1px solid rgba(105,143,212,0.5)',
        },
      },
      containedPrimary: {
        background: 'linear-gradient(318deg, rgba(158,235,235,1) 0%, rgba(90,186,186,1) 7%, rgba(51,211,210,1) 44%)',
        border: '0',
        '&:hover': {
          background: 'linear-gradient(318deg, rgba(158,235,235,1) 0%, rgba(90,186,186,1) 7%, rgba(55,195,194,1) 44%)',
          border: '0',
        },
        '&$disabled': {
          background: '#f5fafc',
          color: '#bdceda',
        },
      },
      outlined: {
        border: '1px solid rgba(105,143,212,0.2)',
        '&:hover': {
          background: '#ffffff',
          border: '1px solid rgba(105,143,212,0.5)',
        },
      },
      outlinedPrimary: {
        background: '#f9fafe',
        border: '0',
        boxShadow: 'inset 0px 0px 0px 2px #0d4bdc',
        color: '#1a1b1e',
        '&:hover': {
          background: '#f9fafe',
          border: '0',
          boxShadow: 'inset 0px 0px 0px 2px #0d4bdc',
          color: '#0d4bdc',
        },
      },
    },
    MuiDialog: {
      paper: {
        borderRadius: '10px',
        padding: '2vw',
        boxSizing: 'content-box',
      },
    },
    MuiDialogContent: {
      root: {
        padding: '0',
      },
    },
    MuiDialogTitle: {
      root: {
        padding: '0 !important',
        marginBottom: '1vw !important',
      },
    },
    MuiListItem: {
      button: {
        '&:hover': {
          backgroundColor: '#f5fafc',
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        '& $notchedOutline': {
          borderColor: 'rgba(105,143,212,0.2)',
        },
        '&:hover $notchedOutline': {
          borderColor: 'rgba(105,143,212,0.5)',
        },
        '&$disabled $notchedOutline': {
          borderColor: 'rgba(105,143,212,0.1)',
        },
      },
    },
    MuiSwitch: {
      track: {
        backgroundColor: '#3c586d',
      },
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: '"Red Hat Display", sans-serif',
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightBold: 600,
    fontWeightBlack: 900,
    h1: {
      fontFamily: '"Red Hat Display", sans-serif',
      fontWeight: 700,
      fontSize: '2.9rem',
      lineHeight: 1.4,
      letterSpacing: '0em',
      color: '#33D3D2',
    },
    h2: {
      fontFamily: '"Red Hat Display", sans-serif',
      fontWeight: 600,
      fontSize: '2.2rem',
      lineHeight: 1.5,
      letterSpacing: '0em',
      color: '#33D3D2',
    },
    h3: {
      fontFamily: '"Red Hat Display", sans-serif',
      fontWeight: 600,
      fontSize: '1.8rem',
      lineHeight: 1.3,
      letterSpacing: '0em',
      color: '#33D3D2',
    },
    h4: {
      fontFamily: '"Red Hat Display", sans-serif',
      fontWeight: 600,
      fontSize: '1.55rem',
      lineHeight: 1.32,
      letterSpacing: '0.00735em',
      color: '#33D3D2',
    },
    h5: {
      fontFamily: '"Red Hat Display", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.3,
      letterSpacing: '0em',
      color: '#33D3D2',
    },
    h6: {
      fontFamily: '"Red Hat Display", sans-serif',
      fontWeight: 600,
      fontSize: '1.1rem',
      lineHeight: 1.41,
      letterSpacing: '0.0075em',
      color: '#585a5d',
    },
    subtitle1: {
      fontFamily: '"Red Hat Text", sans-serif',
      fontWeight: 400,
      fontSize: '1.25rem',
      lineHeight: 1.25,
      letterSpacing: '0',
    },
    subtitle2: {
      fontFamily: '"Red Hat Text", sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.55,
      letterSpacing: '0',
    },
    body1: {
      fontFamily: '"Red Hat Text", sans-serif',
      fontWeight: 400,
      fontSize: '1.1rem',
      lineHeight: 1.54,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontFamily: '"Red Hat Text", sans-serif',
      fontWeight: 400,
      fontSize: '0.85rem',
      lineHeight: 1.42,
      letterSpacing: '0.01071em',
    },
    button: {
      fontFamily: '"Red Hat Text", sans-serif',
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.75,
      letterSpacing: '-0.02857em',
      textTransform: 'initial',
    },
    caption: {
      fontFamily: '"Red Hat Text", sans-serif',
      fontWeight: 400,
      fontSize: '0.7rem',
      lineHeight: 1.4,
      letterSpacing: '0',
    },
    overline: {
      fontFamily: '"Red Hat Text", sans-serif',
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
    },
  },
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(13, 75, 220, 0.05),0px 1px 1px 0px rgba(13, 75, 220, 0.05),0px 1px 3px 0px rgba(13, 75, 220, 0.05)',
    '0px 3px 1px -2px rgba(13, 75, 220, 0.05),0px 2px 2px 0px rgba(13, 75, 220, 0.05),0px 1px 5px 0px rgba(13, 75, 220, 0.05)',
    '0px 3px 3px -2px rgba(13, 75, 220, 0.05),0px 3px 4px 0px rgba(13, 75, 220, 0.05),0px 1px 8px 0px rgba(13, 75, 220, 0.05)',
    '0px 2px 4px -1px rgba(13, 75, 220, 0.05),0px 4px 5px 0px rgba(13, 75, 220, 0.05),0px 1px 10px 0px rgba(13, 75, 220, 0.05)',
    '0px 3px 5px -1px rgba(13, 75, 220, 0.05),0px 5px 8px 0px rgba(13, 75, 220, 0.05),0px 1px 14px 0px rgba(13, 75, 220, 0.05)',
    '0px 3px 5px -1px rgba(13, 75, 220, 0.05),0px 6px 10px 0px rgba(13, 75, 220, 0.05),0px 1px 18px 0px rgba(13, 75, 220, 0.05)',
    '0px 4px 5px -2px rgba(13, 75, 220, 0.05),0px 7px 10px 1px rgba(13, 75, 220, 0.05),0px 2px 16px 1px rgba(13, 75, 220, 0.05)',
    '0px 5px 5px -3px rgba(13, 75, 220, 0.05),0px 8px 10px 1px rgba(13, 75, 220, 0.05),0px 3px 14px 2px rgba(13, 75, 220, 0.05)',
    '0px 5px 6px -3px rgba(13, 75, 220, 0.05),0px 9px 12px 1px rgba(13, 75, 220, 0.05),0px 3px 16px 2px rgba(13, 75, 220, 0.05)',
    '0px 6px 6px -3px rgba(13, 75, 220, 0.05),0px 10px 14px 1px rgba(13, 75, 220, 0.05),0px 4px 18px 3px rgba(13, 75, 220, 0.05)',
    '0px 6px 7px -4px rgba(13, 75, 220, 0.05),0px 11px 15px 1px rgba(13, 75, 220, 0.05),0px 4px 20px 3px rgba(13, 75, 220, 0.05)',
    '0px 7px 8px -4px rgba(13, 75, 220, 0.05),0px 12px 17px 2px rgba(13, 75, 220, 0.05),0px 5px 22px 4px rgba(13, 75, 220, 0.05)',
    '0px 7px 8px -4px rgba(13, 75, 220, 0.05),0px 13px 19px 2px rgba(13, 75, 220, 0.05),0px 5px 24px 4px rgba(13, 75, 220, 0.05)',
    '0px 7px 9px -4px rgba(13, 75, 220, 0.05),0px 14px 21px 2px rgba(13, 75, 220, 0.05),0px 5px 26px 4px rgba(13, 75, 220, 0.05)',
    '0px 8px 9px -5px rgba(13, 75, 220, 0.05),0px 15px 22px 2px rgba(13, 75, 220, 0.05),0px 6px 28px 5px rgba(13, 75, 220, 0.05)',
    '0px 8px 10px -5px rgba(13, 75, 220, 0.05),0px 16px 24px 2px rgba(13, 75, 220, 0.05),0px 6px 30px 5px rgba(13, 75, 220, 0.05)',
    '0px 8px 11px -5px rgba(13, 75, 220, 0.05),0px 17px 26px 2px rgba(13, 75, 220, 0.05),0px 6px 32px 5px rgba(13, 75, 220, 0.05)',
    '0px 9px 11px -5px rgba(13, 75, 220, 0.05),0px 18px 28px 2px rgba(13, 75, 220, 0.05),0px 7px 34px 6px rgba(13, 75, 220, 0.05)',
    '0px 9px 12px -6px rgba(13, 75, 220, 0.05),0px 19px 29px 2px rgba(13, 75, 220, 0.05),0px 7px 36px 6px rgba(13, 75, 220, 0.05)',
    '0px 10px 13px -6px rgba(13, 75, 220, 0.05),0px 20px 31px 3px rgba(13, 75, 220, 0.05),0px 8px 38px 7px rgba(13, 75, 220, 0.05)',
    '0px 10px 13px -6px rgba(13, 75, 220, 0.05),0px 21px 33px 3px rgba(13, 75, 220, 0.05),0px 8px 40px 7px rgba(13, 75, 220, 0.05)',
    '0px 10px 14px -6px rgba(13, 75, 220, 0.05),0px 22px 35px 3px rgba(13, 75, 220, 0.05),0px 8px 42px 7px rgba(13, 75, 220, 0.05)',
    '0px 11px 14px -7px rgba(13, 75, 220, 0.05),0px 23px 36px 3px rgba(13, 75, 220, 0.05),0px 9px 44px 8px rgba(13, 75, 220, 0.05)',
    '0px 11px 15px -7px rgba(13, 75, 220, 0.05),0px 24px 38px 3px rgba(13, 75, 220, 0.05),0px 9px 46px 8px rgba(13, 75, 220, 0.05)',
  ],
});

export default theme;
