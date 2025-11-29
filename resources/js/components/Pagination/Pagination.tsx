import { Link } from '@inertiajs/react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationProps {
  links: PaginationLink[];
}

export default function Pagination({ links = [] }: PaginationProps) {
  if (!links || links.length === 3) return null;

  const prevLink = links[0];
  const nextLink = links[links.length - 1];
  const pageLinks = links.slice(1, -1);

  const firstPage = pageLinks.length > 0 ? pageLinks[0] : null;
  const lastPage = pageLinks.length > 0 ? pageLinks[pageLinks.length - 1] : null;

  return (
    <nav aria-label="Navegación de páginas">
      <BootstrapPagination className="justify-content-end mb-0">
        <BootstrapPagination.First
          disabled={!firstPage?.url || firstPage?.active}
          as={firstPage?.url && !firstPage?.active ? Link : 'span'}
          href={firstPage?.url || undefined}
        >
          <IconifyIcon icon="tabler:chevrons-left" />
        </BootstrapPagination.First>

        <BootstrapPagination.Prev
          disabled={!prevLink.url}
          as={prevLink.url ? Link : 'span'}
          href={prevLink.url || undefined}
        >
          Anterior
        </BootstrapPagination.Prev>

        {pageLinks.map((link, index) => (
          <BootstrapPagination.Item
            key={index}
            active={link.active}
            disabled={!link.url}
            as={link.url ? Link : 'span'}
            href={link.url || undefined}
          >
            <span dangerouslySetInnerHTML={{ __html: link.label }} />
          </BootstrapPagination.Item>
        ))}

        <BootstrapPagination.Next
          disabled={!nextLink.url}
          as={nextLink.url ? Link : 'span'}
          href={nextLink.url || undefined}
        >
          Siguiente
        </BootstrapPagination.Next>

        <BootstrapPagination.Last
          disabled={!lastPage?.url || lastPage?.active}
          as={lastPage?.url && !lastPage?.active ? Link : 'span'}
          href={lastPage?.url || undefined}
        >
          <IconifyIcon icon="tabler:chevrons-right" />
        </BootstrapPagination.Last>
      </BootstrapPagination>
    </nav>
  );
}