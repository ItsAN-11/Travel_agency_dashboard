import {Outlet} from 'react-router';
import {SidebarComponent} from "@syncfusion/ej2-react-navigations"
import { NavItems, Mobilesidebar } from 'components';
 
const adminLayout = () => {
  return (
    <div className='admin-layout'>
      <Mobilesidebar/>
      
      <aside className='w-full max-w-[270px] hidden lg:block'>
        <SidebarComponent width={270} enableGestures={false}>
          <NavItems />
        </SidebarComponent>
      </aside>
      
      
      <aside className="children">
        <Outlet />
      </aside>
    </div>
  )
}

export default adminLayout
