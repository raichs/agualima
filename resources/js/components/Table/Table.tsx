import { Link } from '@inertiajs/react';
import { Button } from 'react-bootstrap';
import get from 'lodash/get';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { confirmDelete } from '@/utils/sweetalert';

interface TableProps<T extends { id: number | string }> {
  columns: {
    name: string;
    label: string;
    colSpan?: number;
    renderCell?: (row: T) => React.ReactNode;
  }[];
  rows: T[];
  showActions?: boolean;
  showRoute?: string;
  editRoute?: string;
  deleteRoute?: string;
  deleteOptions?: {
    title?: string;
    text?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    successTitle?: string;
    successText?: string;
  };
  emptyMessage?: string;
}

export default function Table<T extends { id: number | string }>({
  columns = [],
  rows = [],
  showActions = true,
  showRoute,
  editRoute,
  deleteRoute,
  deleteOptions = {},
  emptyMessage = 'No hay registros disponibles'
}: TableProps<T>) {
  const handleDelete = async (id: number | string) => {
    if (deleteRoute) {
      await confirmDelete(route(deleteRoute, id), deleteOptions);
    }
  };
  return (
    <div className="table-responsive">
      <table className="table table-nowrap mb-0">
        <thead className="bg-light-subtle">
          <tr>
            <th className="ps-3">ID</th>
            {columns?.map(column => (
              <th key={column.name}>{column.label}</th>
            ))}
            {showActions && (
              <th className="text-center" style={{ width: 120 }}>
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows?.length === 0 ? (
            <tr>
              <td
                className="text-center py-4"
                colSpan={columns.length + (showActions ? 2 : 1)}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows?.map((row) => (
              <tr key={row.id}>
                <td className="ps-3">{row.id}</td>
                {columns.map(column => (
                  <td key={column.name}>
                    {column.renderCell
                      ? column.renderCell(row)
                      : get(row, column.name) ?? 'N/A'}
                  </td>
                ))}
                {showActions && (
                  <td className="pe-3">
                    <div className="hstack gap-1 justify-content-end">
                      {showRoute && (
                        <Link href={route(showRoute, row.id)}>
                          <Button
                            variant="soft-primary"
                            size="sm"
                            className="btn-icon rounded-circle"
                          >
                            <IconifyIcon icon="tabler:eye" />
                          </Button>
                        </Link>
                      )}
                      {editRoute && (
                        <Link href={route(editRoute, row.id)}>
                          <Button
                            variant="soft-success"
                            size="sm"
                            className="btn-icon rounded-circle"
                          >
                            <IconifyIcon icon="tabler:edit" className="fs-16" />
                          </Button>
                        </Link>
                      )}
                      {deleteRoute && (
                        <Button
                          variant="soft-danger"
                          size="sm"
                          className="btn-icon rounded-circle"
                          onClick={() => handleDelete(row.id)}
                        >
                          <IconifyIcon icon="tabler:trash" />
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}