import React, { useState } from 'react';

function ImageUpload() {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
          if (imageData.data[i] === 255 && imageData.data[i + 1] === 255 && imageData.data[i + 2] === 255) {
            imageData.data[i] = 0;
            imageData.data[i + 1] = 0;
            imageData.data[i + 2] = 255;
          }
        }
        ctx.putImageData(imageData, 0, 0);
        const modifiedImage = canvas.toDataURL('image/jpeg');
        setImage(modifiedImage);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded and modified" />}
    </div>
  );
}

export default ImageUpload;
