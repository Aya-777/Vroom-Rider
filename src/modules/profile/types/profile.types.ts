import { ElementType } from 'react';

export type ProfileGridItem = {
  id: string;
  title: string;
  icon: ElementType;
  onPress?: () => void;
};

export type ProfileListItem = {
  id: string;
  title: string;
  icon: ElementType;
  onPress?: () => void;
};

export type UserProfile = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  accountStatus: string;
  profileImage: string | null;
  ratingAvg: number;
  isActive: boolean;
};

export type UpdateProfileImageInput = {
  uri: string;
  fileName?: string;
  type?: string;
};

export type UpdateProfileInput = {
  firstName: string;
  lastName: string;
  profileImage?: UpdateProfileImageInput | null;
};