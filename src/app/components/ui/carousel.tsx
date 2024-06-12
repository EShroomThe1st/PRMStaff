import { Carousel } from "antd";

const images = [
  "https://firebasestorage.googleapis.com/v0/b/class-project-08.appspot.com/o/pngwing.com%20(3).png?alt=media&token=6da37f92-7051-4a14-92cc-89b9b3c460ea",
  "https://firebasestorage.googleapis.com/v0/b/class-project-08.appspot.com/o/b137e651448b657c21a2b8a881aaffdb.png?alt=media&token=cd56b175-2a4d-476f-9520-389cf812163c",
  "https://firebasestorage.googleapis.com/v0/b/class-project-08.appspot.com/o/Illustration-PNG.png?alt=media&token=d23b8f07-36f2-4440-b5f5-bdbe914f6b88",
];

const MyCarousel = () => {
  return (
    <Carousel autoplay dots={false}>
      {images.map((imageUrl, index) => (
        <div key={index} className="h-screen">
          <img
            src={imageUrl}
            alt={`Image ${index + 1}`}
            className="mx-auto h-full object-cover"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default MyCarousel;