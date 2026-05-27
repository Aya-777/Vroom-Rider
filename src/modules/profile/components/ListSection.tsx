import React from 'react';
import ListItem from './ListItem';

type Props = {
  items: {
    id: string;
    title: string;
    icon: React.ElementType;
  }[];
};

export default function ListSection({ items }: Props) {
  return (
    <>
      {items.map(item => (
        <ListItem
          key={item.id}
          title={item.title}
          Icon={item.icon}
        />
      ))}
    </>
  );
}