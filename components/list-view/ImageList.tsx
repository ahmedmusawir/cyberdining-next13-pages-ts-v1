import { Photo } from "@/data-layer/restaurant-entities";

interface Props {
  photos: Photo[];
}

const ImageList = ({ photos }: Props) => {
  return (
    <div className="grid grid-cols-1  sm:grid-cols-2 gap-4 w-full mt-5 ">
      {photos.map((photo) => (
        <div key={photo.id} className="relative w-full h-64">
          <img
            src={photo.url}
            alt="Gallery"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageList;
