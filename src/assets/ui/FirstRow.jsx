const FirstRow = ({table}) => {
  return (
    <div className="w-full flex gap-2 py-2 border-t-2 border-stone-200">
      {/* avatar */}
      <div className="w-1/12 flex justify-start pl-3 items-center text-stone-400 tracking-tight text-xs uppercase font-extrabold">{table}</div>
      <div className="w-9/12 flex-col pl-2">
        <div className="text-stone-400 tracking-tight text-xs uppercase font-extrabold"></div>
      </div>
      {/* status */}
      <div className="w-1/12 flex justify-center items-center ">
        <div className="text-stone-400 tracking-tight text-xs uppercase font-extrabold">Activo</div>
      </div>
      <div className="w-1/12 flex justify-center cursor-pointer items-center ">
        <div className="text-stone-400 tracking-tight text-xs uppercase font-extrabold">Borrar</div>
      </div>
    </div>
  );
};

export default FirstRow
