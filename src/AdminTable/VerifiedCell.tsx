import { Checkbox } from '@/components/ui/checkbox';
import { store } from '@/lib/types';
import { CheckedState } from '@radix-ui/react-checkbox';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface VerifiedCellProps {
  id: string;
}

const isChecked = (checked: CheckedState) => {
  return checked === true;
};

const VerifiedCell: React.FC<VerifiedCellProps> = observer(({ id }) => {
  const searchParams = useSearchParams();

  const item = store.items.find((item) => item.id === id);

  const [loading, setLoading] = useState(false);

  const onCheckboxChange = (checked: CheckedState) => {
    const ch = isChecked(checked);

    if (!item) return;

    setLoading(true);
    fetch('/api/admin/verify-item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        password: searchParams.get('password') ?? '',
        verified: ch ? 'true' : 'false',
        id,
      }).toString(),
    })
      .then((res) => res.json())
      .then((data) => {
        item?.setVerified(ch);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Checkbox
      disabled={loading}
      checked={item?.verified ?? false}
      onCheckedChange={(e) => onCheckboxChange(e)}
    >
      {}
    </Checkbox>
  );
});

export default VerifiedCell;
