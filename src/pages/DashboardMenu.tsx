const DashboardMenu = () => {
	const menuList = [
		{
			name: 'Ajouter une nouvelle situation',
			link: 'create-situation',
		},
		{
			name: 'Liste de toutes les situations',
			link: 'situations',
		},
		{
			name: 'Liste des Utilisateurs',
			link: 'users',
		},
	];

	return (
		<div className="dasboard-menu-container w-full h-[90vh]">
			<ul className="flex flex-col px-4 py-2 gap-[3em]">
				{menuList.map((menuItem, index) => {
					return (
						<li
							key={index}
							className="bg-white border-blue-600 rounded-lg text-center text-black hover:bg-blue-600"
						>
							<a
								href={menuItem.link}
								className="block px-6 py-3 text-black hover:text-white text-xl font-semibold"
							>
								{menuItem.name}
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default DashboardMenu;
