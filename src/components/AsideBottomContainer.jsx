import PropTypes from "prop-types";

function AsideBottomContainer({ component }) {
  return (
    <div className="border rounded h-100" style={{ maxHeight: "42vh" }}>
      {component}
    </div>
  );
}

AsideBottomContainer.propTypes = {
  component: PropTypes.any,
};

export default AsideBottomContainer;
