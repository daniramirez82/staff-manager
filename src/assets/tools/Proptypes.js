import PropTypes from 'prop-types';

export const clientPropTypes = PropTypes.shape({
  clientName: PropTypes.string.isRequired,
  nif: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  clientAlias: PropTypes.string.isRequired,
});

export const sitePropTypes = PropTypes.shape({
  id: PropTypes.string,
  client: clientPropTypes.isRequired,
  siteName: PropTypes.string.isRequired,
  type: PropTypes.array,
  homeWorkers: PropTypes.array,
  outsideWorkers: PropTypes.array,

});

export const sitesArrayPropTypes = PropTypes.arrayOf(sitePropTypes);

