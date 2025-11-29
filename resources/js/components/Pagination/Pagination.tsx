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

  // Encuentra la página activa
  const activeIndex = pageLinks.findIndex((link) => link.active);
  const totalPages = pageLinks.length;
  let visiblePages: PaginationLink[] = [];
  let showStartEllipsis = false;
  let showEndEllipsis = false;

  if (totalPages <= 3) {
    visiblePages = pageLinks;
  } else {
    // Si la página activa está cerca del inicio
    if (activeIndex <= 1) {
      visiblePages = pageLinks.slice(0, 3);
      showEndEllipsis = true;
    }
    // Si la página activa está cerca del final
    else if (activeIndex >= totalPages - 2) {
      visiblePages = pageLinks.slice(totalPages - 3, totalPages);
      showStartEllipsis = true;
    }
    // Si la página activa está en el medio
    else {
      visiblePages = pageLinks.slice(activeIndex - 1, activeIndex + 2);
      showStartEllipsis = true;
      showEndEllipsis = true;
    }
  }

  return (
    <nav aria-label="Navegación de páginas">
      <BootstrapPagination className="justify-content-center mb-0">
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
          <IconifyIcon icon="tabler:chevron-left" />
        </BootstrapPagination.Prev>

        {showStartEllipsis && (
          <>
            <BootstrapPagination.Item
              active={firstPage?.active}
              disabled={!firstPage?.url}
              as={firstPage?.url ? Link : 'span'}
              href={firstPage?.url || undefined}
            >
              <span dangerouslySetInnerHTML={{ __html: firstPage?.label || '' }} />
            </BootstrapPagination.Item>
            <BootstrapPagination.Ellipsis disabled />
          </>
        )}

        {visiblePages.map((link, index) => (
          <BootstrapPagination.Item
            key={index + (showStartEllipsis ? 1 : 0)}
            active={link.active}
            disabled={!link.url}
            as={link.url ? Link : 'span'}
            href={link.url || undefined}
          >
            <span dangerouslySetInnerHTML={{ __html: link.label }} />
          </BootstrapPagination.Item>
        ))}

        {/* Última página y puntos suspensivos al final */}
        {showEndEllipsis && (
          <>
            <BootstrapPagination.Ellipsis disabled />
            <BootstrapPagination.Item
              active={lastPage?.active}
              disabled={!lastPage?.url}
              as={lastPage?.url ? Link : 'span'}
              href={lastPage?.url || undefined}
            >
              <span dangerouslySetInnerHTML={{ __html: lastPage?.label || '' }} />
            </BootstrapPagination.Item>
          </>
        )}

        <BootstrapPagination.Next
          disabled={!nextLink.url}
          as={nextLink.url ? Link : 'span'}
          href={nextLink.url || undefined}
        >
          <IconifyIcon icon="tabler:chevron-right" />
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