const RemoveNodeButton = ({ selected = false, removeNode }: any) => {
  return(
    selected &&
    <div
      onClick={() => console.log('click')}
      className="
        absolute top-[-10px] right-[-10px] w-6 h-6 bg-red-500 rounded-full border-2
        border-white flex justify-center items-center text-white font-bold cursor-pointer
      "
    >X</div>
  )
};

export default RemoveNodeButton;