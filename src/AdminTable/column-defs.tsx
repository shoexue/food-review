'use client';

import { IItem } from '@/lib/types/Item';
import { ColumnDef } from '@tanstack/react-table';
import HeaderCell from './HeaderCell';
import DateCell from './DateCell';
import ReviewsCell from './ReviewsCell';
import { IReviewArray } from '@/lib/types/Review';
import TagsCell from './TagsCell';
import DiningHallCell from './DiningHallCell';
import VerifiedCell from './VerifiedCell';

export const columns: ColumnDef<IItem>[] = [
  {
    accessorKey: 'id',
    header: (col) => <HeaderCell col={col} title='Name' sortable={false} />,
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (r) => r.id,
    header: 'Verified',
    cell: (info) => <VerifiedCell id={info.getValue() as string} />,
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
    cell: (info) => <ReviewsCell arr={info.getValue() as IReviewArray} />,
  },
  {
    accessorKey: 'tags',
    header: (col) => <HeaderCell col={col} title='Tags' />,
    cell: (info) => <TagsCell tags={info.getValue() as string[]} />,
  },
  {
    accessorKey: 'diningHall',
    header: (col) => <HeaderCell col={col} title='Dining Hall' />,
    cell: (info) => <DiningHallCell diningHall={info.getValue() as string} />,
  },
  {
    accessorKey: 'createdAt',
    header: (col) => <HeaderCell col={col} title='Created' />,
    cell: (info) => <DateCell date={new Date(info.getValue() as string)} />,
  },
  {
    accessorKey: 'updatedAt',
    header: (col) => <HeaderCell col={col} title='Updated' />,
    cell: (info) => <DateCell date={new Date(info.getValue() as string)} />,
  },
];
