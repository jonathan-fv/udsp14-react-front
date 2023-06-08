import UserForm, {UserFormProps} from "../components/userForm/UserForm";
import {useEffect, useState} from "react";
import API from "../services/API";

export type UserType = {
  userid?: string;
  username: string;
  role: number;
}

const User = () => {
  const [selectedUser, setSelectedUser] = useState<UserType | undefined | null>(null);
  const [users, setUsers] = useState<UserType[] | undefined>(undefined);

  useEffect(() => {
    API.get('auth/GetAllUsers')
      .then(r => {
        setUsers(r.data);
      })
      .catch(e => console.error(e));
  }, []);

  const addUserProps: UserFormProps = {
    type: 'add',
    title: 'Ajouter un utilisateur',
    buttonText: 'Ajouter',
  }

  const editUserProps: UserFormProps = {
    type: 'edit',
    title: 'Modifier un utilisateur',
    buttonText: 'Modifier',
    selectedUser: selectedUser,
    setSelectedUser: setSelectedUser,
  }

  const onDeleteUser = (user: UserType) => {
    API.delete(`users/${user.userid}`).then(r => console.log(r));
  }

  return (
    <div className='flex flex-col h-screen'>
      <h1 className='text-3xl font-semibold text-center my-5'>
        Panel de gestion des utilisateurs
      </h1>
      <button onClick={
        ()=>{ API.post('auth/login', {username: 'admin@admind.com', password: 'Admin123'}).then(r => console.log(r)).catch(e => console.error(e))}}
      > Login </button>
      <div className='grid grid-cols-3 px-2 gap-10 md:px-5 md:gap-5'>
        <div className='md:col-span-2 col-span-3 bg-amber-100 rounded-lg'>
          <h2 className='col-span-12 text-center my-3'>Liste des utilisateurs</h2>
          <div className='flex flex-wrap gap-3 col-span-12 px-2 py-3 bg-amber-200'>
            <table className='table-auto w-full'>
              <thead>
                <tr>
                  <th className='px-4 py-2'>Identifiant</th>
                  <th className='px-4 py-2'>Rôle</th>
                  <th className='px-4 py-2'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.length ? users.map((user: UserType) => (
                  <tr key={user.userid}>
                    <td className='bg-amber-100 border border-yellow-800 px-4 py-2'>{user.username}</td>
                    <td className='bg-amber-100 border border-yellow-800 px-4 py-2'>{user.role === 1 ? 'Administrateur' : 'Éditeur'}</td>
                    <td className='bg-amber-100 border border-yellow-800 py-2 text-center grid gap-1'>
                      <button
                        className='bg-lime-600 hover:bg-green-700 text-white text-sm font-bold mx-2 py-2 px-4 rounded'
                        onClick={() => setSelectedUser(user)}
                      >
                        Éditer
                      </button>
                      <button
                        className='bg-red-600 hover:bg-red-700 text-white text-sm font-bold mx-2 py-2 px-4 rounded'
                        onClick={() => onDeleteUser(user)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                )) : null}
              </tbody>
            </table>
          </div>
        </div>
        <div className='md:col-span-1 col-span-3 rounded-lg flex flex-col gap-5'>
          <UserForm {...addUserProps} /> {/* add user form */}
          <UserForm {...editUserProps} /> {/* edit user form */}
        </div>
      </div>
    </div>
  );
};

export default User;