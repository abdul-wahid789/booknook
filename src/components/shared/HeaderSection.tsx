import React from 'react';
interface headerProps {
    smallTitle: string,
    heading: string,
    description: string
}
const HeaderSection = ({smallTitle, heading, description} : headerProps) => {
    return (
        <header className='space-y-2 my-10'>
            <p className='font-bold text-muted-foreground'>{smallTitle}</p>
            <h1 className='text-4xl font-heading text-primary'>{heading}</h1>
            <p className='text-muted-foreground'>{description}</p>
        </header>

    );
};

export default HeaderSection;