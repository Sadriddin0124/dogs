import React, { useEffect } from "react";
import useGetDogStore from "./store";
const App = () => {
  const { getImages, images } = useGetDogStore();
  useEffect(() => {
    getImages();
  }, []);
  const downloadImage =()=> {
    const imageUrl = images?.message
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${images?.message}.jpg`); 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Error downloading the image: ', error);
      });
  }
  return (
    <div className="w-[100%] flex flex-col items-center">
      <div className="md:w-[60%] w-[100%] p-[10px] flex flex-col items-center gap-[20px]">
        <h1>Dogs</h1>
        <img
          src={images?.message}
          alt=""
          className="w-[100%] h-[80vh] object-cover"
        />
        <div className="flex gap-[10px]">
        <button className="px-[15px] py-[8px] bg-violet-600 text-white rounded-md" onClick={getImages}>Generate new image</button>
        <button className="px-[15px] py-[8px] bg-violet-600 text-white rounded-md" onClick={downloadImage}>Download image</button>
        </div>
      </div>
    </div>
  );
};

export default App;
