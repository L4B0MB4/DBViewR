import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

enum EDataType {
    String,
    Integer,
    DateTime
}


interface Column {
    Name: string,
    DataType: EDataType
}

interface Table {
    Schema: string,
    Name: string,
    Columns: Array<Column>
}

interface TableRelation {
    Name: string,
    Schema: string
}

interface Relation {
    from: TableRelation
    to: TableRelation
}

interface ERMState {
    tables: Array<Table>
    relations: Array<Relation>
}

// Define the initial state using that type
const initialState: ERMState = {
    tables: [{
        Schema: "dbo",
        Name: "Table1",
        Columns: [{
            DataType: EDataType.String,
            Name: "Column1"
        }]
    }],
    relations: []
}

export const counterSlice = createSlice({
    name: 'erm',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addTable: (state, action: PayloadAction<Table>) => {
            state.tables.push(action.payload)
        },
    },
})

export const { addTable } = counterSlice.actions

export default counterSlice.reducer