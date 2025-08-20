import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  page: number;
  setPage: (value: React.SetStateAction<number>) => void;
  totalPages: number;
}

export default function PaginationComponent({ page, setPage, totalPages }: PaginationProps) {
  const maxPageButtons = 10;

  const start = Math.floor(page / maxPageButtons) * maxPageButtons;
  const end = Math.min(start + maxPageButtons, totalPages);

  const pageNumbers = Array.from({ length: end - start }, (_, i) => start + i);

  return (
    <Pagination>
      <PaginationContent>
        {/* 이전 페이지 버튼 */}
        {page > 0 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={e => {
                e.preventDefault();
                if (page > 0) {
                  setPage(page - 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            />
          </PaginationItem>
        )}

        {/* 가장 처음 페이지 */}
        {page > 0 && (
          <PaginationLink
            href="#"
            onClick={e => {
              e.preventDefault();
              setPage(0);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {"<<"} {/* 또는 First */}
          </PaginationLink>
        )}

        {/* 페이지 번호 버튼 */}
        {pageNumbers.map(i => (
          <PaginationLink
            key={i}
            href="#"
            isActive={page === i}
            onClick={e => {
              e.preventDefault();
              setPage(i);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {i + 1}
          </PaginationLink>
        ))}

        {/* 가장 마지막 페이지 */}
        {page < totalPages - 1 && (
          <PaginationLink
            href="#"
            onClick={e => {
              e.preventDefault();
              setPage(totalPages - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {">>"} {/* 또는 Last */}
          </PaginationLink>
        )}

        {/* 다음 페이지 버튼 */}
        {page < totalPages - 1 && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={e => {
                e.preventDefault();
                if (page < totalPages - 1) {
                  setPage(page + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
