export const AssessmentNumbers = () => {
  return (
    <div className="position-relative h-48 border-bottom text-muted d-flex flex-wrap">
      <div
        className="d-none d-sm-flex justify-content-between align-items-center top-0 bottom-0 position-absolute minw-200"
        style={{left: 244, right: 56}}
      >
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
      </div>
      <div
        className="d-flex d-sm-none justify-content-between align-items-center top-0 bottom-0 position-absolute minw-200"
        style={{left: 42, right: 56}}
      >
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
      </div>
    </div>
  )
}
