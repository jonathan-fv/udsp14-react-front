import UserForm, { UserFormProps } from '../components/userForm/UserForm';
import { useEffect, useState } from 'react';
import API from '../services/API';
import { UserType } from '../types/UserType';

const User = () => {
	const [selectedUser, setSelectedUser] = useState<UserType | undefined | null>(
		null
	);
	const [users, setUsers] = useState<UserType[] | undefined>(undefined);

	useEffect(() => {
		API.get('auth/GetAllUsers')
			.then((r) => {
				setUsers(r.data);
			})
			.catch((e) => console.error(e));
	}, []);

	const addUserProps: UserFormProps = {
		type: 'add',
		title: 'Ajouter un utilisateur',
		buttonText: 'Ajouter',
	};

	const editUserProps: UserFormProps = {
		type: 'edit',
		title: 'Modifier un utilisateur',
		buttonText: 'Modifier',
		selectedUser: selectedUser,
		setSelectedUser: setSelectedUser,
	};

	const onDeleteUser = (user: UserType) => {
		API.delete(`auth/DeleteAndLogoutUserById/${user.userid}`)
			.then(() => {
				window.location.reload();
			})
			.catch((e) => console.error(e));
	};

	return (
		<div className="flex flex-col h-[90vh]">
			<h1 className="text-3xl font-semibold text-white text-center my-5">
				Panel de gestion des utilisateurs
			</h1>
			<div className="grid grid-cols-3 px-2 gap-10 md:px-5 md:gap-5">
				<div className="md:col-span-2 col-span-3 bg-white rounded-lg">
					<h2 className="col-span-12 text-center my-3 border-b-2 pb-3 border-[#051949] text-xl">
						Liste des utilisateurs
					</h2>
					<div className="px-2 py-3 h-[70vh] overflow-y-scroll">
						<table className="table-auto w-full">
							<thead>
								<tr>
									<th className="px-4 py-2">Identifiant</th>
									<th className="px-4 py-2 w-72">Actions</th>
								</tr>
							</thead>
							<tbody>
								{users?.length ? (
									users.map((user: UserType) => (
										<tr key={user.userid} className="h-[60px]">
											<td className="border-2 border-[#051949] px-4 py-2">
												{user.username}
											</td>
											<td className="border-2 border-[#051949] py-2 text-center">
												<button
													className="bg-[#051949] hover:bg-white text-white hover:text-[#051949] text-sm font-bold mx-2 py-2 px-4 rounded hover:outline hover:outline-[#051949]"
													onClick={() => setSelectedUser(user)}
												>
													Éditer
												</button>
												<button
													className={
														user.role === 1
															? 'bg-gray-400 text-white text-sm font-bold mx-2 py-2 px-4 rounded cursor-not-allowed'
															: 'bg-red-600 hover:bg-red-700 text-white text-sm font-bold mx-2 py-2 px-4 rounded'
													}
													onClick={() => onDeleteUser(user)}
													disabled={user.role === 1}
												>
													Supprimer
												</button>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											className="border border-[#051949] px-4 py-2 text-center"
											colSpan={2}
										>
											Aucun utilisateur
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
				<div className="md:col-span-1 col-span-3 rounded-lg flex flex-col gap-5">
					<UserForm {...addUserProps} /> {/* add user form */}
					<UserForm {...editUserProps} /> {/* edit user form */}
				</div>
			</div>
		</div>
	);
};

export default User;
