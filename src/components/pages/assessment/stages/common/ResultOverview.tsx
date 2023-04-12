export const ResultOverview = ({
  selectedValue,
  colorCode,
}: {
  selectedValue: number | undefined
  colorCode?: "primary" | "warning" | "secondary" | "info"
}) => {
  return (
    <div className="d-flex align-items-center position-relative py-2 flex-grow-1">
      <div
        className="progress flex-grow-1"
        style={{
          height: 8,
          minWidth: 200,
        }}
      >
        <div
          className={"progress-bar bg-" + (colorCode ?? "primary")}
          role="progressbar"
          aria-valuenow={selectedValue}
          aria-valuemin={0}
          aria-valuemax={6}
          style={{
            width: `${((selectedValue || 0) / 6.0) * 100}%`,
          }}
        />
      </div>
      <div
        className={
          "d-flex align-items-center justify-content-center position-absolute rounded-pill bg-" +
          (colorCode ?? "primary") +
          (!!selectedValue || selectedValue === 0 ? " opacity-1" : " opacity-0")
        }
        style={{
          width: 24,
          height: 24,
          marginLeft: -12,
          left: `${((selectedValue || 0) / 6.0) * 100}%`,
          transition: "left .6s ease",
        }}
      >
        <span className="fs-5 fw-normal text-white">{(selectedValue || 0) + 1}</span>
      </div>
    </div>
  )
}
