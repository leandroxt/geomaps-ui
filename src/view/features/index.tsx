import React, { ReactElement } from 'react';
import Feature, { Props as Feat } from './feature';
import Geocoder from './geocoder';
import InteresArea from './interest-area';

const features: Feat[] = [
  { icon: 'place', title: 'Geocoder', component: Geocoder },
  { icon: 'add_location_alt', title: 'Criar área de interesse', component: InteresArea },
];

export interface FeatureComponentProps {
  onClose: () => void;
}

export default function Features(): ReactElement {
  return (
    <ul className="nav flex-column">
      {features.map(({ icon, title, component }) => (
        <Feature icon={icon} title={title} component={component} />
      ))}
    </ul>
  );
}
