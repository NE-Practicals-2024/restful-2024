import React from 'react';

const Layout: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {

    return (
        <div className="w-full flex flex-col min-h-screen justify-between bg-[#f3f6fa]">
            {children}
        </div>
    )
}

export default Layout