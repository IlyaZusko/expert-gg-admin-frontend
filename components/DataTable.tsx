/* eslint-disable indent */
'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import TextInput from './TextInput';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isForCallRequests?: boolean;
  searchColumn?: string;
  searchPlaceholder?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isForCallRequests,
  searchColumn,
  searchPlaceholder,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div>
        {searchColumn && (
          <TextInput
            placeholder={searchPlaceholder ? searchPlaceholder : ''}
            value={
              (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn(searchColumn)?.setFilterValue(event)
            }
            className="h-8 rounded-[4px] px-2 text-xs font-medium w-[200px] mb-4"
            label="Поиск"
          />
        )}
        {isForCallRequests && (
          <div className="flex flex-col">
            <p className="text-xs text-white pb-[2px]">Фильтр</p>
            <Select
              defaultValue="nofilter"
              onValueChange={(v) => {
                if (v === 'active') {
                  table.getColumn('isDone')?.setFilterValue(true);
                }
                if (v === 'unactive') {
                  table.getColumn('isDone')?.setFilterValue(false);
                }
                if (v === 'nofilter') {
                  table.getColumn('isDone')?.setFilterValue('');
                }
              }}
            >
              <SelectTrigger className="w-[200px] border border-gray-700 mb-4 text-xs">
                <SelectValue className="text-xs font-medium" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nofilter">Все статусы</SelectItem>
                <SelectItem value="active">Обслужен</SelectItem>
                <SelectItem value="unactive">Не обслужен</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <div className="rounded-[8px] border border-gray-800">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="rounded-t-[8px] text-xs bg-custom-cover border-gray-800"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="text-xs bg-custom-cover border-gray-800"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-2 py-2 truncate">
                      {isForCallRequests && cell.column.id === 'isAuthUser' ? (
                        cell.getValue() === true ? (
                          <div className=" max-w-max px-2 py-1 text-white font-medium rounded-[1000px] bg-green-500">
                            Авторизован
                          </div>
                        ) : (
                          <div className=" max-w-max px-2 py-1 text-white font-medium rounded-[1000px] bg-red-400">
                            Не авторизован
                          </div>
                        )
                      ) : null}

                      {isForCallRequests && cell.column.id === 'isDone' ? (
                        cell.getValue() === true ? (
                          <div className=" w-5 h-5 rounded-[1000px] bg-green-300" />
                        ) : (
                          <div className=" w-5 h-5 rounded-[1000px] bg-red-300" />
                        )
                      ) : null}

                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Нет результатов
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outlineBottom"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="text-xs rounded-[0px]"
          >
            Назад
          </Button>
          <Button
            variant="outlineBottom"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="text-xs rounded-[0px]"
          >
            Вперед
          </Button>
        </div>
      </div>
    </div>
  );
}
