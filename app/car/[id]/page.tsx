// app/car/[id]/page.tsx

import axios from 'axios';
import { FaWheelchair } from 'react-icons/fa';

interface CarDetails {
  mispar_rechev: string;
  tozeret_cd: string;
  sug_degem: string;
  tozeret_nm: string;
  degem_cd: string;
  degem_nm: string;
  ramat_gimur: string;
  ramat_eivzur_betihuty: string;
  kvutzat_zihum: string;
  shnat_yitzur: string;
  degem_manoa: string;
  mivchan_acharon_dt: string;
  tokef_dt: string;	
  baalut: string;
  misgeret: string;
  tzeva_cd: string;
  tzeva_rechev: string;
  zmig_kidmi: string;
  zmig_ahori: string;
  sug_delek_nm: string;
  horaat_rishum: string;
  moed_aliya_lakvish: string;
  kinuy_mishari: string;
}

async function fetchCarDetails(id: string): Promise<CarDetails | null> {
  try {
    const response = await axios.post('https://data.gov.il/api/3/action/datastore_search', {
        resource_id: '053cea08-09bc-40ec-8f7a-156f0677aff3',
        filters: { "mispar_rechev": id },
    });
    return response.data.result.records[0] || null;
  } catch (error) {
    console.error('Error fetching car details:', error);
    return null;
  }
}

async function checkDisabledRegistry(id: string): Promise<boolean> {
  try {
    const response = await axios.post('https://data.gov.il/api/3/action/datastore_search', {
      resource_id: 'c8b9f9c8-4612-4068-934f-d4acd2e3c06e',
      filters: { "MISPAR RECHEV": id },
    });
    return response.data.result.records.length > 0;
  } catch (error) {
    console.error('Error checking disabled vehicle registry:', error);
    return false;
  }
}

interface CarPageProps {
  params: { id: string };
}

export default async function CarPage({ params, searchParams }: { params: { id: string }, searchParams: { page?: string, search?: string } }) {
    const carDetails = await fetchCarDetails(params.id);
    const isDisabledVehicle = await checkDisabledRegistry(params.id);
    const currentPage = searchParams.page || '1';
    const searchTerm = searchParams.search || '';


  if (!carDetails) {
    return <p>Car details not found.</p>;
  }

  return (
    <div className="container mx-auto p-4 text-right">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">פרטי רכב</h1>
      <div className="bg-gray-100 p-4 rounded-lg shadow flex flex-row gap-10">
     
            <div>
        <p><strong>מספר רכב: </strong> {carDetails.mispar_rechev}</p>
        <p><strong>יצרן: </strong> {carDetails.tozeret_nm}</p>
        <p>{carDetails.kinuy_mishari} <strong>:כינוי מסחרי</strong></p>
        <p><strong>שנת יצור: </strong> {carDetails.shnat_yitzur}</p>
        <p><strong>צבע רכב: </strong> {carDetails.tzeva_rechev}</p>
        <p><strong>סוג דלק: </strong>{carDetails.sug_delek_nm}</p>
        <p>{carDetails.ramat_gimur} <strong>:רמת גימור</strong></p>
        <p>{carDetails.degem_nm} <strong>:מספר דגם</strong></p>
        <p>{carDetails.degem_cd} <strong>:קוד דגם</strong></p>
        <p>{carDetails.tozeret_cd} <strong>:קוד תוצר</strong></p>
        <p>{carDetails.ramat_eivzur_betihuty} <strong>:רמת אבזור בטיחותי</strong></p>
        </div>
        <div>
        <p>{carDetails.kvutzat_zihum} <strong>:קבוצת זיהום</strong></p>
        <p>{carDetails.degem_manoa} <strong>:דגם מנוע</strong></p>
        <p>{carDetails.mivchan_acharon_dt.split('-').reverse().join('/')} <strong>:מבחן שנתי אחרון</strong></p>
        <p>{carDetails.tokef_dt.split('-').reverse().join('/')} <strong>:תוקף רישוי</strong></p>
        <p><strong>בעלות: </strong>{carDetails.baalut}</p>
        <p>{carDetails.misgeret} <strong>:מספר שלדה</strong></p>
        <p>{carDetails.tzeva_cd} <strong>:קוד צבע</strong></p>
        <p>{carDetails.zmig_kidmi} <strong>:צמיג קדמי</strong></p>
        <p>{carDetails.zmig_ahori} <strong>:צמיג אחורי</strong></p>
        <p>{carDetails.horaat_rishum} <strong>:הוראת רישום</strong></p>
        <p>{carDetails.moed_aliya_lakvish ? carDetails.moed_aliya_lakvish.split('-').reverse().join('/') : ''} 
  <strong>:מועד עלייה לכביש</strong>
</p>
        </div>
      

      </div>
      {isDisabledVehicle && (
  <div className="flex items-center text-red-500 font-bold mt-4">
  <FaWheelchair className="w-5 h-5 ml-2" />  <p>רכב זה מופיע במאגר רכבי נכים</p>
    
  </div>
)}
          {/* Back to Table Button */}
          <a
          href={`/?search=${searchTerm}&page=${currentPage}`}
          className="mt-4 inline-block bg-blue-500 text-white p-2 rounded"
      >
        חזרה לטבלה
      </a>
    </div>
  );
}
