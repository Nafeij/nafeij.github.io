import React from 'react';
import {default as IconExternal} from './external';
import {default as IconGitHub} from './github';
import {default as IconLinkedIn} from './linkedin';
import {default as IconReddit} from './reddit';
import {default as IconStrava} from './strava';
import {default as IconLeetCode} from './leetcode';
import {default as IconMail} from './mail';
import {default as IconResume} from './resume';

const Icon = ({name} : {name : string}) => {
    switch (name) {
        case 'External':
            return <IconExternal />;
        case 'GitHub':
            return <IconGitHub />;
        case 'LinkedIn':
            return <IconLinkedIn />;
        case 'Reddit':
            return <IconReddit />;
        case 'Strava':
            return <IconStrava />;
        case 'LeetCode':
            return <IconLeetCode />;
        case 'Email':
            return <IconMail />;
        case 'Resume':
            return <IconResume />;
        default:
            return <IconExternal />;
    }
};

export default Icon;