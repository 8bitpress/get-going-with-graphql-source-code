import NavBar from "../NavBar";

function MainLayout({ children }) {
  return (
    <div className="bg-gray-50">
      <div className="flex flex-col justify-between min-h-screen">
        <NavBar />
        <div className="flex-auto flex flex-col max-w-screen-lg mx-auto px-8 py-6 w-full">
          {children}
        </div>
        <footer className="bg-white border-t border-gray-200 border-solid py-4">
          <div className="">
            <p className="text-center text-gray-700 text-sm sm:text-base">
              “A word after a word after a word is power.”{" "}
              <span className="whitespace-no-wrap">– Margaret Atwood</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default MainLayout;
