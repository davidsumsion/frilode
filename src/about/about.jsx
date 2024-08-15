import React from 'react';
import { useNavigate } from 'react-router-dom';
import './about.css';
import { Card, Text } from '@mantine/core'

export function About() {

    return (
        <main className='mainPage'>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text>Insert Story of frilode:</Text>
            </Card>
        </main>
    )
}