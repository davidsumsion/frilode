import React from 'react';
import './success.css'
import { Card, Text, Title} from '@mantine/core'

export function Success() {
  return (
    <main className='container-fluid text-center'>
      <div className="successCard">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title>  Success! </Title>
            <Text  size="sm" c="dimmed"> You Successfully Rented or Added a Vehicle!</Text>
        </Card>
     </div>
    </main>
  );
}