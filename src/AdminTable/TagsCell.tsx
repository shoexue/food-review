import { store } from '@/lib/types';

interface TagsCellProps {
  tags: string[];
}

const TagsCell: React.FC<TagsCellProps> = ({ tags }) => {
  // console.log(tags);
  return (
    <div>
      {tags.map((id) => {
        return (
          <div className='flex items-center font-mono' key={id}>
            <p key={id}>
              {id} ({store.tags.tags.get(id)?.value})
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TagsCell;
