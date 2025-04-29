import ReactCanvasConfetti from "react-canvas-confetti"

interface ConfettiProps {
  style?: React.CSSProperties;
}

export const ConfettiExplosion = ({style}: ConfettiProps) => {

  return (
    <ReactCanvasConfetti
      style={{
        position: "fixed",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 999,
        ...style,
      }}
    />
  )
}
