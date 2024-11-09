import Link from 'next/link';

interface Car {
  mispar_rechev: string;
  tozeret_nm: string;
  kinuy_mishari: string;
  shnat_yitzur: number;
  tzeva_rechev: string;
  sug_delek_nm: string;
}

export default function TableRows({ data, currentPage, searchTerm }: { data: Car[], currentPage: number, searchTerm: string }) {
    return (
    <>
      {data.map((car, rowIndex) => (
        <Link
          key={rowIndex}
          href={`/car/${car.mispar_rechev}?page=${currentPage}&search=${searchTerm}`}
          className="flex border-b cursor-pointer hover:bg-gray-100"
        >
          <div className="flex-1 p-4 text-center">{car.mispar_rechev}</div>
          <div className="flex-1 p-4 text-center">{car.tozeret_nm}</div>
          <div className="flex-1 p-4 text-center">{car.kinuy_mishari}</div>
          <div className="flex-1 p-4 text-center">{car.shnat_yitzur}</div>
          <div className="flex-1 p-4 text-center">{car.tzeva_rechev}</div>
          <div className="flex-1 p-4 text-center">{car.sug_delek_nm}</div>
        </Link>
      ))}
    </>
  );
}
