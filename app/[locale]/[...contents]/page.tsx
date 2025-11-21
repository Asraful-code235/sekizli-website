async function  page({params}:any) {
  const {contents} = await params;
  return <div>{contents[0]}</div>;
}

export default page;
