'use client';
import {
    useCallback,
    useRef,
    useState,
    useEffect,
    startTransition,
} from 'react';
import Vapi from '@vapi-ai/web';
import { toast } from 'sonner';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { PhoneOffIcon } from 'lucide-react';
import { ICall } from '../types';
import {
    CreateAssistantDTO,
    DeepgramTranscriber,
    PlayHTVoice,
    OpenAIModel,
} from '@vapi-ai/web/dist/api';
import { callEndTranscriptAction } from '../lib/actions';

type Message = {
    role: 'user' | 'assistant' | 'system';
    content: string;
};

const getAssistantOptions = (call: ICall): CreateAssistantDTO => {
    const assistantName = 'John';
    const companyName = call.company.name;
    const questions = call.questions;
    const positiveQuestions = call.positiveQuestions?.split(',');
    const negativeQuestions = call.negativeQuestions;
    const AIPsersona = call.AIPersona || 'default';

    const questionsList = [
        ...(questions || []),
        ...(positiveQuestions || []),
    ].join(',');

    const transcriber: DeepgramTranscriber = {
        provider: 'deepgram',
        model: 'nova-2',
        language: 'en-US',
    };
    const voice: PlayHTVoice = {
        provider: 'playht',
        voiceId: 'jennifer',
    };

    // model
    const systemMessage = `
    You are an AI voice assistant conducting a call for a lawyers firm.
    Your job is to ask candidates provided questions, assess their responses.
    Begin the conversation with a friendly introduction, setting a relaxed yet professional tone.
    Example:
    "Hey there! Welcome to your the call. I'm ${assistantName}, your call assistant for ${companyName}.
    
    Ask the candidate questions one by one, and wait for the user's response before proceeding, and assess their responses. Keep the questions clear and concise. Below Are the questions ask one by one.
    ***Questions*** 
    ${questionsList}

    These are the negative questions, that you should politely decline to answer.
    ***Negative Questions***
    ${negativeQuestions}

    ***Your personality*** 
    ${AIPsersona}

    If the candidate struggles, offer hints or rephrase the question without giving away the answer.
    If the candidate has no questions, ask them if they have any other questions.
    If the candidate has no other questions, thank them for their time and end the call.
    Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
    After 6-8 questions, wrap up the interview smoothly by summarizing their performance.
    Keep responses short and natural, like a real conversation
    Adapt based on the candidate's confidence level
    `.trim();

    // console.log('\n\n\n');
    // console.log('systemMessage: ', systemMessage);

    const messages: Message[] = [
        {
            role: 'system',
            content: systemMessage,
        },
    ];

    const model: OpenAIModel = {
        provider: 'openai',
        model: 'gpt-4o-mini',
        messages,
    };

    const result: CreateAssistantDTO = {
        modelOutputInMessagesEnabled: true,
        name: 'AI Call Assistant',
        firstMessage: 'Hello, how can I help you today?',
        transcriber,
        voice,
        model,
        clientMessages: ['conversation-update', 'transcript'] as any,
        // serverMessages: ['conversation-update', 'transcript'] as any,
    };
    return result;
};

export function VapiInterview({
    call,
    feedbackId,
}: {
    call: ICall;
    feedbackId: string;
}) {
    // console.log('call info: ', call);
    const vapiRef = useRef<Vapi | null>(null);
    const [activeUser, setActiveUser] = useState(false);
    const conversationRef = useRef(null);
    // const [transcript, setTranscript] = useState<
    //     {
    //         role: string;
    //         text: string;
    //     }[]
    // >([]);
    // const [conversation, setConversation] = useState<string>('');

    const onCallEnd = () => {
        console.log('=========> call ended');
        // console.log('conversation: ', conversation);
        // console.log('conversationRef.current: ', conversationRef.current);
        startTransition(() => {
            const conversationString = JSON.stringify(conversationRef.current);
            callEndTranscriptAction(call, feedbackId, conversationString);
        });
    };

    const initVapi = useCallback(() => {
        if (!vapiRef.current) {
            const handleMessage = (msg: any) => {
                // console.log('msg: ', msg);
                if (msg?.type === 'conversation-update') {
                    // const convoString = JSON.stringify(msg.conversation);
                    // setConversation(convoString);
                    conversationRef.current = msg.conversation;
                }
            };

            const vapiInstance = new Vapi(
                process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY as string
            );
            vapiRef.current = vapiInstance;

            vapiInstance.on('message', handleMessage);

            vapiInstance.on('call-start', () => {
                toast('Call Connected...');
            });

            vapiInstance.on('call-end', () => {
                toast('call ended');
                onCallEnd();
                // setTranscript([]);
            });

            vapiInstance.on('speech-start', () => {
                console.log('Assistant speech has started.');
                setActiveUser(false);
            });

            vapiInstance.on('speech-end', () => {
                console.log('Assistant speech has ended.');
                setActiveUser(true);
            });

            // vapiInstance.on('volume-level', (volume: number) => {
            //     // setVolumeLevel(volume);
            //     // toast(`Volume level: ${volume}`);
            // });

            vapiInstance.on('error', (e: Error) => {
                console.error('Vapi error:', e);
            });
        }
    }, []);

    useEffect(() => {
        if (call) {
            // console.log('call info received: ');
            const assistantOptions = getAssistantOptions(call);
            // console.log('assistantOptions: ', assistantOptions);
            initVapi();

            vapiRef.current?.start(assistantOptions);

            return () => {
                if (vapiRef.current) {
                    vapiRef.current.stop();
                    vapiRef.current = null;
                }
            };
        }
    }, [initVapi, call]);

    if (!call || !feedbackId) {
        return <div>No call or feedbackId</div>;
    }

    const endCall = () => {
        vapiRef.current?.stop();
    };

    return (
        <div className="flex flex-col gap-4 mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    {/* bg-blue-500 text-primary-foreground */}
                    <Card className="">
                        <CardContent>
                            <div className="text-center text-2xl font-bold">
                                AI Call
                            </div>
                            <div className="text-center text-sm text-muted-foreground">
                                {!activeUser ? 'speaking...' : 'listening...'}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardContent>
                            <div className="text-center text-2xl font-bold">
                                You
                            </div>
                            <div className="text-center text-sm text-muted-foreground">
                                {activeUser ? 'speaking...' : 'listening...'}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="flex justify-start mt-5">
                <Button onClick={endCall} className="cursor-pointer">
                    <PhoneOffIcon className="w-4 h-4 mr-2" />
                    End Call
                </Button>
            </div>
        </div>
    );
}
