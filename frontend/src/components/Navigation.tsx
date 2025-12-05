import { NavLink } from "react-router-dom"

export const Navigation = () => {
const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/food", label: "Food" },
  { to: "/transport", label: "Transport" },
  { to: "/shopping", label: "Shopping" },
  { to: "/electricity", label: "Electricity" },
  { to: "/about", label: "About" }
];
    return <>
    <nav className="fixed left-0 top-0 h-full w-64 p-6" style={{ backgroundColor: '#101935' }}>
    {links.map(link => (
        <li key={link.to} className="list-none">
            <NavLink to={link.to} className={({ isActive }) =>
            isActive
          ? "text-white font-semibold underline" 
          : "text-white hover:text-gray-300"        
        }
                >{link.label}</NavLink>
        </li>
    ))}
  
    </nav>
    
    </>
}