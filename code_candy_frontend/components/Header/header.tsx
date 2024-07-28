import Link from "next/link";
import Image from 'next/image'
import logo from '../../public/android-chrome-192x192.png'

export function Header() {
    return (
        <div>
            <nav className="bg-white border-black-200 header-color">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
            <Link href="/" className="flex items-between space-x-3 rtl:space-x-reverse me-6">
                <Image src= {logo} className="h-8 w-8" alt="Code Candy Logo" />
                {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span> */}
            </Link>
            {/* <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button type="button" className="flex text-sm bg-black-800 rounded-full md:me-0 focus:ring-4 focus:ring-black-300 dark:focus:ring-black-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
                </button>
                
                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-black-100 rounded-lg shadow dark:bg-black-700 dark:divide-black-600" id="user-dropdown">
                    <div className="px-4 py-3">
                    <span className="block text-sm text-black-900 dark:text-white">Bonnie Green</span>
                    <span className="block text-sm  text-black-500 truncate dark:text-black-400">name@flowbite.com</span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                        <Link href="#" className="block px-4 py-2 text-sm text-black-700 hover:bg-black-100 dark:hover:bg-black-600 dark:text-black-200 dark:hover:text-white">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="#" className="block px-4 py-2 text-sm text-black-700 hover:bg-black-100 dark:hover:bg-black-600 dark:text-black-200 dark:hover:text-white">Settings</Link>
                    </li>
                    <li>
                        <Link href="#" className="block px-4 py-2 text-sm text-black-700 hover:bg-black-100 dark:hover:bg-black-600 dark:text-black-200 dark:hover:text-white">Earnings</Link>
                    </li>
                    <li>
                        <Link href="#" className="block px-4 py-2 text-sm text-black-700 hover:bg-black-100 dark:hover:bg-black-600 dark:text-black-200 dark:hover:text-white">Sign out</Link>
                    </li>
                    </ul>
                </div>
                <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black-500 rounded-lg md:hidden hover:bg-black-100 focus:outline-none focus:ring-2 focus:ring-black-200 dark:text-black-400 dark:hover:bg-black-700 dark:focus:ring-black-600" aria-controls="navbar-user" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div> */}
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-black-100 rounded-lg bg-black-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-black-800 md:dark:bg-black-900 dark:border-black-700">
                <li>
                    <Link href="/" className="block py-2 px-3 text-black bg--black700 rounded md:bg-transparent md:text-black-700 md:p-0 md:dark:text-black-500" aria-current="page">Home</Link>
                </li>
                <li>
                    <Link href="/dashboard/games" className="block py-2 px-3 text-black-900 rounded hover:bg-black-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-black-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-black-700">Game</Link>
                </li>
                <li>
                    <Link href="/dashboard/styles" className="block py-2 px-3 text-black-900 rounded hover:bg-black-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-black-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-black-700">Styles</Link>
                </li>
                <li>
                    <Link href="/dashboard/reddit" className="block py-2 px-3 text-black-900 rounded hover:bg-black-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-black-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-black-700">Reddit</Link>
                </li>
                <li>
                    <Link href="/dashboard/sandbox" className="block py-2 px-3 text-black-900 rounded hover:bg-black-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-black-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-black-700">Sand Box</Link>
                </li>
                </ul>
            </div>
            </div>
            </nav>

        </div>
    );
}