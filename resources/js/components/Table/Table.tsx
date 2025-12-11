import { Link } from '@inertiajs/react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
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
  customActions?: (row: T) => React.ReactNode;
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
  customActions,
  deleteOptions = {},
  emptyMessage = 'No hay registros disponibles'
}: TableProps<T>) {
  // Check if rows have is_active property
  const hasStatusColumn = rows.length > 0 && 'is_active' in rows[0];
  
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
            {hasStatusColumn && (
              <th className="text-center" style={{ width: 100 }}>
                Estado
              </th>
            )}
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
                colSpan={columns.length + (showActions ? 1 : 0) + (hasStatusColumn ? 1 : 0) + 1}
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
                      : get(row, column.name) ?? '-'}
                  </td>
                ))}
                {hasStatusColumn && (
                  <td className="text-center">
                    <span className={`badge bg-${(row as any).is_active ? 'success' : 'danger'} p-1 fs-11`}>
                      {(row as any).is_active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                )}
                {showActions && (
                  <td className="pe-3">
                    <div className="hstack gap-1 justify-content-end">
                      {showRoute && (
                        <OverlayTrigger overlay={<Tooltip>Ver</Tooltip>}>
                          <Link href={route(showRoute, row.id)}>
                            <Button
                              variant="soft-primary"
                              size="sm"
                              className="btn-icon rounded-circle"
                            >
                              <IconifyIcon icon="tabler:eye" />
                            </Button>
                          </Link>
                        </OverlayTrigger>
                      )}
                      {editRoute && (
                        <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
                          <Link href={route(editRoute, row.id)}>
                            <Button
                              variant="soft-success"
                              size="sm"
                              className="btn-icon rounded-circle"
                            >
                              <IconifyIcon icon="tabler:edit" className="fs-16" />
                            </Button>
                          </Link>
                        </OverlayTrigger>
                      )}
                      {deleteRoute && (
                        <OverlayTrigger overlay={<Tooltip>Eliminar</Tooltip>}>
                          <Button
                            variant="soft-danger"
                            size="sm"
                            className="btn-icon rounded-circle"
                            onClick={() => handleDelete(row.id)}
                          >
                            <IconifyIcon icon="tabler:trash" />
                          </Button>
                        </OverlayTrigger>
                      )}
                      {customActions && customActions(row)}
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