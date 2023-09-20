import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Images } from "./images";

import { useTheme } from "next-themes";

const DraggableImage = ({
  image,
  onTagEdit,
  onMemoryEdit,
  id,
  onDrop,
  index,
}) => {
  const ref = React.useRef(null);
  const { theme, setTheme } = useTheme("");

  const [, drop] = useDrop({
    accept: "image/*",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onDrop(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: () => {
      return { id, index };
    },
    type: "image/*",
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  drag(drop(ref));

  const handleMemoryEdit = () => {
    const updatedMemory = prompt("Edit Memory:", image.memory);
    if (updatedMemory) {
      onMemoryEdit(image.id, updatedMemory);
    }
  };

  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const [isImageError, setIsImageError] = useState(false);

  const handleImageError = () => {
    setIsImageError(true);
  };

  const handleAddTag = () => {
    const updatedTag = prompt("Add Tag:");
    if (updatedTag) {
      onTagEdit(image.id, undefined, updatedTag);
    }
  };

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={`flex flex-col gap-4 items-center justify-center align-middle p-4 rounded-lg shadow-lg ${
        theme === "dark" ? "bg-gray-800" : "bg-[#08f34b10]"
      }`}
    >
      <img
        src={
          isImageLoading || isImageError ? "/noimage.svg" : image.download_url
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
          {" "}
          
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
        className={`memory font-mono font-semibold text-${theme === "dark" ? "white" : "black"}`}
        onDoubleClick={handleMemoryEdit}
      >
        {image.memory}
      </div>
    </div>
  );
};

export default DraggableImage;
