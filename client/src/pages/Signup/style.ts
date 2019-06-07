import { createStyles, Theme } from '@material-ui/core/styles';
export const styles = (theme: Theme) =>
  createStyles({
    actions: theme.mixins.gutters({
      alignContent: 'center',
      display: 'flex',
      flexDirection: 'row',
      marginTop: theme.spacing.unit * 3,
      paddingBottom: 16,
      paddingTop: 16
    }),
    button: {
        marginRight: theme.spacing.unit
    },
    container: {
      display: 'flex',
      justifyContent: 'center'
    },
    paper: theme.mixins.gutters({
      alignContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing.unit * 12,
      paddingBottom: 20,
      paddingTop: 30,        
      width: '25%',
      [theme.breakpoints.down('md')]: {
          width: '100%'
      }      
    })
  });
