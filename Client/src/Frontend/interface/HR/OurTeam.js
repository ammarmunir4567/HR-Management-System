import React from 'react'
import Sidebar from '../../Components/Sidebar'
import Menubar from '../../Components/Menubar'
import ammar from '../../Assets/ammar.jpeg'
import rabiya from '../../Assets/rabiya.jpeg'
import hashim from '../../Assets/hashim.png'
export default function OurTeam() {
  return (
    <>

    <body className="flex bg-gray-100 min-h-screen">
      <aside className="hidden sm:flex sm:flex-col">
        <a
          href="#"
          className="inline-flex items-center justify-center h-20 w-60 bg-purple-600 hover:bg-purple-500 focus:bg-purple-500"
        >
          <svg fill="none" viewBox="0 0 64 64" className="h-12 w-12">
            <title>Company logo</title>
            <path
              d="M32 14.2c-8 0-12.9 4-14.9 11.9 3-4 6.4-5.6 10.4-4.5 2.3.6 4 2.3 5.7 4 2.9 3 6.3 6.4 13.7 6.4 7.9 0 12.9-4 14.8-11.9-3 4-6.4 5.5-10.3 4.4-2.3-.5-4-2.2-5.7-4-3-3-6.3-6.3-13.7-6.3zM17.1 32C9.2 32 4.2 36 2.3 43.9c3-4 6.4-5.5 10.3-4.4 2.3.5 4 2.2 5.7 4 3 3 6.3 6.3 13.7 6.3 8 0 12.9-4 14.9-11.9-3 4-6.4 5.6-10.4 4.5-2.3-.6-4-2.3-5.7-4-2.9-3-6.3-6.4-13.7-6.4z"
              fill="#fff"
            />
          </svg>
        </a>
        <Sidebar/>
      </aside>

      <div className="flex-grow text-gray-800">
        <Menubar/>
     <section className="bg-dark dark:bg-gray-900  h-max">
  <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
      <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-purple-500 ">Our Team</h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">The Team behind this HRM project </p>
      </div> 
      <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="text-center text-gray-500 dark:text-gray-400">
              <img className="mx-auto mb-4 w-36 h-36 rounded-full" src={ammar} alt="Bonnie Avatar"/>
              <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">Ammar Munir</a>
              </h3>
              <p>Team Lead</p>
             
          </div>
          <div className="text-center text-gray-500 dark:text-gray-400">
              <img className="mx-auto mb-4 w-36 h-36 rounded-full" src={hashim} alt="Helene Avatar"/>
              <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">Hashim Bilal</a>
              </h3>
              <p>Backend Developer</p>
             
          </div>
          <div className="text-center text-gray-500 dark:text-gray-400">
              <img className="mx-auto mb-4 w-36 h-36 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Avatar"/>
              <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">Aleesha Waheed</a>
              </h3>
              <p>Frontend Developer</p>
            
          </div>
          <div className="text-center text-gray-500 dark:text-gray-400">
              <img className="mx-auto mb-4 w-36 h-36 rounded-full" src={rabiya} alt="Joseph Avatar"/>
              <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">Rabiya Kamran</a>
              </h3>
              <p>UI Designer</p>
           
          </div>
      </div>  
  </div>
</section> 

</div>
      </body>
    </>
  )
}
