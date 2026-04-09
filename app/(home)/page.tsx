import { FeatureCard } from "../components";

const FEATURES = [
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
] as const;

export default function Home() {
  return (
    <main className="h-full w-full flex flex-col ">
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

      <div className="mt-auto bg-primary rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] pt-6 sm:pt-8 md:pt-10 pb-8 sm:pb-10 md:pb-12 px-6 sm:px-10 md:px-12 lg:px-16">
        <section className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-6 lg:gap-8 justify-center -mt-8 sm:-mt-12 md:-mt-16">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
