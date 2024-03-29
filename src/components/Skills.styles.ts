import { createStyles, Theme, WithStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) => createStyles({
  skillsDescription: {
    '@media (max-width: 1280px)': {
      fontSize: '0.9rem',
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    fontSize: '1rem',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  skillsBody: {
    '@media (min-width: 960px)': {
      padding: theme.spacing(2),
    },
    '@media (max-width: 1280px)': {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    paddingBottom: theme.spacing(2)
  }
});

export type Styles = WithStyles<typeof styles>;
