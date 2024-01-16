'use client';
import { useState } from 'react';
import {
    Drawer,
    Button,
    Typography,
    IconButton,
} from '@material-tailwind/react';
import { Bars4Icon } from '@heroicons/react/24/outline';
const DrawerDefault = ({ data }: any) => {
    const [open, setOpen] = useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    return (
        <div >
            <span className='flex mr-3 items-center font-bold'>
                <Bars4Icon
                    onClick={openDrawer}
                    className="w-8 h-8  cursor-pointer hover:bg-sky-700 focus:text-neutral-700 "
                />   All
            </span>

            <Drawer open={open} onClose={closeDrawer} className="p-4">
                <div className="mb-4 flex items-center justify-between bg-blue-gray-900 text-white">
                    <Typography variant="h5" color="white">
                        {data.user.name}
                    </Typography>
                    <IconButton variant="text" color="white" onClick={closeDrawer}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-black h-[calc(100vh-2rem)] w-full max-w-[20rem] p-2 shadow-xl shadow-blue-gray-900/5">
                    <div className="flex flex-col gap-1 min-w-[240px]  font-sans text-base font-normal text-gray-700">
                        <div
                            role="button"
                            tabIndex={0}
                            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                        >
                            Blocks
                        </div>
                        <div
                            role="button"
                            tabIndex={0}
                            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                        >
                            Books
                        </div>
                        <div
                            role="button"
                            tabIndex={0}
                            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                        >

                            Example Pages
                            <div className="grid place-items-center ml-auto justify-self-end">
                                <div
                                    className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-blue-500/20 text-blue-900 py-1 px-2 text-xs rounded-full"
                                    style={{ opacity: 1 }}
                                >
                                    <span className="">14</span>
                                </div>
                            </div>
                        </div>
                        <div
                            role="button"
                            tabIndex={0}
                            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                        >

                            Profile
                        </div>
                        <div
                            role="button"
                            tabIndex={0}
                            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                        >

                            Settings
                        </div>
                        <div
                            role="button"
                            tabIndex={0}
                            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                        >
                            <div className="grid place-items-center mr-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    className="h-5 w-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            Log Out
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default DrawerDefault;
