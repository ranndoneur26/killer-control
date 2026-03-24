import React from 'react';

const Logo = ({ className = "h-8" }) => {
    return (
        <div className="flex items-center">
            <img
                src="/images/killer_control_pos.png"
                alt="Killer Control"
                className={`${className} w-auto block dark:hidden`}
            />
            <img
                src="/images/killer_control_neg.png"
                alt="Killer Control"
                className={`${className} w-auto hidden dark:block`}
            />
        </div>
    );
};

export default Logo;
