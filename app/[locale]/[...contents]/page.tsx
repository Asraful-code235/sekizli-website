import Breadcrumb from "@/components/ui/Breadcrumb";

async function  page({params}:any) {
  const {contents} = await params;
  return (
    <div className='space-y-6'>
      <Breadcrumb title={contents}/>
      {contents[0]}
    </div>
  );
}

export default page;
