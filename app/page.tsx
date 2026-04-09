export default function Home() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center flex flex-col"
      style={{
        backgroundImage: "url('/chica.svg')",
      }}
    >
      <div className="flex flex-col gap-5 px-45 py-35">
        <div className="font-sans text-5xl w-100">
          De ahora en adelante, hacés más con tu dinero
        </div>

        <div className="font-sans font-normal text-4xl text-[#C1FD35]">
          Tu nueva <b>billetera virtual</b>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-60 bg-[#c1fd35] z-0 rounded-t-[50px]"></div>

      <div className="flex flex-row gap-2 justify-center relative z-10">
        <div className="font-sans w-120 bg-white p-10 rounded-4xl shadow-lg ">
          <h1 className="text-[40px] text-black font-bold">Transferí dinero</h1>
          <hr className="bg-[#C1FD35] h-1" />
          <p className="text-black text-[20px]">
            Desde Digital Money House vas a poder transferir dinero a otras
            cuentas, asi como también recibir transferencias y nuclear tu
            capital en nuestra billetera virtual
          </p>
        </div>
        <div className="font-sans w-120 bg-white p-10 rounded-4xl shadow-lg ">
          <h1 className="text-[40px] text-black font-bold">Recibí dinero</h1>
          <hr className="bg-[#C1FD35] h-1" />
          <p className="text-black text-[20px]">
            Desde Digital Money House vas a poder transferir dinero a otras
            cuentas, asi como también recibir transferencias y nuclear tu
            capital en nuestra billetera virtual
          </p>
        </div>
      </div>
    </div>
  );
}
