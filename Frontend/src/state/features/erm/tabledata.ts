import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Table } from "./erm";

enum EDataType {
  String,
  Integer,
  DateTime,
}

export interface Column {
  Name: string;
  DataType: EDataType;
}

export interface TableWithData extends Table {
  Values: Array<Array<string | number | Date>>;
  Columns: Array<Column>;
}

interface TableDataState {
  tableWithData: Array<TableWithData>;
}

// Define the initial state using that type
const initialState: TableDataState = {
  tableWithData: [
    {
      Schema: "dbo",
      Name: "Table2",
      Columns: [
        {
          DataType: EDataType.String,
          Name: "Column2",
        },
      ],
      Values: [
        [1, "hallo", new Date()],
        [2, "hallo2", new Date()],
      ],
    },
  ],
};

export const ermSlice = createSlice({
  name: "tabledata",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTableData: (state, action: PayloadAction<TableWithData>) => {
      const index = state.tableWithData.findIndex(
        (x) => x.Name == action.payload.Name && x.Schema == action.payload.Schema
      );
      if (index < 0) state.tableWithData.push(action.payload);
      else state.tableWithData[index].Values = action.payload.Values;
    },
  },
});

export const { addTableData } = ermSlice.actions;

export default ermSlice.reducer;
