import axios from 'axios';
import { Suspense } from 'react';
import TableRows from './table/page';

interface Car {
  mispar_rechev: string;
  tozeret_nm: string;
  kinuy_mishari: string;
  shnat_yitzur: number;
  tzeva_rechev: string;
  sug_delek_nm: string;
}

interface CarsDataResponse {
  records: Car[];
  total: number;
}

async function fetchCarsData(searchTerm: string = '', page: number = 1, color: string = '', year: string = ''): Promise<CarsDataResponse> {
  const offset = (page - 1) * 10;
  
  const filters: any = {  limit: 10, offset };
  if (color) filters['filters'] = { tzeva_rechev: color };
  if (year) filters['filters'] = { ...filters['filters'], shnat_yitzur: year };
  if(searchTerm) filters['filters'] = { ...filters['filters'], mispar_rechev: searchTerm };

  const response = await axios.post('https://data.gov.il/api/3/action/datastore_search', {
    resource_id: '053cea08-09bc-40ec-8f7a-156f0677aff3',
    ...filters

  });

  return { records: response.data.result.records, total: response.data.result.total };
}

export default async function HomePage({ searchParams }: { searchParams: { search?: string; page?: string; color?: string; year?: string } }) {
  const searchTerm = searchParams.search || '';
  const page = parseInt(searchParams.page || '1', 10);
  const color = searchParams.color || '';
  const year = searchParams.year || '';

  // Fetch data on the server side
  const { records: data, total } = await fetchCarsData(searchTerm, page, color, year);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-right">רישום רכבים</h1>

      {/* Search Fields */}
      <form action="/" method="get" className="flex flex-col md:flex-row-reverse mb-4">
        <input
          type="text"
          name="search"
          defaultValue={searchTerm}
          placeholder="חפש לפי מספר רכב"
          className="border p-2 flex-grow text-right rounded mb-2 md:mb-0"
        />
        <input
          type="text"
          name="color"
          defaultValue={color}
          placeholder="חפש לפי צבע"
          className="border p-2 flex-grow text-right rounded mb-2 mr-2 md:mb-0"
        />
        <input
          type="text"
          name="year"
          defaultValue={year}
          placeholder="חפש לפי שנה"
          className="border p-2 flex-grow text-right rounded mb-2 mr-2 md:mb-0"
        />
        <button type="submit" className="mr-2 p-2 bg-blue-500 text-white rounded">
          חיפוש
        </button>
      </form>

      {searchTerm && (
  <div className="flex justify-end mb-4">
    <a href="/" className="p-2 bg-gray-300 text-black rounded">
      חזרה לעמוד הראשי
    </a>
  </div>
)}

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-max">
          <div className="flex bg-blue-500 text-white rounded">
            {['מספר רכב', 'יצרן', 'מודל', 'שנה', 'צבע', 'סוג דלק'].map((header, index) => (
              <div key={index} className="flex-1 p-4 font-bold text-center">
                {header}
              </div>
            ))}
          </div>

          {/* Table Rows with Suspense */}
          
            <TableRows data={data} currentPage={page} searchTerm={searchTerm} />
          
        </div>
      </div>

      {/* Page Information */}
      <div className="flex justify-center mt-2">
        <p className="text-gray-700">עמוד {page} מתוך {Math.ceil(total / 10)} </p>
      </div>
          
      {/* Total Records */}
      <div className="flex justify-center mt-2">
        <p className="text-gray-700"> רכבים שנמצאו: {total}</p>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-0">
        <a
          href={`/?search=${searchTerm}&color=${color}&year=${year}&page=${page + 1}`}
          className={`p-2 ${page >= total / 10 ? 'bg-gray-200 text-gray-500 rounded' : 'bg-gray-300 rounded'}`}
          style={{ pointerEvents: page >= total / 10 ? 'none' : 'auto', cursor: page >= total / 10 ? 'default' : 'pointer' }}
          aria-disabled={page >= total / 10}
        >
          הבא
        </a>
        <a
          href={`/?search=${searchTerm}&color=${color}&year=${year}&page=${page - 1}`}
          className={`p-2 ${page === 1 ? 'bg-gray-200 text-gray-500 rounded' : 'bg-gray-300 rounded'}`}
          style={{ pointerEvents: page === 1 ? 'none' : 'auto', cursor: page === 1 ? 'default' : 'pointer' }}
          aria-disabled={page === 1}
        >
          הקודם
        </a>
      </div>
    </div>
  );
}
