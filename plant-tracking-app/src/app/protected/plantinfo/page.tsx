import PlantCard from "@/components/plants/PlantCard";

export default async function Plants() {
  const response = await fetch("http://localhost:3000/api/houseplants"); //TODO: this is a temp URL
  const plants = await response.json();

  const plantCards = plants.map((plant: { _id: string }) => (
    <PlantCard key={plant._id} plantId={plant._id} />
  ));

  return (
    <div>
      <h1 className="text-3xl mt-4 text-center font-bold mb-6">
        Houseplant Information
      </h1>
      <div className="grid grid-cols-1 gap-4 mx-2 sm:grid-cols-2 lg:grid-cols-3">
        {plantCards}
      </div>
    </div>
  );
}
