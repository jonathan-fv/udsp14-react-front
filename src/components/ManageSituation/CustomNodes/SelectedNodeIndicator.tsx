const SelectedNodeIndicator = ({ selected = false, removeNode }: any) => {
	return (
		selected && (
			<div
				className="
        absolute top-[-10px] right-[-10px] w-6 h-6 bg-blue-500 rounded-full border-2
        border-white flex justify-center items-center text-white font-bold cursor-pointer
      "
			>
				O
			</div>
		)
	);
};

export default SelectedNodeIndicator;
