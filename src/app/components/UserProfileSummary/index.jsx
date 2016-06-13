import './styles.less';

import React from 'react';
import { models } from '@r/api-client';
import { Anchor } from '@r/platform/components';

import SnooIcon from 'app/components/SnooIcon';
import { formatNumber } from 'lib/formatNumber';
import { short, long } from 'lib/formatDifference';

const T = React.PropTypes;

export const UserProfileSummary = props => {
  const { user } = props;

  return (
    <div className='UserProfileSummary'>
      <UserProfileRow>
        <UserProfileBadge
          text={ formatNumber(user.linkKarma) }
          subtext='KARMA'
          half={ true }
        >
          <UserProfileBadgeIcon iconName='karma' color='orangered' />
        </UserProfileBadge>
        <UserProfileBadge
          text={ short(user.createdUTC) }
          subtext='REDDIT AGE'
          half={ true }
        >
          <UserProfileBadgeIcon iconName='cake' color='mint' />
        </UserProfileBadge>
      </UserProfileRow>
      <UserProfileRow>
        <GoldInfo { ...props } />
      </UserProfileRow>
    </div>
  );
};

UserProfileSummary.propTypes = {
  user: T.instanceOf(models.Account),
  isMyUser: T.bool,
};

const GoldInfo = props => {
  const { user, isMyUser } = props;

  if (isMyUser) {
    // goldExpiration is already a unixtime delta...
    return (
      <UserProfileBadge
        text={ long(user.goldExpiration) }
        subtext='of reddit gold remaining'
      >
        <GoldIcon />
      </UserProfileBadge>
    );
  }

  return (
    <Anchor href={ `/u/${user.name}/gild` }>
      <UserProfileBadge
        text={ `Give ${user.name} gold` }
        subext='show your appreciation'
      >
        <GoldIcon />
      </UserProfileBadge>
    </Anchor>
  );
};


const UserProfileRow = props => (
  <div className='UserProfileSummary__row'>
    { props.children }
  </div>
);

// these need to be `function` instead of `const`, because of
// hoisting and`babel-transform-react-constant-elements`
function UserProfileBadgeIcon(props) {
  const { iconName, color } = props;
  return (
    <span className={ `UserProfileSummary__badgeIcon icon icon-${iconName} ${color}` } />
  );
}

// TODO: replace this with the real monocole'd snoo icon
function GoldIcon() {
  return (
    <div className='UserProfileSummary__badgeIcon'>
      <SnooIcon color='gold' />
    </div>
  );
}

const UserProfileBadge = props => {
  const { text, subtext, half } = props;
  return (
    <div className={ `UserProfileSummary__badge ${half ? 'half' : ''}` }>
      { props.children }
      <div className='UserProfileSummary__text-wrapper'>
        <div className='UserProfileSummary__badge-text'>{ text }</div>
        <div className='UserProfileSummary__badge-subtext'>{ subtext }</div>
      </div>
    </div>
  );
};