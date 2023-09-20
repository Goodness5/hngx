// DraggableImage.js
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useTheme } from "next-themes";

const DraggableImage = ({ id, index, image, onTagEdit, onMemoryEdit }) => {
    const { theme, setTheme } = useTheme('dark');
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleAddTag = () => {
    const updatedTag = prompt("Add Tag:");
    if (updatedTag) {
      onTagEdit(image.id, undefined, updatedTag);
    }
  };

  const [isImageError, setIsImageError] = useState(false);

  const handleImageError = () => {
    setIsImageError(true);
  };

  const handleMemoryEdit = () => {
    const updatedMemory = prompt("Edit Memory:", image.memory);
    if (updatedMemory) {
      onMemoryEdit(image.id, updatedMemory);
    }
  };

  return (
    <div   className={`flex flex-col gap-4 items-center justify-center align-middle p-4 rounded-lg shadow-2xl ${
        theme === "dark" ? "bg-gray-800" : ""
      }`} >
      {/* {(provided, snapshot) => ( */}
        <div
          
        
        >
          <img
            src={
              isImageLoading || isImageError
                ? "/noimage.svg"
                : image.download_url
            }
            alt={image.author}
            draggable
            className="w-[100%] h-[16em] object-cover rounded-lg"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          <div className="tags flex flex-col justify-between w-full gap-2">
            <div className="flex-wrap flex">
              {image.tags.map((tag, tagIndex) => (
                <div
                  key={tag}
                  className={`tag rounded-md px-2 py-1 bg-gradient-to-r from-${
                    theme === "dark" ? "blue-600" : "green-500"
                  } to-${theme === "dark" ? "purple-600" : "yellow-400"}`}
                  onClick={() => handleTagEdit(tagIndex)}
                >
                  {tag}
                </div>
              ))}
            </div>
            <div className="tag-input flex items-end justify-end w-full">
              <button
                onClick={handleAddTag}
                className={`${
                  theme === "dark" ? "bg-blue-600" : "bg-green-500"
                } text-white justify-end flex float-right w-fit rounded py-1 px-2 shadow-md`}
              >
                Add Tag
              </button>
            </div>
          </div>

          <div
            className={`memory font-mono font-semibold text-${
              theme === "dark" ? "white" : "black"
            }`}
            onDoubleClick={handleMemoryEdit}
          >
            {image.memory}
          </div>
        </div>
    {/* //   )} */}
    </div>
  );
};

export default DraggableImage;
