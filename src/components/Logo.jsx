import React from 'react';

const Logo = ({ className = "h-8" }) => {
    return (
        <div className="flex items-center">
            <img
                src="/images/logo_killer_control_pos.svg"
                alt="Killer Control"
                className={`${className} w-auto block dark:hidden`}
            />
            <img
                src="/images/logo_killer_control_neg.svg"
                alt="Killer Control"
                className={`${className} w-auto hidden dark:block`}
            />
        </div>
    );
};

export default Logo;
