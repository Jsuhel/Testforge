/*
 * The TestForge mark: a forward-leaning T breaking out of a tilted orbit,
 * one satellite riding the near side of the ring. White letter, voltage-blue
 * orbit, two flat colors, nothing else, so it stays crisp from favicon to
 * footer and asks nothing of whatever surface carries it.
 */

const RING_CX = 32;
const RING_CY = 33;
const RING_RX = 27;
const RING_RY = 11.5;
const RING_TILT = -24;

/* Satellite: a point on the ring, 25 degrees into the near half. */
const NODE_T = 25 * (Math.PI / 180);
const NODE_X = RING_CX + RING_RX * Math.cos(NODE_T);
const NODE_Y = RING_CY + RING_RY * Math.sin(NODE_T);

export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      {/* far side of the orbit passes behind the letter */}
      <g transform={`rotate(${RING_TILT} ${RING_CX} ${RING_CY})`}>
        <path
          d={`M${RING_CX - RING_RX} ${RING_CY}A${RING_RX} ${RING_RY} 0 0 1 ${
            RING_CX + RING_RX
          } ${RING_CY}`}
          stroke="#405bff"
          strokeWidth="2.6"
          strokeLinecap="round"
          opacity="0.5"
        />
      </g>

      {/* the monogram: slanted crossbar over a stem that tapers to its base */}
      <g transform="translate(4.5 0) skewX(-8)" fill="#ffffff">
        <path d="M13 15h43l-6.5 11h-43z" />
        <path d="M31.5 26h10l-5 26.5h-6z" />
      </g>

      {/* near side of the orbit sweeps in front of the stem */}
      <g transform={`rotate(${RING_TILT} ${RING_CX} ${RING_CY})`}>
        <path
          d={`M${RING_CX - RING_RX} ${RING_CY}A${RING_RX} ${RING_RY} 0 0 0 ${
            RING_CX + RING_RX
          } ${RING_CY}`}
          stroke="#405bff"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx={NODE_X} cy={NODE_Y} r="2.7" fill="#405bff" />
        <circle cx={NODE_X - 0.7} cy={NODE_Y - 0.7} r="0.8" fill="#eaf9ff" />
      </g>
    </svg>
  );
}
