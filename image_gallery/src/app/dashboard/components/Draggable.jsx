import React, { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';

import { useTheme } from 'next-themes';

const DraggableImage = ({ image, onTagEdit, onMemoryEdit, id, onDrop, index }) => {
  const ref = React.useRef(null);
  const { theme, setTheme } = useTheme();

  const [, drop] = useDrop({
    accept: {
        'image/*': ['.jpeg', '.jpg', '.png', 'svg'],
       },
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

    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging()
      };
    }
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const [newTag, setNewTag] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);

  const handleMemoryEdit = () => {
    const updatedMemory = prompt('Edit Memory:', image.memory);
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
    const updatedTag = prompt('Add Tag:');
    if (updatedTag) {
      onTagEdit(image.id, undefined, updatedTag);
    }
  };

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={`flex flex-col gap-4 items-center justify-center align-middle p-4 rounded-lg shadow-lg bg-${theme === 'dark' ? 'gray-800' : 'white'}`}
    >

        {/* 
        
        alt image src='/noimage.svg'

         */}
       <img
        src={isImageLoading || isImageError ? '/noimage.svg' : image.download_url}
        alt={image.author}
        draggable
        className='w-[100%] h-[16em] object-cover rounded-lg'
        onLoad={handleImageLoad}
        onError={handleImageError} // Handle error to show placeholder in case of error
      />
      <div className="tags flex flex-wrap justify-between w-full items-center gap-2">
        {image.tags.map((tag, tagIndex) => (
          <div key={tag} className={`tag rounded-md px-2 py-1 text-white bg-gradient-to-r from-${theme === 'dark' ? 'blue-600' : 'green-500'} to-${theme === 'dark' ? 'purple-600' : 'yellow-400'}`} onClick={() => handleTagEdit(tagIndex)}>
            {tag}
          </div>
        ))}
        <div className="tag-input">
          <button onClick={handleAddTag} className={`${theme === 'dark' ? 'bg-blue-600' : 'bg-green-500'} text-white flex-grow rounded py-1 px-2 shadow-md`}>
            Add Tag
          </button>
        </div>
      </div>
      <div className={`memory text-${theme === 'dark' ? 'white' : 'black'}`} onDoubleClick={handleMemoryEdit}>
        {image.memory}
      </div>
    </div>
  );
};

export default DraggableImage;
