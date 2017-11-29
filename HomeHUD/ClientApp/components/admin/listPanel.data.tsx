import * as React from 'react'
import * as ReactDataGrid from 'react-data-grid';
import { ConfigTypeAdapter } from '../../state/config/configTypeAdapter';

export function renderData(configName, rows) {
    var configService = new ConfigTypeAdapter(configName);

    return (
        <ReactDataGrid
            columns={configService.getListColumns()}
            rowGetter={(i) => rows[i]}
            rowsCount={rows.length}
            minHeight={500} />
    );
}