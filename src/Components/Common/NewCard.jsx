const NewsCard = ({ image, title, description, link }) => {
  return (
    <div className="w-full">
      <div className="bg-white shadow-md rounded-md overflow-hidden transition-transform duration-300 hover:scale-105">
        <div className="w-full aspect-[16/9]">
          <img className="w-full h-full object-cover" src={image} alt={title} />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {description}
          </p>
          <a
            href={link}
            className="text-accent font-semibold mt-3 inline-block transition-colors duration-300 hover:text-accent-dark"
          >
            Đọc thêm →
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
