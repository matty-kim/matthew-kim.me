import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import * as React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import skillsData from '../data/skillsData.json';
import { RootStyles, rootStyles } from './ComponentsRoot.styles';
import { Styles, styles } from './Skills.styles';

interface Props {
  locale: string;
  updateVisibility(visible: boolean): void;
  updateCurrentContent(value: string): void;
}

class Research extends React.Component<Props & RootStyles & Styles> {
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
        updateCurrentContent(skillsData.id);
      }
    };

    const boldText = (num: number, str: string, isBold: boolean, isLast: boolean) => {
      let comma = isLast ? '' : ', ';
      if (isBold) {
        return (<span  key={num}><b>{str}</b>{comma}</span>);
      } else {
        return (<span  key={num}>{str}{comma}</span>);
      }
    };

    const skillsList = (dict: any) => {
      if (dict.publications.items === undefined) {
        return (
          <Typography className={classes.skillsDescription}>Work in Progress...</Typography>
        );
      } else {
        return (
          <div className={classes.skillsDescription}>
            {dict.skills.items.map((data: any, num: number) => (
              <div key={num} className={classes.skillsBody}>
                <Typography>
                  {data.url ? (
                    <Link className={classes.link} href={data.url} target="_blank" rel="noopener">
                      {data.title}
                    </Link>
                  ) : data.title}
                </Typography>
                <Typography>
                {data.list.map((item: any, itemNum: number) => {
                  let isLast = false;
                  if (itemNum === (data.list.length - 1)) {
                    isLast = true;
                  }
                  return boldText(itemNum, item.name, item.isMe, isLast)
                })}
                </Typography>
                <Typography>{data.conference}</Typography>
              </div>
            ))}
          </div>
        );
      }
    };

    const getData = (obj: any, key: string) => {
      return obj[key];
    };

    return (
      <div id={skillsData.id} className={classes.contentContainer}>
        <Typography className={classes.contentTitle}>
          {getData(skillsData, locale).title}
        </Typography>
        { getData(skillsData, locale).skills && (
        <VisibilitySensor onChange={onChange}>
          <div>
            <Typography className={classes.contentSubTitle}>
              {getData(skillsData, locale).skills.title}
            </Typography>
            {skillsList(getData(skillsData, locale))}
          </div>
        </VisibilitySensor>
        )}
        { getData(skillsData, locale).interests && (
          <VisibilitySensor onChange={onChange}>
            <div>
              <Typography className={classes.contentSubTitle}>
                {getData(skillsData, locale).interests.title}
              </Typography>
              <Typography className={classes.skillsDescription}>
                {getData(skillsData, locale).interests.description}
              </Typography>
            </div>
          </VisibilitySensor>
        )}
      </div>
    );
  }
}

export default withStyles((theme) => ({
  ...rootStyles(theme),
  ...styles(theme),
  }),
  { withTheme: true },
)(Research);
