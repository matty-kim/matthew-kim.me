import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import educationData from '../data/educationData.json';
import { RootStyles, rootStyles } from './ComponentsRoot.styles';
import { Styles, styles } from './Education.styles';
import { Event, Timeline } from './Timeline';

interface Props {
  locale: string;
  updateCurrentContent(value: string): void;
  updateVisibility(visible: boolean): void;
}

class Education extends React.Component<Props & RootStyles & Styles> {
  render = () => {
    const {
      classes,
      locale,
      updateCurrentContent,
      updateVisibility,
    } = this.props;

    const onChange = (isVisible: boolean) => {
      updateVisibility(isVisible);

      if (isVisible) {
        updateCurrentContent(educationData.id);
      }
    };

    const getData = (obj: any, key: string) => {
      return obj[key];
    }

    return (
      <VisibilitySensor onChange={onChange}>
        <div id={educationData.id} className={classes.contentContainer}>
          <Grid container justify='center'>
            <Grid item sm={12} md={8}>
              <Typography className={classes.contentTitle}>
                {getData(educationData, locale).title}
              </Typography>
              <Timeline>
                {getData(educationData, locale).data.map((data: any, num: number) => (
                  <Event
                    name={data.name}
                    title={null}
                    description={data.description}
                    location={data.location}
                    startTime={data.startYear}
                    endTime={data.endYear}
                    key={num}
                  />
                ))}
              </Timeline>
            </Grid>
            <Grid className={classes.sideImageContainer} item sm={12} md={4}>
              <img
                className={classes.sideImage}
                alt={getData(educationData, locale).img.alt}
                src={require('../assets/blank.png')}
              />
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
)(Education);
