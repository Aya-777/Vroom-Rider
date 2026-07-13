import {ComponentType} from 'react';
import {SvgProps} from 'react-native-svg';

export type SidebarItem = {
  id: string;
  label: string;
  icon: ComponentType<SvgProps>;
  route?: string;
};