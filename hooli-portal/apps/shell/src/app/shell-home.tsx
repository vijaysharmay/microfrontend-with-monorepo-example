import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
});

export default function ShellHome() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>Welcome to the Microfrontend Demo</div>

      <div>
        <b>Use Case:</b> The Hooli corporation is a holding company for 3 major
        divisions - HR, Finance & Engineering, which run independently and want
        to autonomously build their own portals.
      </div>
      <div>
        The goal is to have these <b>remote</b> portals be <b>host</b>ed in a
        single container.
      </div>
      <div>
        What you are looking at is the shell home page. This is <b>NOT</b>{' '}
        rendered using dynamic import of a module using module federation.
      </div>
      <img src="/arch.png" alt="" width="100%" />
    </div>
  );
}
