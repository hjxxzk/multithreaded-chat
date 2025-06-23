export const useStyles = () => {
    return {
        roomsView: "w-screen h-screen flex flex-col items-center justify-start bg-pink-200 pt-50 gap-10",
        addRoomButton: "flex justify-around items-center bg-pink-500 rounded-2xl text-white w-3xs h-15 hover:bg-pink-600",
        roomsList: "grid grid-cols-3 gap-5 overflow-auto h-[70vh]",
        room: "bg-pink-100 mt-3 rounded-2xl h-20 w-2xs flex items-center justify-start px-6 gap-5 hover:bg-pink-50",
    }
}