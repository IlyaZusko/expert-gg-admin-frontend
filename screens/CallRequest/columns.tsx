import { ColumnDef } from '@tanstack/react-table';
import { doc, updateDoc } from 'firebase/firestore';
import { Check } from 'lucide-react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/ui/button';
import { db } from '@/firebase/config';
// import { useAppDispatch } from '@/lib/store';
import { ICallRequest } from '@/lib/store/models/CallRequest';
import { markAsDoneCallRequest } from '@/lib/store/service/callRequestsSlice';
// import { ICallRequest } from '@/lib/store/models/CallRequest';
// import { markAsDoneCallRequest } from '@/lib/store/service/callRequestsSlice';

interface IMarkAsDoneButton {
  requestId: string;
  isDisable: boolean;
}

const MarkAsDoneButton = ({ requestId, isDisable }: IMarkAsDoneButton) => {
  const dispatch = useDispatch();

  const handleMarkAsDone = async () => {
    const requestRef = doc(db, 'callRequest', requestId);
    await updateDoc(requestRef, {
      isDone: true,
    });
    dispatch(markAsDoneCallRequest(requestId));
  };

  return (
    <Button
      variant="default"
      size="small"
      className="text-xs flex flex-row gap-x-1"
      onClick={() => handleMarkAsDone()}
      disabled={isDisable}
    >
      <Check width={16} height={16} color="#FFFFFF" />
      Обслужен
    </Button>
  );
};

export const callRequestsColumns: ColumnDef<ICallRequest>[] = [
  {
    accessorKey: 'isDone',
    header: 'Статус',
    cell: ({ row }) => <div>{row.getValue('isDone')}</div>,
  },
  {
    accessorKey: 'isAuthUser',
    header: 'Отправитель',
    cell: ({ row }) => <div>{row.getValue('isAuthUser')}</div>,
  },
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div>{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'dateOfRequest',
    header: 'Дата запроса',
    cell: ({ row }) => <div>{row.getValue('dateOfRequest')}</div>,
  },
  {
    accessorKey: 'userName',
    header: 'Имя пользователя',
    cell: ({ row }) => <div>{row.getValue('userName')}</div>,
  },
  {
    accessorKey: 'userPhone',
    header: 'Телефон пользователя',
    cell: ({ row }) => <div>{row.getValue('userPhone')}</div>,
  },
  {
    accessorKey: 'userQuestion',
    header: 'Вопрос',
    cell: ({ row }) => <div>{row.getValue('userQuestion')}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const callRequest = row.original;

      return (
        <MarkAsDoneButton
          requestId={callRequest.id}
          isDisable={callRequest.isDone}
        />
      );
    },
  },
];
