import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

enum EDataType {
  String,
  Integer,
  DateTime,
}

export interface Column {
  Name: string;
  DataType: EDataType;
}

export interface Table {
  Schema: string;
  Name: string;
}

export interface TableRelation {
  Name: string;
  Schema: string;
}

export interface Relation {
  From: TableRelation;
  To: TableRelation;
}

interface ERMState {
  tables: Array<Table>;
  relations: Array<Relation>;
}

// Define the initial state using that type
const initialState: ERMState = {
  tables: [
    {
      Schema: "dbo",
      Name: "Table1",
    },
    {
      Schema: "dbo",
      Name: "Table2",
    },
    {
      Schema: "dbo",
      Name: "Table3",
    },
  ],
  relations: [
    {
      From: {
        Name: "Table1",
        Schema: "dbo",
      },
      To: {
        Name: "Table2",
        Schema: "dbo",
      },
    },
    {
      From: {
        Name: "Table1",
        Schema: "dbo",
      },
      To: {
        Name: "Table3",
        Schema: "dbo",
      },
    },
  ],
};

export const fetchTables = createAsyncThunk("fetchTables", async () => {
  const res = await fetch(`/api/tables`);
  return res?.json();
});
export const fetchRelations = createAsyncThunk("fetchRelations", async () => {
  const res = await fetch(`/api/relations`);
  return res?.json();
});

export const ermSlice = createSlice({
  name: "erm",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTable: (state, action: PayloadAction<Table>) => {
      state.tables.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTables.pending, (state, action) => {
      // state.isLoading = true;
    });
    builder.addCase(fetchTables.fulfilled, (state, action) => {
      //state.isLoading = false;
      state.tables = action.payload;
    });
    builder.addCase(fetchRelations.fulfilled, (state, action) => {
      //state.isLoading = false;
      state.relations = action.payload;
    });
    builder.addCase(fetchTables.rejected, (state, action) => {
      //state.isError = true;
    });
  },
});

export const { addTable } = ermSlice.actions;

export default ermSlice.reducer;
