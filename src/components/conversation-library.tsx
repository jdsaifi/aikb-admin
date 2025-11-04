'use client';
import { MessageCircle, Search } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock } from 'lucide-react';
import { Users } from 'lucide-react';
import { MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { ICall } from '../types';
import Link from 'next/link';

const categories = [
    'All',
    'Food & Dining',
    'Professional',
    'Travel',
    'Healthcare',
    'Social',
];

const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

interface Conversation {
    id: string;
    title: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    category:
        | 'Food & Dining'
        | 'Professional'
        | 'Travel'
        | 'Healthcare'
        | 'Social';
    duration: string;
    people: number;
    type: 'Dialogue';
}

const conversations: Conversation[] = [
    {
        id: '1',
        title: 'Ordering Coffee at a Café',
        description:
            'Practice everyday conversation skills by ordering your favorite drink and engaging in small talk with a barista.',
        difficulty: 'Beginner',
        category: 'Food & Dining',
        duration: '5 min',
        people: 2,
        type: 'Dialogue',
    },
    {
        id: '2',
        title: 'Job Interview Simulation',
        description:
            'Prepare for your next job interview with realistic questions and professional conversation practice.',
        difficulty: 'Advanced',
        category: 'Professional',
        duration: '15 min',
        people: 2,
        type: 'Dialogue',
    },
    {
        id: '3',
        title: 'Making Travel Plans',
        description:
            'Learn to discuss vacation destinations, book accommodations, and ask for travel...',
        difficulty: 'Intermediate',
        category: 'Travel',
        duration: '10 min',
        people: 3,
        type: 'Dialogue',
    },
    {
        id: '4',
        title: "Doctor's Appointment",
        description:
            'Practice describing symptoms, understanding medical advice, and asking health-related questions.',
        difficulty: 'Intermediate',
        category: 'Healthcare',
        duration: '8 min',
        people: 2,
        type: 'Dialogue',
    },
    {
        id: '5',
        title: 'Casual Friend Meetup',
        description:
            'Engage in relaxed, everyday conversations with friends about hobbies, current events, and plans.',
        difficulty: 'Beginner',
        category: 'Social',
        duration: '7 min',
        people: 3,
        type: 'Dialogue',
    },
    {
        id: '6',
        title: 'Business Negotiation',
        description:
            'Master the art of professional negotiation, deal-making, and formal business communication.',
        difficulty: 'Advanced',
        category: 'Professional',
        duration: '20 min',
        people: 2,
        type: 'Dialogue',
    },
];

const difficultyColors = {
    Beginner: 'bg-green-500 text-white font-semibold',
    Intermediate: 'bg-orange-400 text-white font-semibold',
    Advanced: 'bg-red-500 text-white font-semibold',
};

const categoryColors = {
    'Food & Dining': 'bg-blue-500 text-white font-semibold',
    Professional: 'bg-purple-500 text-white  font-semibold',
    Travel: 'bg-green-500 text-white font-semibold',
    Healthcare: 'bg-cyan-400 text-white font-semibold',
    Social: 'bg-red-400 text-white font-semibold transition-colors',
};

export default function ConversationLibrary({ calls }: { calls: ICall[] }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredConversations = calls?.filter((conv) => {
        // return true;
        // const matchesCategory = true;
        // const matchesCategory =
        //     selectedCategory === 'All' || conv.category === selectedCategory;
        // const matchesDifficulty =
        //     selectedDifficulty === 'All' ||
        //     conv.difficulty === selectedDifficulty;
        const matchesSearch =
            conv?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            conv?.description
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase());
        return matchesSearch;
        // return matchesCategory && matchesDifficulty && matchesSearch;
    });

    console.log('filtered conver: ', filteredConversations);

    return (
        <main>
            {/* Content */}
            <div className="">
                {/* Header */}
                <div className="flex items-start gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Conversation Library
                        </h2>
                        <p className="text-gray-600">
                            Choose a conversation to practice and improve your
                            skills
                        </p>
                    </div>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Filters */}
                <div className="space-y-4 mb-6">
                    <div>
                        <span className="text-sm font-medium text-gray-700 mr-3">
                            Category:
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <Badge
                                    key={category}
                                    variant={
                                        selectedCategory === category
                                            ? 'default'
                                            : 'secondary'
                                    }
                                    className={`cursor-pointer ${
                                        selectedCategory === category
                                            ? 'bg-purple-600 hover:bg-purple-700'
                                            : 'hover:bg-gray-200'
                                    }`}
                                    onClick={() =>
                                        setSelectedCategory(category)
                                    }
                                >
                                    {category}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div>
                        <span className="text-sm font-medium text-gray-700 mr-3">
                            Difficulty:
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {difficulties.map((difficulty) => (
                                <Badge
                                    key={difficulty}
                                    variant={
                                        selectedDifficulty === difficulty
                                            ? 'default'
                                            : 'secondary'
                                    }
                                    className={`cursor-pointer ${
                                        selectedDifficulty === difficulty
                                            ? 'bg-purple-600 hover:bg-purple-700'
                                            : 'hover:bg-gray-200'
                                    }`}
                                    onClick={() =>
                                        setSelectedDifficulty(difficulty)
                                    }
                                >
                                    {difficulty}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <p className="text-sm text-gray-600 mb-6">
                    {filteredConversations.length} conversations available
                </p>

                {/* Conversation Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredConversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            className="border rounded-lg p-6 bg-white cursor-pointer transition-transform transition-shadow duration-700 ease-in-out hover:shadow-card hover:-translate-y-1"
                        >
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {conversation.name}
                                </h3>
                                {conversation?.subHeading && (
                                    <p className="text-sm text-gray-600 mb-3">
                                        {conversation.subHeading}
                                    </p>
                                )}

                                <div className="flex gap-2 mb-4">
                                    <Badge
                                        className={
                                            difficultyColors[
                                                (conversation?.negativeQuestions as keyof typeof difficultyColors) ||
                                                    'All'
                                            ]
                                        }
                                    >
                                        {conversation?.negativeQuestions ||
                                            'All'}
                                    </Badge>
                                    <Badge
                                        className={
                                            categoryColors[
                                                (conversation?.positiveQuestions as keyof typeof categoryColors) ||
                                                    'All'
                                            ]
                                        }
                                    >
                                        {conversation?.positiveQuestions ||
                                            'All'}
                                    </Badge>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {conversation.questions?.length}{' '}
                                        questions
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        {conversation.documents?.length}{' '}
                                        documents
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageSquare className="w-4 h-4" />
                                        {conversation.documents?.length}{' '}
                                        documents
                                    </div>
                                </div>
                            </div>

                            <Button
                                className="w-full bg-purple-600 hover:bg-purple-700 cursor-pointer"
                                asChild
                            >
                                <Link href={`/calls/${conversation.id}`}>
                                    Start Practice
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
