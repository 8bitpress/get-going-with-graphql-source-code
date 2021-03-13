function PageNotice({ text }) {
  return (
    <div className="flex-auto flex flex-col h-full justify-center text-center">
      <p className="text-gray-500 text-2xl">{text}</p>
    </div>
  );
}

export default PageNotice;
