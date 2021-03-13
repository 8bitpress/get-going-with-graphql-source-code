function BookGrid({ books }) {
  return (
    <ul className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {books.map(({ authors, cover, id, title }) => (
        <li
          className="bg-white cursor-pointer flex flex-col justify-end p-4 shadow-xl"
          key={id}
        >
          <div className="flex flex-1 items-center justify-center">
            {cover ? (
              <img src={cover} alt={`${title} cover`} />
            ) : (
              <div className="bg-gray-100 border border-solid border-gray-200 flex h-full justify-center items-center mt-4 py-4 px-2 w-full">
                <span className="italic text-center text-gray-600">
                  Cover image unavailable
                </span>
              </div>
            )}
          </div>
          <p className="font-bold leading-tight mt-4 mb-2 hover:text-red-500">
            {title}
          </p>
          <p className="leading-tight text-gray-600 text-sm">{`by ${authors
            .map(author => author.name)
            .join(", ")}`}</p>
        </li>
      ))}
    </ul>
  );
}

export default BookGrid;
