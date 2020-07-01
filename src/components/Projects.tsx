import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import projectsData from '../data/projectsData.json';
import { RootStyles, rootStyles } from './ComponentsRoot.styles';
import { Styles, styles } from './Projects.styles';
import { Event, Timeline } from './Timeline';

interface Props {
  locale: string;
  updateCurrentContent(value: string): void;
  updateVisibility(visible: boolean): void;
}

class Projects extends React.Component<Props & RootStyles & Styles> {
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
        updateCurrentContent(projectsData.id);
      }
    };

    const getData = (obj: any, key: string) => {
      return obj[key];
    }

    return (
      <VisibilitySensor onChange={onChange}>
        <div id={projectsData.id} className={classes.contentContainer}>
          <Grid container justify='center'>
            <Grid item sm={12} md={8}>
              <Typography className={classes.contentTitle}>
                {getData(projectsData, locale).title}
              </Typography>
              <Timeline>
                {getData(projectsData, locale).data.map((data: any, num: number) => (
                  <Event
                    name={data.name}
                    title={null}
                    description={data.description}
                    location={null}
                    startTime={data.startYear}
                    endTime={data.endYear}
                    key={num}
                  />
                ))}
              </Timeline>
            </Grid>
            {/* <Grid className={classes.sideImageContainer} item sm={12} md={4}>
              <img
                className={classes.sideImage}
                alt={getData(projectsData, locale).img.alt}
                src={require('../assets/education.png')}
              />
            </Grid> */}
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
)(Projects);
