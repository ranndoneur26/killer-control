import React from 'react';

const Logo = ({ className = "h-12" }) => {
    return (
        <div className={`flex items-center justify-center shrink-0 ${className}`}>
            <img
                src="/images/killer_control_pos.png"
                alt="Killer Control"
                className="h-full w-auto block dark:hidden object-contain"
            />
            <img
                src="/images/killer_control_neg.png"
                alt="Killer Control"
                className="h-full w-auto hidden dark:block object-contain"
            />
        </div>
    );
};

export default Logo;
