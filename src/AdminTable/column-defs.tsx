'use client';

import { IItem } from '@/lib/types/Item';
import { ColumnDef } from '@tanstack/react-table';
import HeaderCell from './HeaderCell';

export const columns: ColumnDef<IItem>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'name',
    header: (col) => <HeaderCell col={col} title='Name' />,
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'slug',
    header: (col) => <HeaderCell col={col} title='Slug' />,
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'rating',
    header: (col) => <HeaderCell col={col} title='Rating' />,
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'imageUrl',
    header: (col) => <HeaderCell col={col} title='Image URL' />,
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'reviews',
    header: (col) => <HeaderCell col={col} title='Total reviews' />,
    cell: (info) => 'TODO REVIEW CELL',
  },
  {
    accessorKey: 'tags',
    header: (col) => <HeaderCell col={col} title='Tags' />,
    cell: (info) => 'TODO TAGS CELL',
  },
  {
    accessorKey: 'diningHall',
    header: (col) => <HeaderCell col={col} title='Dining Hall' />,
    cell: (info) => 'TODO DINING HALL CELL',
  },
  {
    accessorKey: 'createdAt',
    header: (col) => <HeaderCell col={col} title='Created' />,
    cell: (info) => 'TODO DATE CELL',
  },
  {
    accessorKey: 'updatedAt',
    header: (col) => <HeaderCell col={col} title='Updated' />,
    cell: (info) => 'TODO DATE CELL',
  },
];
