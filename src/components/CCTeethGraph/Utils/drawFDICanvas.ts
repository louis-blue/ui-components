import { CCTeethGraphProps } from "../CCTeethGraph";

interface CCTeethGraphDrawProps extends CCTeethGraphProps {
  canvas: HTMLCanvasElement;
}

const drawFDICanvas = (props: CCTeethGraphDrawProps): void => {
  const {
    canvas,
    foreground = "rgba(255, 255, 255, 1)",
    background = "rgba(0, 0, 0, 0)",
    numbers,
    missings
  }: CCTeethGraphDrawProps = props;
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
  const width: number = 480;
  const height: number = 120;
  const ts: number = width / 16;
  let configs: Array<Array<number>> = [];

  if (!ctx) {
    return;
  }
  for (let i: number = 0; i < 4; i++) {
    configs[i] = [];
    for (let j: number = 0; j < 8; j++) {
      configs[i][j] = 0;
    }
  }

  ctx.beginPath();
  ctx.clearRect(0, 0, width, height);

  ctx.save();
  ctx.scale(canvas.width / width, canvas.height / height);

  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = foreground;
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.stroke();
};

export default drawFDICanvas;
