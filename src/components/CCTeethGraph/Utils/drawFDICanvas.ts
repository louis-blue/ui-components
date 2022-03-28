import { TeethGraphDrawProps } from "../types";

const drawFDICanvas = (props: TeethGraphDrawProps): void => {
  const {
    canvas,
    foreground = "rgba(255, 255, 255, 1)",
    background = "rgba(0, 0, 0, 0)",
    numbers = [],
    missings = [],
  } = props;
  const ctx = canvas.getContext("2d");
  const width = 480;
  const height = 120;
  const ts = width / 16;
  const texts = [
    ["1", "2", "3", "4", "5", "6", "7", "8"],
    ["A", "B", "C", "D", "E"],
  ] as const;
  const offsets = [
    [ts * 8 - ts / 2, ts * 0.25, -1],
    [ts * 8 + ts / 2, ts * 0.25, 1],
    [ts * 8 + ts / 2, ts * 2 + ts * 0.25, 1],
    [ts * 8 - ts / 2, ts * 2 + ts * 0.25, -1],
  ] as const;

  let configs = Array.from({ length: 4 }, () =>
    Array.from({ length: 8 }, () => 0)
  );

  if (!ctx) {
    return;
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

  numbers.forEach((number) => {
    const babies = number >= 50;
    const region = Math.floor(((number - 10) % 40) / 10);
    const position = (number % 10) - 1;
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

  missings.forEach((number) => {
    const region: number = Math.floor(((number - 10) % 40) / 10);
    const position: number = (number % 10) - 1;

    try {
      configs[region][position] = 3;
    } catch (e) {
      console.error(e);
    }
  });

  for (let region = 0; region < configs.length; region++) {
    for (let position = 0; position < configs[region].length; position++) {
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
