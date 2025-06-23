export const useStyles = () => {
    return {
        logo: "w-1/8 h-2/12",
        outerContainer: "w-3/5 bg-pink-200 p-4 flex flex-col justify-between h-10/12 rounded-4xl mb-15",
        innerContainer: "w-full bg-pink-50 overflow-y-auto h-full rounded-4xl p-5 gap-4",
        senderMessage: "bg-pink-400 rounded-xl justify-end px-5 py-2 max-w-[75%] break-words whitespace-pre-wrap mb-2",
        recipientMessage: "bg-pink-200 rounded-xl justify-start px-5 py-2 max-w-[75%] break-words whitespace-pre-wrap mb-2",
        rightContainer: "flex w-full justify-end items-center gap-3",
        leftContainer: "flex w-full justify-start items-center gap-3",
        blueBorder: "bg-sky-300 p-2 rounded w-full h-11/12 rounded-4xl",
        welcome: "text-center text-2xl pb-6",
        text: "text-left text-xl",
        input: "w-11/12 bg-pink-50 p-2 border border-white rounded mb-2",
        enterTextField: "flex justify-around items-center w-full pl-5 pr-5",
    };
};