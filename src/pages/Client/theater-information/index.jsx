import React from "react";
import ContentDetail from "../../../Components/Common/ContentDetail";
import { useBrancheContext } from "./../../../Contexts/branche/UseBrancheContext";

const TheaterInformation = () => {
  const { cinema } = useBrancheContext();
  console.log(cinema);
  return (
    <>
      <ContentDetail
        content={{
          ...cinema,
          image: "/images/theater.jpg",
          name: `Rạp chiếu phim Beecinema ${cinema.name}`,
          hotline: "0123456789",
          contactInfo: `<section class="bg-gray-100">
    <div class="max-w-full mx-auto bg-white ">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">🎬 Liên Hệ</h2>

        <div class="space-y-3">
            <p class="text-gray-700"><strong>📍 Địa chỉ:</strong>${cinema.address}</p>
            <p class="text-gray-700">
                <strong>📞 Hotline:</strong> 
                <a href="tel:19001234" class="text-blue-600 hover:underline">1900 1234</a>
            </p>
            <p class="text-gray-700">
                <strong>✉ Email:</strong> 
                <a href="mailto:hotro@galaxy.vn" class="text-blue-600 hover:underline">hotro@galaxy.vn</a>
            </p>
            <p class="text-gray-700">
                <strong>🌐 Website:</strong> 
                <a href="https://www.galaxycine.vn" target="_blank" class="text-blue-600 hover:underline">
                    www.galaxycine.vn
                </a>
            </p>
            <p class="text-gray-700"><strong>🕒 Giờ mở cửa:</strong> 08:00 - 23:00</p>
        </div>

        <div class="mt-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">🔗 Kết nối với chúng tôi:</h3>
            <div class="flex space-x-4">
                <a href="https://www.facebook.com/galaxycine" target="_blank"
                    class="text-blue-600 hover:underline">Facebook</a>
                <a href="https://www.instagram.com/galaxycine" target="_blank"
                    class="text-pink-600 hover:underline">Instagram</a>
                <a href="https://zalo.me/galaxycine" target="_blank"
                    class="text-green-600 hover:underline">Zalo</a>
            </div>
        </div>

        <div class="mt-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">📍 Bản đồ</h3>
            <div class="rounded-lg overflow-hidden shadow-lg">
                <iframe class="w-full h-64 sm:h-80"
                   <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5232631206477!2d105.77231507448047!3d21.01173898836439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313453209305f15b%3A0xef45eb492b0d2577!2zQmV0YSBDaW5lbWFzIE3hu7kgxJDDrG5o!5e0!3m2!1svi!2s!4v1740225748719!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                    width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy">
                </iframe>
            </div>
        </div>
    </div>
</section>
`,
        }}
      />
    </>
  );
};

export default TheaterInformation;
