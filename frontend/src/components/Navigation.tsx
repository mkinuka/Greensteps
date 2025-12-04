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
    <nav>
    {links.map(link => (
        <li key={link.to}>
            <NavLink to={link.to} className={({ isActive }) =>
            isActive
          ? "text-blue-600 font-semibold underline" 
          : "text-gray-800 hover:text-blue-600"        
        }
                >{link.label}</NavLink>
        </li>
    ))}
  
    </nav>
    
    </>
}