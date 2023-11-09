import PropTypes from "prop-types";

function AsideTopContainer({ component }) {
  return (
    <div className="border rounded h-50" style={{ maxHeight: "45vh" }}>
      {component}
    </div>
  );
}

AsideTopContainer.propTypes = {
  component: PropTypes.any,
};

export default AsideTopContainer;
