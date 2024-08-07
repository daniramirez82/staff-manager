import React from 'react';

// eslint-disable-next-line react/prop-types
const SiteList = ({ data }) => {
  return (
    <div>
      <h2>Lista de Sitios</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <strong>Cliente:</strong> {item.client.clientAlias}
            <strong>Nombre del Sitio:</strong> {item.siteName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SiteList;