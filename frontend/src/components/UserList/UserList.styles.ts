export const useStyles = () => {
    return {
        sidebar: "fixed left-0 top-0 h-screen bg-pink-200 flex flex-col w-96 gap-4 shadow-md px-8 py-10 border-r-10 border-white",
        changeRoomButton: "bg-pink-400 text-white font-semibold rounded-xl p-3 hover:bg-pink-600 text-center cursor-pointer",
        text: " mt-3 text-md rounded-2xl h-15 w-full flex items-center justify-start px-3 gap-5",
        usersList: "flex-1 overflow-y-auto transition-[max-height,opacity]",
        sideContent: "w-full, h-full bg-pink-200 rounded-xl p-4",
        user: "bg-pink-100 mt-3 rounded-2xl h-15 w-full flex items-center justify-start px-6 gap-5",
    };
};
