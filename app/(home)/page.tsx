import { FeatureCard } from "../components";

const FALLBACK_FEATURES = [
  {
    title: "Transferí dinero",
    description:
      "Desde Digital Money House vas a poder transferir dinero a otras cuentas, asi como también recibir transferencias y nuclear tu capital en nuestra billetera virtual",
  },
  {
    title: "Pago de servicios",
    description:
      "Pagá mensualmente los servicios en 3 simples clicks. Facil, rápido y conveniente. Olvidate de las facturas en papel",
  },
];

export default async function Home() {
  return (
    <main className="w-full flex flex-col justify-between py-4 sm:py-6 md:py-8 lg:py-10 h-full">
      <header className="flex flex-col  gap-4 sm:gap-5 md:gap-6 px-6 sm:px-10 md:px-12 lg:px-16 pt-2 sm:pt-6 md:pt-8 lg:pt-10 max-w-[20rem] sm:max-w-[24rem] md:max-w-lg lg:max-w-152">
        <h1 className="font-sans text-3xl sm:text-4xl md:text-4xl lg:text-5xl">
          <span className="block lg:inline">De ahora</span>{" "}
          <span className="block lg:inline">en adelante,</span>{" "}
          <span className="block lg:inline">hacés más</span>{" "}
          <span className="block lg:inline">con tu dinero</span>{" "}
        </h1>

        <div className="h-1 w-10 bg-primary sm:hidden" />

        <p className="font-sans font-normal text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary  ">
          Tu nueva{" "}
          <b className="block lg:inline md:inline">billetera virtual </b>
        </p>
      </header>

      <section className="z-10 flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-6 lg:gap-8 justify-center items-center md:items-stretch px-6 sm:px-10 md:px-12 lg:px-16 py-8 sm:py-10 md:py-12 lg:py-16">
        {FALLBACK_FEATURES.map((feature) => (
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
