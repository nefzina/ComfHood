import PropTypes from "prop-types";

export default function Alert({ alert }) {
  return (
    <>
      {alert.success?.length && (
        <div className="successAlert">{alert.success}</div>
      )}
      {alert.error?.length && <div className="errorAlert">{alert.error}</div>}
    </>
  );
}

Alert.propTypes = {
  alert: PropTypes.instanceOf({
    success: PropTypes.string,
    error: PropTypes.string,
  }).isRequired,
};
