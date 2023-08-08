import { useState } from 'react';
import PropTypes from 'prop-types';
import SeatSvg from './SeatSvg';

const Seat = ({ updateStyle, index, seat, isSelected }) => {
  const [hover, setHover] = useState(false);

  const handleHover = () => {
    setHover((prev) => !prev);
  };

  const handleClick = () => {
    updateStyle(index);
  };

  return (
    <span
      style={{
        paddingLeft: index % 4 === 0 ? 10 : 0,
        cursor: seat.chosen ? 'not-allowed' : 'pointer',
      }}
    >
      <SeatSvg
        width="2rem"
        onMouseEnter={() => handleHover()}
        onMouseLeave={() => handleHover()}
        onClick={!seat.chosen ? () => handleClick() : null}
        fill={seat.chosen ? '#ff0000' : hover || isSelected(index) ? 'gold' : '#2f80ed'}
      />
    </span>
  );
};

Seat.propTypes = {
  seat: PropTypes.object.isRequired,
  updateStyle: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.func.isRequired,
};

export default Seat;
