const cleanPercentage = (percentage) => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
  const isTooHigh = percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

const Circle = ({ colour, percentage, size }) => {
  const r = Number(size);
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
      strokeWidth={"1rem"}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
    ></circle>
  );
};

const Text = ({ percentage, tittle,fontSize }) => {
  const listItems = tittle.split(" ").map((e, i) => (
    <tspan key={e} fontSize={"0.9rem"} x="0" textAnchor="middle" dy="14">
      {tittle.split(" ")[i] ? tittle.split(" ")[i] : ""}
    </tspan>
  ));
  return (
    <text y="50%" x="50%" transform="translate(100)">
      <tspan fontWeight="bold" fontSize={fontSize?fontSize:"1rem"} x="0" textAnchor="middle">
        {percentage.toFixed(0)}%
      </tspan>
      {listItems}
    </text>
  );
};

const Pie = ({ percentage, colour, tittle, r,fontSize }) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg width={200} height={200} style={{ textAlign: "center" }}>
      <g transform={`rotate(-90 ${"100 100"})`}>
        <Circle colour="lightgrey" size={r} />
        <Circle colour={percentage>90?"blue":percentage>70?"green":"red"} percentage={pct} size={r} />
      </g>
      <Text percentage={pct} tittle={tittle} fontSize={fontSize}/>
    </svg>
  );
};

export default Pie;
