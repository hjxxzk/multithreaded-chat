export const useStyles = () => {
    return {
        mainScreen: "flex items-center justify-center bg-pink-100 bg-opacity-30 w-screen h-screen relative",
        sideBar: "fixed top-0 left-0 h-full w-5 z-50",
        sideBarContainer: "fixed top-0 left-0 bg-pink-400 h-full w-1/5 flex flex-col pr-7 pl-7 transform transition-transform duration-300 ease-in-out z-40",
        chat: "flex bg-pink-300 h-screen w-full",
        animationStart: "translate-x-0",
        animationEnd: "-translate-x-full",
    };
};  