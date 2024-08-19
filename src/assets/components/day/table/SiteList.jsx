import { memo } from 'react';
import SiteRow from './SiteRow';
import { sitesArrayPropTypes } from '../../../tools/Proptypes';

const SiteList = ({ data, day }) => {
  return (
    <div>
      <h2>Lista de Sitios</h2>
      <ul>
        {data.map((item, i) => (
          <li key={item.id}>
            <MemoizedSiteRow
              i={i + 1}
              day={day}
              siteDayId={item.siteDayId}
              client={item.client.clientAlias}
              site={item.siteName}
              types={item.types}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

SiteList.propTypes = {
  data: sitesArrayPropTypes.isRequired,
};

const MemoizedSiteRow = memo(SiteRow, (prevProps, nextProps) => {
  return (
    prevProps.i === nextProps.i &&
    prevProps.day === nextProps.day &&
    prevProps.siteDayId === nextProps.siteDayId &&
    prevProps.client === nextProps.client &&
    prevProps.site === nextProps.site &&
    prevProps.types === nextProps.types
  );
});

export default SiteList;

