import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export interface Props {
  children: React.ReactNode;
}

export interface LinkInterface {
  path: string;
  content: string;
  icon: IconDefinition;
}
