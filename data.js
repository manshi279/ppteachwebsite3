/*
  Laptop videos and photos shown in the two 3D carousels.

  HOW TO ADD YOUR OWN:
  1. Copy your photos into assets/images/ and your videos into assets/videos/.
  2. Change the file names and titles below to match. Keep brand as "HP", "Lenovo" or "Dell"
     (the brand filter buttons use it).
  3. For each video, "poster" is the picture shown until the video loads.

  The .svg pictures here are only placeholders. Replace them with real photos (jpg/png/webp).
*/
window.PPTECH_DATA = {
  videos: [
    { brand: "HP",     title: "HP laptop [Model name]",     video: "assets/videos/hp-1.mp4",     poster: "assets/images/hp-1.svg" },
    { brand: "Lenovo", title: "Lenovo laptop [Model name]", video: "assets/videos/lenovo-1.mp4", poster: "assets/images/lenovo-1.svg" },
    { brand: "Dell",   title: "Dell laptop [Model name]",   video: "assets/videos/dell-1.mp4",   poster: "assets/images/dell-1.svg" },
    { brand: "HP",     title: "HP laptop [Model name]",     video: "assets/videos/hp-2.mp4",     poster: "assets/images/hp-2.svg" },
    { brand: "Lenovo", title: "Lenovo laptop [Model name]", video: "assets/videos/lenovo-2.mp4", poster: "assets/images/lenovo-2.svg" },
    { brand: "Dell",   title: "Dell laptop [Model name]",   video: "assets/videos/dell-2.mp4",   poster: "assets/images/dell-2.svg" }
  ],
  images: [
    { brand: "HP",     title: "HP laptop [Model name]",     src: "assets/images/hp-1.svg",     alt: "HP second hand laptop" },
    { brand: "Lenovo", title: "Lenovo laptop [Model name]", src: "assets/images/lenovo-1.svg", alt: "Lenovo second hand laptop" },
    { brand: "Dell",   title: "Dell laptop [Model name]",   src: "assets/images/dell-1.svg",   alt: "Dell second hand laptop" },
    { brand: "HP",     title: "HP laptop [Model name]",     src: "assets/images/hp-2.svg",     alt: "HP second hand laptop" },
    { brand: "Lenovo", title: "Lenovo laptop [Model name]", src: "assets/images/lenovo-2.svg", alt: "Lenovo second hand laptop" },
    { brand: "Dell",   title: "Dell laptop [Model name]",   src: "assets/images/dell-2.svg",   alt: "Dell second hand laptop" }
  ]
};
