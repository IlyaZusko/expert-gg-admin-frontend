/* eslint-disable indent */
import { ColumnDef } from '@tanstack/react-table';
import { ClipboardCopy, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { IBet } from '@/lib/store/models/Bet';

interface ICopyButton {
  title: string;
  copyValue: string;
}

const CopyButton = ({ title, copyValue }: ICopyButton) => {
  const { toast } = useToast();
  return (
    <DropdownMenuItem
      onClick={() => {
        navigator.clipboard.writeText(copyValue);
        toast({
          isSucces: true,
          title: 'Скопировано!',
        });
      }}
      className="flex flex-row gap-x-2 text-white cursor-pointer"
    >
      <ClipboardCopy width={20} height={20} color="#0166FE" />
      {title}
    </DropdownMenuItem>
  );
};

const getBetStatus = (betStatus: boolean | null) => {
  if (betStatus === true) {
    return (
      <div className="px-2 py-1 border rounded-[100px] border-[#FEA800] max-w-max">
        Выиграна
      </div>
    );
  } else if (betStatus === false) {
    return (
      <div className="px-2 py-1 border rounded-[100px] border-[#FE0000] max-w-max">
        Проиграна
      </div>
    );
  } else {
    return (
      <div className="px-2 py-1 border rounded-[100px] border-[#12CC46] max-w-max">
        Активна
      </div>
    );
  }
};

export const betsColumns: ColumnDef<IBet>[] = [
  {
    accessorKey: 'isBetWon',
    header: 'Статус',
    cell: ({ row }) => <div>{getBetStatus(row.getValue('isBetWon'))}</div>,
  },
  {
    accessorKey: 'document_id',
    header: 'ID ставки',
    cell: ({ row }) => <div>{row.getValue('document_id')}</div>,
  },
  {
    accessorKey: 'bet_target_name',
    header: 'Команда',
    cell: ({ row }) => <div>{row.getValue('bet_target_name')}</div>,
  },
  {
    accessorKey: 'match_id',
    header: 'ID матча',
    cell: ({ row }) => <div>{row.getValue('match_id')}</div>,
  },
  {
    accessorKey: 'coins_amount',
    header: 'Ставка',
    cell: ({ row }) => <div>{row.getValue('coins_amount')} GG</div>,
  },
  {
    accessorKey: 'date_of_bet',
    header: 'Дата',
    cell: ({ row }) => <div>{row.getValue('date_of_bet')}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const bet = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 border-2 border-custom-cover-hover hover:bg-custom-cover-hover rounded-[4px]"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="flex flex-col gap-y-1">
            <CopyButton
              title="Скопировать ID матча"
              copyValue={String(bet.match_id)}
            />
            <CopyButton
              title="Скопировать ID ставки"
              copyValue={String(bet.document_id)}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
