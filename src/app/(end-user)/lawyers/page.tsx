"use client";

import Lawyer from "../../../common/components/Lawyer.tsx";
import SearchFilterBar from "../../../common/components/SearchFilterBar.tsx";

export default function LawyersPage() {
  // Dummy Lawyers Info for testing:
  const lawyers = [
    {
      id: 1,
      name: "بندر عبد العزيز محمد",
      // imageUrl: '/',
      rating: 4,
      cat: "القانون المدني",
    },
    {
      id: 2,
      name: "سارة القحطاني",
      // imageUrl: '/',
      rating: 5,
      cat: "القانون الجنائي",
    },
    {
      id: 3,
      name: "أحمد بن خالد",
      // imageUrl: '/',
      rating: 3,
      cat: "قانون الأسرة",
    },
    {
      id: 4,
      name: "فاطمة النعيمي",
      // imageUrl: '/',
      rating: 5,
      cat: "قانون العمل",
    },
    {
      id: 5,
      name: "خالد الوليد",
      // imageUrl: '/',
      rating: 2,
      cat: "قانون التجارة",
    },
    {
      id: 6,
      name: "ليلى الغفيلي",
      // imageUrl: '/',
      rating: 4,
      cat: "قانون العقارات",
    },
    {
      id: 7,
      name: "مروان الصالح",
      // imageUrl: '/',
      rating: 5,
      cat: "القانون الدولي",
    },
    {
      id: 8,
      name: "نورة الشمري",
      // imageUrl: '/',
      rating: 3,
      cat: "قانون الملكية الفكرية",
    },
    {
      id: 9,
      name: "عمر فاروق البلوشي",
      // imageUrl: '/',
      rating: 4,
      cat: "قانون الضرائب",
    },
    {
      id: 10,
      name: "هند المطيري",
      // imageUrl: '/',
      rating: 5,
      cat: "قانون البيئة",
    },
  ];

  // TODO For Later: The Pagination Functionality...
  // TODO For Later: The Search and Filter Functionality...
  const handleSearch = (query: string) => console.log("Searching for:", query);

  const handleFilter = (filter: string) =>
    console.log("Filtering with:", filter);

  return (
    <div className="container mx-auto px-4">
      <h1 className="mb-4 text-xl text-text-light lg:text-2xl">محامونا</h1>
      <div className="flex items-center justify-between gap-3 text-text-light">
        <p className="hidden max-w-[50%] text-sm md:text-md lg:block lg:text-lg">
          لدينا محامون على أعلى مستوى من الدقة والكفاءة، يمكنك اختيار ما بين
          المحامين، حسب التخصص الذي تريده
        </p>
        <SearchFilterBar
          onSearch={handleSearch}
          onFilter={handleFilter}
          placeholder={"إبحث عن محاميك"}
          suggestions={lawyers}
        />
      </div>
      <div className="my-8 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {lawyers.map(lawyer => (
          <Lawyer key={lawyer.id} {...lawyer} />
        ))}
      </div>
    </div>
  );
}
