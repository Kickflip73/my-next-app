import CourseCard from '../components/CourseCard';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  progress?: number;
}

async function getAllCourses() {
  const res = await fetch('http://localhost:3000/api/courses', {
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('获取课程数据失败');
  }
  return res.json() as Promise<Course[]>;
}

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">全部课程</h1>
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            placeholder="搜索课程..."
            className="flex-1 max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">所有分类</option>
            <option value="ai">人工智能</option>
            <option value="programming">编程开发</option>
            <option value="data">数据科学</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
} 