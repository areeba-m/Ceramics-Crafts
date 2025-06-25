import React from "react";
import { Card } from "antd";
import { motion } from "framer-motion";

const wallArtData = [
  {
    title: "Elegant Wall Art",
    subtitle: "A glimpse of our exclusive handcrafted wall decor.",
    image: "https://imgs.search.brave.com/L3ACqErYsmq7yWlfqNNJKiHdnF3zr6qD-IDlX0Vzbpc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFNTVd4Qld6SUwu/anBn", // Replace with actual path
  },
  {
    title: "Boho Chic Vibes",
    subtitle: "Textured hangings bringing nature indoors.",
    image: "https://imgs.search.brave.com/qWtkq64yzYkyDEr7-Jt-3RID_-2HkiIKqKgm96IEOOI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9teWdy/ZWF0Y2FudmFzLmNv/bS9jZG4vc2hvcC9m/aWxlcy9Cb2hvLVdh/bGwtQXJ0LUNhbnZh/cy1QcmludC1TZXQt/TWlkLUNlbnR1cnkt/UHJpbnRzLUJvaGVt/aWFuLVdhbGwtQXJ0/d29yay1QcmludHMt/Qm9oby1OZXV0cmFs/LUNvbG9yZnVsLUJv/aG8tV2FsbC1BcnQt/Q2FudmFzLTI3Njc4/LU1HVi1DVi02MFgz/MC0zUC0xMC5qcGc_/dj0xNzQ3MjM0NDAy/JndpZHRoPTE0MDA", // Replace with actual path
  },
  {
    title: "Boho Chic Vibes",
    subtitle: "Textured hangings bringing nature indoors.",
    image: "https://imgs.search.brave.com/4uS2Vkf2Mxh5MctKj-jyYkTUGdwLrxbU35H-7-qToJs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzg1Lzdi/L2RjLzg1N2JkY2Qy/YTQ3ZDY4NDI0OTUx/ZmI3N2M4NDFlOTQ0/LmpwZw", // Replace with actual path
  },
   {
    title: "Boho Chic Vibes",
    subtitle: "Textured hangings bringing nature indoors.",
    image: "https://imgs.search.brave.com/H-Ub2Vjgur6WOZdIXrqh2Tk0ZCtlzwpZCpobNyABCv8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzEwMjM0OTc5L2Mv/MTIyMC85NzAvNDU4/LzI1NS9pbC83MWUx/OTYvMzUzNDc1Mjg5/Mi9pbF8zNDB4Mjcw/LjM1MzQ3NTI4OTJf/MTZsYS5qcGc", // Replace with actual path
  },
];

const WallHanging = () => {
  return (
    <div className="container mx-auto px-10 py-8">
      <h1 className="text-[#A37B73] font-extrabold text-3xl md:text-5xl text-center mb-16">
        Wall Hangings
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        {wallArtData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-xl"
          >
            <div className="bg-[#f1ede5] flex flex-col justify-center items-center p-6 md:w-1/2 text-center">
              <p className="text-sm text-gray-600 mb-2">News</p>
              <h2 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h2>
              <p className="text-md text-gray-600 mt-2">{item.subtitle}</p>
            </div>
            <div className="md:w-1/2">
              <Card
                cover={
                  <img
                    alt={item.title}
                    src={item.image}
                    className="object-cover w-full h-full"
                  />
                }
                bordered={false}
                className="h-full w-full !rounded-none"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WallHanging;
