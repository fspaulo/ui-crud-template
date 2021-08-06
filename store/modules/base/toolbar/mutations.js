
export const isQuickSearch = (state, response) => {
  state.quickSearch = response;
};

export const isDetailSearch = (state, response) => {
  state.detailSearch = response;
};

export const setHeadersTable = (state, response) => {
  state.headersTable = response;
};

export const setDataTable = (state, response) => {
  state.dataTable = response;
};


