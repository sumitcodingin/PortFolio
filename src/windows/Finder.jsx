import { WindowControls } from '#components'
import { locations } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import { Search } from 'lucide-react'
import React from 'react'
import useLocationStore from '#store/location.js';
import clsx from 'clsx'
import useWindowStore from '#store/window'

const Finder = () => {
    const {openWindow}=useWindowStore();
    const {activeLocation,setActiveLocation}=useLocationStore();
   
    const openItem=(item)=>{
        if(item.fileType==='pdf') return openWindow('resume')
        if(item.kind==='folder') return setActiveLocation(item)
        if(['fig','url'].includes(item.fileType)&&item.href) return window.open(item.href,"_blank")
        openWindow(`${item.fileType}${item.kind}`,item);
    }
    const renderList=(items)=>items.map((item)=>(
                <li className={clsx(item.id===activeLocation.id ? "active" : "non-active")}  key={item.id} onClick={()=>setActiveLocation(item)}>
                    <img src={item.icon} alt={item.name} className='w-4'/>
                    <p className='text=sm font-medium truncate'>{item.name}</p>

                </li>
              ));
  return <>
  <div id='window-header'>
    <WindowControls target='finder'/>
    <Search className='icon-hover'/>


  </div>
  <div className='bg-white flex h-full'>
    <div className='sidebar'>
        <div>
            <h3>Favourites</h3>
            <ul>
              {renderList(Object.values(locations))}
            </ul>
           
        </div>
        <div>
            <h3>My projects</h3>
            <ul>
              {renderList(locations.work.children)}
            </ul>
        </div>
    </div>
    <ul className='content'>
    {activeLocation?.children.map((item)=>(
        <li key={item.id} className={item.position} onClick={()=>openItem(item)}>
            <img src={item.icon} alt={item.name} />
            <p>{item.name}</p>
        </li>

    )

    )}

  </ul>

  </div>
  
  </>
}
const FinderWindow=WindowWrapper(Finder,'finder');

export default FinderWindow
