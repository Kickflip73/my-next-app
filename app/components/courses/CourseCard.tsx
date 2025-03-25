import Image from 'next/image';
import Link from 'next/link';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  progress?: number;
}

const CourseCard = ({ id, title, description, instructor, thumbnail, progress }: CourseCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">讲师: {instructor}</span>
          {progress !== undefined && (
            <div className="w-20 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
        <Link
          href={`/course/${id}`}
          className="mt-4 block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          查看课程
        </Link>
      </div>
    </div>
  );
};

export default CourseCard; 