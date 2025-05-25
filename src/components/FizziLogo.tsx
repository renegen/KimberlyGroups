import clsx from "clsx";

export function FizziLogo(props: React.HTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src="/logo.png" // Adjust path as needed
      alt="Kimberly Groups"
      width={150}
      height={170}
      className={clsx("group", props.className)}
    />
  );
}
