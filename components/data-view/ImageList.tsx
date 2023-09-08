const files = [
  {
    id: 1,
    source:
      "https://res.cloudinary.com/dyb0qa58h/image/upload/v1693546209/39483521_awhwaf.webp",
  },
  {
    id: 2,
    source:
      "https://res.cloudinary.com/dyb0qa58h/image/upload/v1693554590/47686066_oy94gm.webp",
  },
  {
    id: 3,
    source:
      "https://res.cloudinary.com/dyb0qa58h/image/upload/v1693549848/54337941_wkvl98.webp",
  },
  {
    id: 4,
    source:
      "https://res.cloudinary.com/dyb0qa58h/image/upload/v1693546210/39483523_wtpocj.webp",
  },
  // More files...
];

const ImageList = () => {
  return (
    <div className="grid grid-cols-1  sm:grid-cols-2 gap-4 w-full mt-5 ">
      {files.map((file) => (
        <div key={file.id} className="relative w-full h-64">
          <img
            src={file.source}
            alt="Gallery"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageList;
