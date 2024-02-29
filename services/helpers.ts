export async function fetchSlideData() {
  try {
    const response = await fetch(
      "http://localhost:3005/pixi-slide?slideNum=1",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching slide data:", error);
  }
}
export async function fetchVideoData() {
  try {
    const response = await fetch("http://localhost:3005/pixi_video", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching slide data:", error);
  }
}

// function base64ToBlob(base64, mimeType) {
//     const byteString = window.atob(base64.split(",")[1]);
//     const arrayBuffer = new ArrayBuffer(byteString.length);
//     const int8Array = new Uint8Array(arrayBuffer);

//     for (let i = 0; i < byteString.length; i++) {
//       int8Array[i] = byteString.charCodeAt(i);
//     }

//     return new Blob([int8Array], { type: mimeType });
//   }

export const recordVideoFromPuppeteer = async (
  videoDuration: Number,
  framePerSecond: Number
) => {
  //   try {
  //     const res = await fetch("http://localhost:3005/record-video", {
  //       headers: { "Content-type": "application/json; charset=UTF-8" },
  //       method: "POST",
  //       body: JSON.stringify({ id: uuidv4(), videoDuration, framePerSecond }),
  //     });
  //     console.log("### res", res);
  //   } catch (error) {
  //     console.log("### error", error);
  //   }
};
