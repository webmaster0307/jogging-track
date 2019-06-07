
import { createStyles, Theme } from '@material-ui/core/styles';
export const styles = ({ breakpoints, colors, transparentBackground, palette, mixins }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '10px'
    }
  });
