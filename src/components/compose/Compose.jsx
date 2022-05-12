import PropTypes from "prop-types";

export const Compose = ({ components, children }) => {
  return (
    <>
      {components.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
};

Compose.propTypes = {
  children: PropTypes.node,
  components: PropTypes.arrayOf(PropTypes.elementType),
};

Compose.defaultProps = {
  children: <></>,
  components: [<></>],
};
