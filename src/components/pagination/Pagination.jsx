export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div
      className="
      flex
      items-center
      justify-between
      mt-5
      "
    >
      <button
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(
            currentPage - 1
          )
        }
      >
        Previous
      </button>

      <div className="flex gap-2">
        {[...Array(totalPages)].map(
          (_, index) => (
            <button
              key={index}
              onClick={() =>
                onPageChange(
                  index + 1
                )
              }
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      <button
        disabled={
          currentPage === totalPages
        }
        onClick={() =>
          onPageChange(
            currentPage + 1
          )
        }
      >
        Next
      </button>
    </div>
  );
}