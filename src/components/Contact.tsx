import { faGithubSquare, faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import aboutData from '../data/aboutData.json';
import contactData from '../data/contactData.json';
import { RootStyles, rootStyles } from './ComponentsRoot.styles';
import { Styles, styles } from './Contact.styles';

interface Props {
  locale: string;
  updateVisibility(visible: boolean): void;
  updateCurrentContent(value: string): void;
}

class Contact extends React.Component<Props & RootStyles & Styles> {
  render = () => {
    const {
      classes,
      locale,
      updateCurrentContent,
      updateVisibility,
    } = this.props;

    const onChange = (isVisible: boolean) => {
      updateVisibility(isVisible)

      if (isVisible) {
        updateCurrentContent(contactData.id)
      }
    };

    const getData = (obj: any, key: string) => {
      return obj[key];
    }

    return (
      <VisibilitySensor onChange={onChange}>
        <div id={contactData.id} className={classes.contentContainer}>
          <Typography className={classes.contentTitle}>
            {getData(contactData, locale).title}
          </Typography>
          <Typography className={classes.contactDescription}>
            <FontAwesomeIcon className={classes.mailIcon} icon={faEnvelope} /> {getData(contactData, locale).mail}
          </Typography>
          <Grid item container className={classes.snsContainer}>
            <Grid item>
              <Link href={aboutData['en'].twitter} className={classes.snsLink}>
                <FontAwesomeIcon className={classes.snsIcon} icon={faTwitterSquare} />
              </Link>
            </Grid>
            <Grid item>
              <Link href={aboutData['en'].linkedin} className={classes.snsLink}>
                <FontAwesomeIcon className={classes.snsIcon} icon={faLinkedin} />
              </Link>
            </Grid>
            <Grid item>
              <Link href={aboutData['en'].github} className={classes.snsLink}>
                <FontAwesomeIcon className={classes.snsIcon} icon={faGithubSquare} />
              </Link>
            </Grid>
          </Grid>
        </div>
      </VisibilitySensor>
    );
  }
}

export default withStyles((theme) => ({
  ...rootStyles(theme),
  ...styles(theme),
  }),
  { withTheme: true },
)(Contact);
