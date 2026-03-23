import React from 'react';

const Logo = ({ darkBackground = false, className = "h-8" }) => {
    if (darkBackground) {
        return (
            <img
                src="/images/logo_killer_control_neg.svg"
                alt="Killer Control"
                className={`${className} w-auto`}
            />
        );
    }

    return (
        <>
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
        </>
    );
};

export default Logo;
