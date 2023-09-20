import React, { useState, useEffect } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import Images from './images';
import DraggableImage from './Draggable';
import { useTheme } from 'next-themes';

const ImageGallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setGalleryImages(
      Images.map((image) => ({ ...image, tags: image.tags, memory: image.memory }))
    );
    setLoading(false);
  }, []);

  const onDrop = React.useCallback((dragIndex, hoverIndex) => {
    setGalleryImages((prevCards) => {
      const clonedCards = [...prevCards];
      const removedItem = clonedCards.splice(dragIndex, 1)[0];
      clonedCards.splice(hoverIndex, 0, removedItem);
      return clonedCards;
    });
  }, []);

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

  const handleFileUpload = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => ({
      id: Date.now(),
      download_url: URL.createObjectURL(file),
      author: 'User Uploaded',
      tags: ['userimage'],
      memory: 'uploaded image',
    }));

    setGalleryImages((prevImages) => [...prevImages, ...newImages]);
    galleryImages.push(newImages);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileUpload,
    accept: 'image/*',
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`container mx-auto p-8 ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
        <div {...getRootProps()} className="border-dashed border-2 border-gray-300 p-8 text-center mb-8">
          <input {...getInputProps()} />
          <p>Drag & drop an image here, or click to select one</p>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by tag"
          className="p-2 border bg-transparent w-[40%] border-gray-300 rounded-md mb-4"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages
            .filter((image) =>
              image.tags
                ? image.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
                : ''
            )
            .map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`p-4 flex h-full rounded shadow ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'}`}>
                  <DraggableImage
                    image={image}
                    index={index}
                    onTagEdit={handleTagEdit}
                    onMemoryEdit={handleMemoryEdit}
                    onDrop={onDrop}
                  />
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default ImageGallery;
