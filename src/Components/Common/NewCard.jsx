const NewsCard = ({ image, title, description, link }) => {
  return (
    <div className="w-full">
      <div className="max-w-full min-h-96 bg-white shadow-md rounded-sm overflow-hidden flex flex-col">
        <img className="w-full h-62 object-cover" src={image} alt={title} />
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{title}</h3>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {description}
          </p>
          <a
            href={link}
            className="text-accent font-semibold mt-3 inline-block"
          >
            Đọc thêm →
          </a>
        </div>
      </div>
    </div>
  );
};
export default NewsCard;
