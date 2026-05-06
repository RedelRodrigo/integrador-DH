import { FeatureCard } from "../components";
import { getFeatures } from "@/lib/services";

// Desactivar cache para que siempre intente conectar a la BD
export const revalidate = 0;

export default async function Home() {
  const features = await getFeatures();
  return (
    <main className="w-full flex flex-col justify-between py-4 sm:py-6 md:py-8 lg:py-10 h-full">
      <header className="flex flex-col gap-4 sm:gap-5 md:gap-6 px-6 sm:px-10 md:px-12 lg:px-16 pt-2 sm:pt-6 md:pt-8 lg:pt-10 max-w-sm sm:max-w-md md:max-w-lg">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl">
          <span className="block lg:inline">De ahora</span>{" "}
          <span className="block lg:inline">en adelante,</span>{" "}
          <span className="block lg:inline">hacés más</span>{" "}
          <span className="block lg:inline">con tu dinero</span>{" "}
        </h1>

        <div className="h-1 w-10 bg-primary sm:hidden" />

        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary">
          Tu nueva <b className="block lg:inline">billetera virtual</b>
        </p>
      </header>

      <section className="z-10 flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center items-center md:items-stretch px-6 sm:px-10 md:px-12 lg:px-16 py-8 sm:py-10 md:py-12 lg:py-16">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </section>
      <div className="absolute bottom-16 h-56 w-full bg-primary rounded-t-[50px]"></div>
    </main>
  );
}
