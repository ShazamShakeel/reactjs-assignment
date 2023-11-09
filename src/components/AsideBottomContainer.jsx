import PropTypes from "prop-types";

function AsideBottomContainer({ component }) {
  return (
    <div className="border rounded h-50" style={{ maxHeight: "45vh" }}>
      {component}
    </div>
  );
}

AsideBottomContainer.propTypes = {
  component: PropTypes.any,
};

export default AsideBottomContainer;
