export const Loaders = ({ svgPaths }: { svgPaths: string[] }) => {
  return (
    <div className="loader-container">
      {svgPaths.map((svgPath, index) => {
        return (
          <div className="animate-scale-up loader-icon" key={index}>
            <svg className="h-12 w-12 md:h-20 md:w-20" viewBox="0 0 20 20">
              <use
                href={svgPath}
                style={{ stroke: "#8baa36", fill: "transparent" }}
              ></use>
            </svg>
          </div>
        );
      })}
    </div>
  );
};

export function Loader() {
  const svgPaths = [
    "/icons/symbols.svg#icon-cake",
    "/icons/symbols.svg#icon-milk",
    "/icons/symbols.svg#icon-salad",
    "/icons/symbols.svg#icon-sandwich",
    "/icons/symbols.svg#icon-bread",
  ];

  return (
    <div className="flex justify-center items-center w-full h-500px">
      <Loaders svgPaths={svgPaths} />
    </div>
  );
}
