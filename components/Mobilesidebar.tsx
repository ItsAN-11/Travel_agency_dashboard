//@ts-nocheck

import  { SidebarComponent } from "@syncfusion/ej2-react-navigations"
import { Link } from "react-router"
import NavItems from "./navItems";


const Mobilesidebar = () => {

    let sidebar: SidebarComponent;

    const toggleSidebar = () => {
        sidebar.toggle()
    }

    return (
        <div className="mobile-sidebar wrapper ">
        <header>
            <Link to="/">
                <img 
                    src="../public/assets/icons/logo.svg"
                    alt="logo"
                    className="size-[30px]"
                />
            <h1>Tourvisto</h1>
            </Link>
            {/* <button onClick={()=>{}}></button> pain in the ass so will use syncfusion as we did for desktop  */}
            
            
        
            <button onClick={()=> sidebar.toggle()}>            <img 
            src="../public/assets/icons/menu.svg"
            alt="menu"
            className="size-7"/>
            
            <SidebarComponent 
                width={270} 
                
                ref={(Sidebar) => sidebar = Sidebar}
                
                created={() => sidebar.hide()}
                closeOnDocumentClick={true}
                showBackdrop={true}
                type="over"
                >
                    <NavItems handleClick={toggleSidebar} />
            </SidebarComponent></button>

        </header>
        </div>
    )
}


export default Mobilesidebar
