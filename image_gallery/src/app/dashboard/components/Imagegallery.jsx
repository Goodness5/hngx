import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {Images} from './images'
import DraggableImage from './Draggable'
import { useTheme } from "next-themes";
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';



function ImageGallery() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
      clearTimeout(delay);
    }, 3000);
  }, []);

  const [galleryImages, setGalleryImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme('dark');

  useEffect(() => {
    setGalleryImages(
      Images.map((image) => ({ ...image, tags: image.tags, memory: image.memory }))
    );
  }, []);

  const handleFileUpload = (acceptedFiles) => {
    setGalleryImages((prevImages) => {
      const newImages = acceptedFiles.map((file) => ({
        id: `${prevImages.length + 1}`,  // Use prevImages.length to generate a unique ID
        download_url: URL.createObjectURL(file),
        author: 'User Uploaded',
        tags: [`userimage${prevImages.length + 1}`], // Ensure tags have unique names
        memory: 'uploaded image',
      }));
  
      console.log(newImages);
  
      return [...prevImages, ...newImages]; // Return the updated state
    });
  };
  

  const handleTagEdit = (imageId, index, updatedTag) => {
    const updatedImages = galleryImages.map((image) => {
      if (image.id === imageId) {
        const updatedTags = [...image.tags];
        if (index !== undefined) {
          updatedTags[index] = updatedTag;
        } else {
          updatedTags.push(updatedTag);
        }
        return { ...image, tags: updatedTags };
      }
      return image;
    });
    setGalleryImages(updatedImages);
  };

  const handleMemoryEdit = (imageId, updatedMemory) => {
    const updatedImages = galleryImages.map((image) => {
      if (image.id === imageId) {
        return { ...image, memory: updatedMemory };
      }
      return image;
    });
    setGalleryImages(updatedImages);
  };



  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    console.log(result)
    const items = Array.from(galleryImages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setGalleryImages(items);
  };
  

  const onDrop = React.useCallback((dragIndex, hoverIndex) => {
    console.log(dragIndex)
    setGalleryImages((prevCards) => {
      const clonedCards = [...prevCards];
      const removedItem = clonedCards.splice(dragIndex, 1)[0];
      clonedCards.splice(hoverIndex, 0, removedItem);
      return clonedCards;
    });
  }, []);


  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileUpload,
    accept: {
        'image/*': ['.jpeg', '.jpg', '.png', 'svg'],
       },
  });

  return (
    <>
      <div>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <>

            
            
            <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className={`container mx-auto p-8 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-[#e4ffeb15]'}`}>

            <div {...getRootProps()} className="shadow-lg p-3 h-full flex-col flex items-center justify-center mb-8 py-16 border-dashed border-2 border-gray-300">
          <input {...getInputProps()} />
          <p className="flex-wrap">Add your image here</p>
          <p>Drag & drop an image here, or click to select one</p>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by tag"
          className="p-2 border bg-transparent sm:w-[40%] border-[#808080] rounded-md mb-4"
        />

        <div className="mt-4 w-full font-semibold text-lg mb-8 text-center">Hold down an image and drag to your desired position</div>
              <Droppable droppableId="galleryImages">
                {(provided) => (
                  <motion.div
                  
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                    className="grid w-full sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                      {galleryImages
                .filter((image) =>
                  image ? image.tags
                    ? image.tags.some((tag) =>
                        tag.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                    : "" : ""
                )
                .map((image, index) => (
                      <Draggable
                        key={image.id}
                        draggableId={`${image.id}`}
                        index={index}
                        
                      >
                        {(provided) => (
                          <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          className=" galleryImages"
                          >
                             <DraggableImage
                    
                    id={image.id}
                    index={index}
                    image={image}
                    onTagEdit={handleTagEdit}
                    onMemoryEdit={handleMemoryEdit}
                  />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </motion.div>
                )}
              </Droppable>
              </div>
            </DragDropContext>
          </>
        )}
      </div>
    </>
  );
}

export default ImageGallery;