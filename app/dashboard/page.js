import ButtonLogout from "@/components/ButtonLogout";
import FormNewBoard from "@/components/FormNewBoard";

export default function Dashboard() {
  return (
    <main className="bg-base-200 min-h-screen">
      <section className="bg-base-100">
        <div className="px-5 py-3 flex justify-end max-w-5xl mx-auto">
          <ButtonLogout />
        </div>
      </section>
      <section className="px-5 py-12 max-w-5xl mx-auto">
        <FormNewBoard />
      </section>
    </main>
  );
}
