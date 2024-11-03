import React from 'react';
import { Typography } from '@mui/material';

const Greeting = () => {
    const getGreeting = () => {
        const hours = new Date().getHours();
        let greet;

        if (hours < 12) {
            greet = "morning";
        } else if (hours >= 12 && hours <= 17) {
            greet = "afternoon";
        } else {
            greet = "evening";
        }

        return `Good ${greet}`;
    };

    return (
        <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ 
                mb: 4,
                textAlign: 'center',
                color: 'text.primary' 
            }}
        >
            {getGreeting()}, Welcome Back
        </Typography>
    );
};

export default Greeting; 