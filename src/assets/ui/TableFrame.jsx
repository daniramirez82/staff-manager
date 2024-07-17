const TableFrame = ({ title, children }) => {
  return (
    <div className="bg-white rounded p-2 w-full h-3/4 shadow-sm">
      <div className="w-full flex items-center -mt-4 pl-3 rounded h-9 bg-blue-500 m-auto shadow-md shadow-blue-300 text-white">
        {title}
      </div>
      {children}
    </div>
  );
};

export default TableFrame;
