interface PaginationProps {
  changePage: React.Dispatch<React.SetStateAction<number>>,
  countPage: number,
  currentPage: number
}

const Pagination: React.FC<PaginationProps> = ({ changePage, countPage, currentPage }) => {
  let pagiStatus: Array<number | string> = [];

  if (countPage <= 5) {
    for(let i: number = 1; i <= countPage; i++) {
      pagiStatus.push(i);
    }
  } else if (currentPage < 3) {
    pagiStatus = [1, 2, 3, '...', countPage];
  } else if (currentPage > countPage - 2) {
    pagiStatus = [1, '...', countPage - 2, countPage - 1, countPage];
  } else {
    pagiStatus = ['...', currentPage - 1, currentPage, currentPage + 1, '...'];
  }

  return (
    <div id='pagination'>
      <button
        className={currentPage === 1 ? 'disabled' : undefined}
        onClick={() => changePage(1)}
        disabled={currentPage === 1}
      >
        &#171;
      </button>

      <button
        className={currentPage === 1 ? 'disabled' : undefined}
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &#60;
      </button>

      {pagiStatus.map((e, index) => 
        {
          if (e === '...') {
            return (
              <button key={index} className='disabled'>...</button>
            );
          } 
          return (
            <button key={index} className={e === currentPage ? 'active' : undefined}
            onClick={() => changePage(Number(e))}>
              {e}
            </button>
          );
          
        }
      )}

      <button
        className={currentPage === countPage ? 'disabled' : undefined}
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === countPage}
      >
        &#62;
      </button>

      <button
        className={currentPage === countPage ? 'disabled' : undefined}
        onClick={() => changePage(countPage)}
        disabled={currentPage === countPage}
      >
        &#187;
      </button>
    </div>
  )
}

export default Pagination;