import LogoNavbar from "./Images";


export default function Navbar(){
  return (
    <nav className="bg-[#184370]">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-0">
          <div>
            <LogoNavbar/>
          </div>
          <div>
          <ul className="hidden md:flex space-x-4 p-5 lg:space-x-16 text-base font-medium text-white" >
            <li>
              <a href="#about" className="btn btn-sm btn-ghost">
               Accueil
              </a>
            </li>
            <li>
              <a href="#about" className="btn btn-sm btn-ghost">
                A propos
              </a>
            </li>
            <li>
              <a href="#about" className="btn btn-sm btn-ghost">
                Prestations
              </a>
            </li>
            <li>
              <a href="#about" className="btn btn-sm btn-ghost">
                Reserver    
              </a>
            </li>
            
          </ul>

          </div>
        </div>
      </div>
    </nav>
  );
}
