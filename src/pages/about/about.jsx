import React from 'react';
import { Card, Text, Title } from '@mantine/core'

export function About() {

    return (
        <main className='mainPage'>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text> NOTE: This was written by Chat GPT and is about WanderWheels instead of frilode.</Text>

                <Title>About frilode</Title>
                <Text>
                    Welcome to WanderWheels, your gateway to exploring the great outdoors with ease and freedom! Founded in the heart of Utah, WanderWheels was born out of our love for adventure and our passion for technology. We believe that everyone should have the opportunity to experience the beauty of nature, whether it’s a weekend getaway or a cross-country road trip.
                </Text>

                <Title>Our Story</Title>
                <Text>
                    WanderWheels was founded by three friends who share a deep connection to the wild landscapes of Utah and beyond. After countless trips and many hours spent navigating the cumbersome process of renting recreational vehicles, we realized there had to be a better way. That’s why we decided to create a platform that simplifies RV rentals, making it easier, more affordable, and more enjoyable for everyone to hit the road.
                </Text>

                <Title>What We Do</Title>
                <Text>
                    WanderWheels is more than just a rental service—it’s a community of explorers, adventurers, and nature lovers. Our platform connects RV owners with travelers looking to embark on their next journey. We’ve streamlined the rental process, offering a wide range of vehicles, from cozy campervans to luxurious motorhomes, all available at your fingertips.
                </Text>
                <Text>
                    We focus on transparency, quality, and safety, ensuring that every rental experience meets the highest standards. Whether you’re a seasoned road warrior or a first-time traveler, WanderWheels is here to help you find the perfect vehicle for your trip.
                </Text>

                <Title>Our Mission</Title>
                <Text>
                    Our mission is simple: to make outdoor exploration accessible to everyone. We’re passionate about helping people discover the joy of the open road and the beauty of our natural world. By connecting RV owners with adventurers, we’re making it easier than ever to explore, relax, and create memories that will last a lifetime.
                </Text>
                
                <Title>Join the Journey</Title>
                <Text>
                    At WanderWheels, we’re not just building a business—we’re building a movement. We invite you to join our community, explore new places, and share your experiences. Whether you’re renting out your RV or planning your next adventure, we’re here to support you every step of the way.
                </Text>
            </Card>
        </main>
    )
}