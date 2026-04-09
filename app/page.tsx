import { FeatureCard } from "./components";

const FEATURES = [
  {
    title: "Transferí dinero",
    description:
      "Desde Digital Money House vas a poder transferir dinero a otras cuentas, asi como también recibir transferencias y nuclear tu capital en nuestra billetera virtual",
  },
  {
    title: "Recibí dinero",
    description:
      "Desde Digital Money House vas a poder transferir dinero a otras cuentas, asi como también recibir transferencias y nuclear tu capital en nuestra billetera virtual",
  },
] as const;

export default function Home() {
  return (
    <main
      className="h-screen w-full bg-cover bg-center flex flex-col"
      style={{
        backgroundImage: "url('/chica.svg')",
      }}
    >
      <header className="flex flex-col gap-5 px-45 py-35">
        <h1 className="font-sans text-5xl w-100">
          De ahora en adelante, hacés más con tu dinero
        </h1>

        <p className="font-sans font-normal text-4xl text-primary">
          Tu nueva <b>billetera virtual</b>
        </p>
      </header>

      <div className="absolute bottom-0 w-full h-60 bg-primary z-0 rounded-t-[50px]" />

      <section className="flex flex-row gap-2 justify-center relative z-10">
        {FEATURES.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </section>
    </main>
  );
}
