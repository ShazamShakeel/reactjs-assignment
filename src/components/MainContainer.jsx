import PropTypes from "prop-types";

function MainContainer({ component }) {
  return <div className="h-100 border rounded mx-3">{component}</div>;
}

MainContainer.propTypes = {
  component: PropTypes.any,
};

export default MainContainer;
