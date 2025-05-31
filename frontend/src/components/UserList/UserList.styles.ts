export const useStyles = () => {
    return {
        searchForUserBar: "bg-pink-100 mt-10 rounded-2xl h-15 w-full flex items-center justify-start px-6 opacity-80",
        usersList: "scroll-container overflow-y-auto max-h-screen transition-[max-height,opacity] duration-500 ease-in-out",
        user: "bg-pink-100 mt-3 rounded-2xl h-15 w-full flex items-center justify-start px-6 gap-5",
        animationStart: "max-h-screen opacity-100",
        animationEnd: "max-h-0 opacity-0 overflow-hidden",
    };
};