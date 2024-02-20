import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Video Maker App",
  description: "To make videos",
};

const VideoMaker = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#FBFCFE]">
      <div className="bg-white rounded-lg  p-8 m-4 w-full lg:w-3/4">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Slide 1 of 1</h1>
        </div>
        <div className="border rounded-lg h-96">
          {/* Content of the slide goes here */}
        </div>
      </div>
    </div>
  );
};

export default VideoMaker;

{
  /* <div className="flex justify-between items-center mt-4">
          <button className="text-white bg-blue-500 px-4 py-2 rounded">
            + 5s
          </button>
        //   Icons would be inserted here with corresponding actions
          <div className="space-x-4">
            <button className="text-blue-500">+</button>
            <button className="text-blue-500">
              <i className="fas fa-image"></i>
            </button>
            <button className="text-blue-500">
              <i className="far fa-smile"></i>
            </button>
            <button className="text-blue-500">
              <i className="fas fa-text-height"></i>
            </button>
            <button className="text-blue-500">
              <i className="fas fa-pencil-alt"></i>
            </button>
            <button className="text-blue-500">
              <i className="fas fa-music"></i>
            </button>
          </div>
          <button className="text-white bg-blue-500 px-4 py-2 rounded">
            - 5s
          </button>
        </div> */
}
