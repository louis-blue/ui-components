import { CCTeethGraphDrawProps } from "../types";

const drawFDICanvas = (props: {
  canvas: HTMLCanvasElement;
  background: string | undefined;
  numbers: Array<number> | undefined;
  foreground: string | undefined;
  missings: Array<number> | undefined;
}): void => {
  const {
    canvas,
    foreground = "rgba(255, 255, 255, 1)",
    background = "rgba(0, 0, 0, 0)",
    numbers = [],
    missings = []
  }: CCTeethGraphDrawProps = props;
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
  const width: number = 480;
  const height: number = 120;
  const ts: number = width / 16;
  let configs: Array<Array<number>> = [];
  const texts: Array<Array<string>> = [
    ["1", "2", "3", "4", "5", "6", "7", "8"],
    ["A", "B", "C", "D", "E"]
  ];
  const offsets: Array<Array<number>> = [
    [ts * 8 - ts / 2, ts * 0.25, -1],
    [ts * 8 + ts / 2, ts * 0.25, 1],
    [ts * 8 + ts / 2, ts * 2 + ts * 0.25, 1],
    [ts * 8 - ts / 2, ts * 2 + ts * 0.25, -1]
  ];

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

  numbers.forEach(number => {
    const babies: boolean = number >= 50;
    const region: number = Math.floor(((number - 10) % 40) / 10);
    const position: number = (number % 10) - 1;
    try {
      if (babies) {
        configs[region][position] = 2;
      } else {
        configs[region][position] = 1;
      }
    } catch (e) {
      console.error(e);
    }
  });

  missings.forEach(number => {
    const region: number = Math.floor(((number - 10) % 40) / 10);
    const position: number = (number % 10) - 1;

    try {
      configs[region][position] = 3;
    } catch (e) {
      console.error(e);
    }
  });

  for (let region: number = 0; region < 4; region++) {
    for (let position: number = 0; position < 8; position++) {
      if (configs[region][position] === 1) {
        ctx.font = `${ts * 1.8}px bold monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = foreground;
        ctx.fillText(
          texts[0][position],
          ts * position * offsets[region][2] + offsets[region][0],
          ts + offsets[region][1]
        );
      } else if (configs[region][position] === 2) {
        ctx.font = `${ts * 1.8}px bold monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = foreground;
        ctx.fillText(
          texts[1][position],
          ts * position * offsets[region][2] + offsets[region][0],
          ts + offsets[region][1]
        );
      } else if (configs[region][position] === 3) {
        ctx.font = `${ts * 1.8}px bold monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = foreground;
        ctx.fillText(
          "x",
          ts * position * offsets[region][2] + offsets[region][0],
          ts + offsets[region][1]
        );
      }
    }
  }

  ctx.restore();
};

export default drawFDICanvas;
