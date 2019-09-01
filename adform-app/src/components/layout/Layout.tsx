import React from 'react';
import { Header } from '../header/Header';


export const Layout: React.FC = ({ children }) => {

    return <div>
        <Header />
        <div className="container p-3">
            {children}
        </div>
    </div>;
}
