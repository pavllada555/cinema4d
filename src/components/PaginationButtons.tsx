import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface PaginationButtonsProps {
  totalPages: number;
  currentPage: number;
  genre: string;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({ totalPages, currentPage, genre='' }) => {
  const [visiblePages, setVisiblePages] = useState<Array<number | string>>([]);

  useEffect(() => {
    const calculateVisiblePages = () => {
      if (totalPages <= 5) {
        // Если всего 5 страниц или меньше, отображаем все страницы
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      // Иначе вычисляем, какие страницы отображать в зависимости от текущей страницы
      const visible: Array<number | string> = [1];

      if (currentPage <= 3) {
        // Если на первых трех страницах, отображаем следующие 5 страниц
        visible.push(...Array.from({ length: 4 }, (_, i) => i + 2));
        visible.push('...');
        visible.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Если на последних трех страницах, отображаем предыдущие 5 страниц
        visible.push('...');
        const startPage = Math.max(totalPages - 4, 1); // Изменено вот здесь
        visible.push(...Array.from({ length: 5 }, (_, i) => startPage + i)); // Изменено вот здесь
      } else {
        // Иначе отображаем текущую страницу и две страницы в обе стороны
        visible.push('...');
        visible.push(currentPage - 1, currentPage, currentPage + 1);
        visible.push('...');
        visible.push(totalPages);
      }

      return visible;
    };

    setVisiblePages(calculateVisiblePages());
  }, [totalPages, currentPage]);

  return (
    <div className="flex mt-4 items-center">
      {visiblePages.map((page, index) => (
        <Link key={index} href={`/${genre}?page=${page}`} passHref
            className={`mx-2 px-3 py-1 rounded  ${
              typeof page === 'string' ? 'text-gray-500 cursor-not-allowed' : page === currentPage ? 'bg-gray-500 text-white' : 'bg-gray-300'
            }`}>
            {page}
        </Link>
      ))}
    </div>
  );
};

export default PaginationButtons;
