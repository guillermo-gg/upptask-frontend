import { ColumnT } from "services/board.service";

export const countTotalTasks = (columns: ColumnT[]) => {
  let total = 0;

  columns.forEach(({ tasks }) => {
    tasks.forEach(() => {
      total += 1;
    });
  });

  return total;
};
