const row = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const SEATS_PER_ROW = 12; // Number of seats per row

export const getEmptySeatArray = () => {
  const seats = [];
  let rowIndex = 1;

  /**
   * Add the seat id with the format "LetterNumber (i.e: A5, B8, ..., H12, J10)"
   *
   */
  function seatGenerator(rowSize, rowLetter) {
    while (rowIndex <= rowSize) {
      seats.push(rowLetter + rowIndex);
      rowIndex += 1;
    }
    rowIndex = 1;
  }

  row.map((row) => {
    seatGenerator(SEATS_PER_ROW, row);
  });

  const results = seats.map((seat, idx) => {
    return { seat, chosen: false, id: idx + 1 };
  });

  return results;
};
