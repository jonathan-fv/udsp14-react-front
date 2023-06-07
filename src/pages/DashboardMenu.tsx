import { Link } from "react-router-dom"

const DashboardMenu = () => {
    return (
        <>
        <div className="dasboard-menu-container">
            <div className="menu-button">
                <a href="create-situation" className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white active:bg-pink-600 font-bold uppercase px-8 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Ajouter une nouvelle situation</a>
            </div>
            <div className="menu-button">
                <div className="menu-button">
                    <a href="situations" className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white active:bg-pink-600 font-bold uppercase px-8 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Liste de toutes les situations</a>
                </div>
            </div>
            <div className="menu-button">
                <div className="menu-button">
                    <a href="/administration" className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white active:bg-pink-600 font-bold uppercase px-8 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Utilisateur</a>
                </div>
            </div>
        </div>
        </>
    )
}

export default DashboardMenu