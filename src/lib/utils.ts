import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const extractSlug = (s: string | string[] | undefined) => {
  console.log('extracting slug from ', s);
  if (!s) return '';
  if (typeof s === 'string') return s;
  return s.reduce((prev, current) => prev + current);
};

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const formatDate = (d: Date) => {
  const minutes = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes();

  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getHours()}:${minutes}`;
};

const getImage = (src: string | undefined) => {
  if (!src || src === '') {
    return 'https://static.ezrahuang.com/file/new-res-meal-review/Screenshot 2023-05-28 103355.png';
  } else {
    return src;
  }
};
export { extractSlug, formatDate, cn, getImage };
