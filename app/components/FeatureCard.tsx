interface FeatureCardProps {
  title: string;
  description: string;
}

export const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <article className="font-sans w-120 bg-white p-10 rounded-4xl shadow-lg">
      <h2 className="text-[40px] text-black font-bold">{title}</h2>
      <hr className="bg-primary h-1" />
      <p className="text-black text-[20px]">{description}</p>
    </article>
  );
};
