interface FeatureCardProps {
  title: string;
  description: string;
}

export const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <article className="font-sans w-full md:flex-1 max-w-140 bg-white p-5 sm:p-8 md:p-10 rounded-3xl sm:rounded-4xl shadow-lg flex flex-col">
      <h2 className="text-2xl sm:text-3xl lg:text-[40px] text-black font-bold">
        {title}
      </h2>
      <hr className="bg-primary h-1 my-3" />
      <p className="text-black text-sm sm:text-base lg:text-[20px]">
        {description}
      </p>
    </article>
  );
};
