import React, {useState} from 'react';

import EventEntry from 'sentry/components/events/eventEntry';
import TagsTable from 'sentry/components/tagsTable';
import {Event} from 'sentry/types/event';
import useOrganization from 'sentry/utils/useOrganization';
import {useRouteContext} from 'sentry/utils/useRouteContext';

import {TabBarId} from '../types';

import FocusButtons from './focusButtons';

type Props = {
  event: Event;
  eventWithSpans: Event | undefined;
};

function FocusArea(props: Props) {
  const [active, setActive] = useState<TabBarId>('performance');

  return (
    <React.Fragment>
      <FocusButtons active={active} setActive={setActive} />
      <ActiveTab active={active} {...props} />
    </React.Fragment>
  );
}

function ActiveTab({active, event, eventWithSpans}: Props & {active: TabBarId}) {
  const {routes, router} = useRouteContext();
  const organization = useOrganization();

  switch (active) {
    case 'console':
      return <div id="console">TODO: Add a console view</div>;
    case 'performance':
      return eventWithSpans ? (
        <div id="performance">
          <EventEntry
            key={`${eventWithSpans.id}`}
            projectSlug={getProjectSlug(eventWithSpans)}
            // group={group}
            organization={organization}
            event={eventWithSpans}
            entry={eventWithSpans.entries[0]}
            route={routes[routes.length - 1]}
            router={router}
          />
        </div>
      ) : null;
    case 'errors':
      return <div id="errors">TODO: Add an errors view</div>;
    case 'tags':
      return (
        <div id="tags">
          <TagsTable generateUrl={() => ''} event={event} query="" />
        </div>
      );
    default:
      return null;
  }
}

function getProjectSlug(event: Event) {
  return event.projectSlug || event['project.name']; // seems janky
}

export default FocusArea;
