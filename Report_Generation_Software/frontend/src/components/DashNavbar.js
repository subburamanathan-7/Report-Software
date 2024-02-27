import { Fragment} from 'react'
import { useNavigate } from 'react-router-dom'

import toast from 'react-hot-toast';
import { Menu, Transition } from '@headlessui/react'

const forese = require('../assets/forese.png')

function DashNavbar() {
    
	let name = sessionStorage.getItem('name');
   
	let index = name?name.indexOf(' '):'';
	console.log({name,index})
	if(index>0){
		name = name?name.substring(0,index):'';
	}

	name = name?name.charAt(0).toUpperCase() + name.slice(1):'';

	const navigate = useNavigate();
	const handleLogout = ()=>{
        sessionStorage.clear();
        toast.success('Logout Sucessful')
        navigate('/')
  	}

    return (
       <>
        <header className='mb-[2%] shadow-md  bg-[#8EA7E9]'>
            <nav className='flex justify-between items-center w-[92%] mx-auto py-2'>
                <div>
                    <img className='w-16'
                    alt='forese-logo'
                    src={forese} />
                </div>
                <div className='flex justify-end '>
                    <Menu as="div" className="relative inline-block text-left">
                          <div>
                            <Menu.Button className="">
                            {
                       
                                <div className='mr-2 ml-2'>
                                    <button className='bg-[#DBDFEA] text-[#000000] px-5 py-2 rounded-full flex  items-center justify-between'>
                                        {name} <i class=" pl-2 fa-solid fa-caret-down"></i>
                                    </button>
                                </div>
                            }
                            </Menu.Button>
                          </div>
                    
                          <Transition
                            as={Fragment}
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 rounded-full">
                              <div className="">
                                <Menu.Item>
                                  {({ active }) => (
                                   <div className='ml-2'>
                                    <button 
                                    className='bg-[#DBDFEA] text-[#000000] px-10 py-2 rounded-full hover:scale-95 duration-150' 
                                    onClick={handleLogout}>
                                        
                                        Logout
                                    </button>
                                    </div>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                    </Menu>
                </div>
            </nav>
        </header>
       </>
       
    )
}
export default DashNavbar