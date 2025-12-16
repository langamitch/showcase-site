import { supabase } from "../../lib/supabaseClient";

export default async function HomePage() {
  const { data: sites, error } = await supabase
    .from("sites")
    .select("*")
    .eq("status", "approved");

  if (error) console.log(error);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">GSAP Showcase</h1>
      {sites?.map((site) => (
        
        <div key={site.id} className="mb-4 p-4 border rounded shadow">
            <div className="">
                
            </div>
            <div className=" mt-2">
          <h2 className="text-[16px] max-w-md text-semibold  leading-8 text-zinc-[#0E100F] dark:text-zinc-400">
            {site.title}
          </h2>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {site.tags}
          </p></div>
        </div>
      ))}
    </div>
  );
}
