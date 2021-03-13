function Loader({ centered }) {
  return (
    <div
      className={centered && "flex-1 flex flex-col items-center justify-center"}
    >
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
