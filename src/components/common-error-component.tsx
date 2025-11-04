import { FlagIcon } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import { Typography } from './ui/typography';

interface CommonErrorComponentProps {
    title?: string;
    message: string;
    actionLabel?: string;
    onAction?: () => void;
    actionHref?: string;
}

export const CommonErrorComponent: React.FC<CommonErrorComponentProps> = ({
    title = 'Something went wrong',
    message,
    actionLabel,
    onAction,
    actionHref,
}) => {
    return (
        <div className="h-screen mx-auto grid place-items-center text-center px-8">
            <div>
                <FlagIcon className="w-20 h-20 mx-auto" />
                <div className="mt-10 !text-3xl !leading-snug md:!text-4xl">
                    Opps! <br /> {message}
                </div>
                <div className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
                    Something went wrong. Please try again later.
                </div>
                {/* <Button color="gray" className="w-full px-4 md:w-[8rem]">
                    back home
                </Button> */}
                {actionLabel &&
                    (onAction || actionHref) &&
                    (actionHref ? (
                        <a
                            href={actionHref}
                            className="inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                            {actionLabel}
                        </a>
                    ) : (
                        <button
                            onClick={onAction}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                            {actionLabel}
                        </button>
                    ))}
            </div>
        </div>
        // <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg shadow-sm text-center max-w-md mx-auto">
        //     <svg
        //         className="w-12 h-12 text-red-400 mb-4"
        //         fill="none"
        //         stroke="currentColor"
        //         viewBox="0 0 24 24"
        //         aria-hidden="true"
        //     >
        //         <circle cx="12" cy="12" r="10" strokeWidth="2" />
        //         <path
        //             strokeLinecap="round"
        //             strokeLinejoin="round"
        //             strokeWidth="2"
        //             d="M12 8v4m0 4h.01"
        //         />
        //     </svg>
        //     <h2 className="text-lg font-semibold text-red-700 mb-2">{title}</h2>
        //     <p className="text-sm text-red-600 mb-4">{message}</p>
        //     {actionLabel &&
        //         (onAction || actionHref) &&
        //         (actionHref ? (
        //             <a
        //                 href={actionHref}
        //                 className="inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        //             >
        //                 {actionLabel}
        //             </a>
        //         ) : (
        //             <button
        //                 onClick={onAction}
        //                 className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        //             >
        //                 {actionLabel}
        //             </button>
        //         ))}
        // </div>
    );
};

export default CommonErrorComponent;
