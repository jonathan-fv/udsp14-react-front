import API from '../../services/API';
import React, { useEffect, useState } from 'react';
import passwordValidation from '../../services/passwordValidation';
import { UserType } from '../../types/UserType';

export type UserFormProps = {
	type: 'add' | 'edit';
	title: string;
	buttonText: string;
	selectedUser?: UserType | undefined | null;
	setSelectedUser?: React.Dispatch<
		React.SetStateAction<UserType | undefined | null>
	>;
};

const UserForm = ({
	type,
	title,
	buttonText,
	selectedUser,
	setSelectedUser,
}: UserFormProps) => {
	const [validPassword, setValidPassword] = useState<boolean>(false);
	const [password, setPassword] = useState<string>('');

	useEffect(() => {
		setValidPassword(passwordValidation(password));
	}, [password]);

	const submitUser = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const data = Object.fromEntries(new FormData(form));

		if (validPassword) {
			if (type === 'add') {
				API.post('auth/register', data)
					.then(() => window.location.reload())
					.catch((e) => console.error(e));
			} else if (type === 'edit') {
				API.put(`auth/user/${data._id}`, data)
					.then(() => window.location.reload())
					.catch((e) => console.error(e));
			} else {
				console.error('Invalid type form');
			}
		} else {
			console.error('Invalid password');
		}
	};

	const cancelEdit = () => {
		if (setSelectedUser) {
			setSelectedUser(null);
		}
		const form = document.getElementById(`edit-user-form`) as HTMLFormElement;
		const data = Object.fromEntries(new FormData(form));
		Object.keys(data).forEach((key) => {
			form[key].value = '';
		});
	};

	return (
		<div className="md:col-span-1 col-span-3 bg-white rounded-lg flex flex-col">
			<h2 className="col-span-12 text-center mt-3 border-b-2 pb-3 border-[#051949]">
				{title}
			</h2>
			<form
				className="flex flex-col gap-3 col-span-12 px-2 py-3 bg-white rounded-b-lg"
				id={`${type}-user-form`}
				onSubmit={submitUser}
			>
				{type === 'edit' && (
					<input
						type="hidden"
						id={`${type}-id`}
						name="_id"
						defaultValue={selectedUser?.userid}
					/>
				)}
				<div className="flex flex-col">
					<label htmlFor="username">Identifiant</label>
					<input
						type="email"
						id={`${type}-username`}
						name="username"
						defaultValue={type === 'edit' ? selectedUser?.username : ''}
						className="border border-[#051949] rounded"
					/>
				</div>
				<div className="flex flex-col">
					<label htmlFor="password">
						Mot de passe
						{!validPassword && (
							<>
								<br />
								<span className="text-xs text-red-500">
									(8 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre)
								</span>
							</>
						)}
					</label>
					<input
						type="password"
						id={`${type}-password`}
						name="password"
						defaultValue={''}
						onChange={(e) => setPassword(e.target.value)}
						className={
							validPassword
								? 'border border-green-500 rounded'
								: 'border-2 border-red-500 rounded'
						}
					/>
				</div>
				{type === 'add' && (
					<button
						className="col-span-12 px-2 py-1 bg-[#051949] text-white rounded hover:bg-white hover:text-[#051949] hover:outline hover:outline-[#051949]"
						type={'submit'}
					>
						<span>{buttonText}</span>
					</button>
				)}
				{type === 'edit' && (
					<button
						className={`col-span-12 px-2 py-1 bg-[#051949] text-white rounded hover:bg-white hover:text-[#051949] hover:outline hover:outline-[#051949]
						${!selectedUser ? 'opacity-50 cursor-not-allowed' : ''}`}
						type={'submit'}
						disabled={!selectedUser}
					>
						<span>
							{selectedUser ? buttonText : 'Selectionnez un utilisateur'}
						</span>
					</button>
				)}
				{type === 'edit' && selectedUser && (
					<button
						className="col-span-12 px-2 py-1 bg-red-500 text-white rounded hover:bg-white hover:text-red-500 hover:outline hover:outline-red-500"
						onClick={cancelEdit}
						type={'button'}
					>
						<span>Annuler</span>
					</button>
				)}
			</form>
		</div>
	);
};

export default UserForm;
