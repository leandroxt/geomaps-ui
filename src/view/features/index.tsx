import React, { ReactElement } from 'react';
import Feature, { Props as Feat } from './feature';
import Geocoder from './geocoder';

const features: Feat[] = [
  { icon: 'place', title: 'Geocoder', component: Geocoder },
];

export interface FeatureComponentProps {
  onClose: () => void;
}

export default function Features(): ReactElement {
  return (
    <ul className="nav flex-column">
      {features.map(({ icon, title, component }) => (
        <Feature key={icon} icon={icon} title={title} component={component} />
      ))}
    </ul>
  );
}
