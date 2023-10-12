export const COLORS = {
  RESET: '\x1B[0m',
  RED: '\x1B[31m',
  GREEN: '\x1B[32m',
  GRAY: '\x1B[37m',
};

export const keyMapper = new Map<number, string>([
  [13, '\n'],
  [127, '\b \b'],
]);

export const messages = {
  processExited: (data: string, success?: boolean) => {
    const color = data.match(/code 0$/) || success ? COLORS.GREEN : COLORS.RED;
    return `\n${color}${data}${COLORS.RESET}\n`;
  },
  placeholder: `${COLORS.GRAY}Run program to see output${COLORS.RESET}\n`,
};
