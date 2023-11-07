import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

enum EDataType {
    String,
    Integer,
    DateTime
}


export interface Column {
    Name: string,
    DataType: EDataType
}

export interface Table {
    Schema: string,
    Name: string,
    Columns: Array<Column>
}

export interface TableRelation {
    Name: string,
    Schema: string
}

export interface Relation {
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
    }, {
        Schema: "dbo",
        Name: "Table2",
        Columns: [{
            DataType: EDataType.String,
            Name: "Column2"
        }]
    }],
    relations: [
        {
            from: {
                Name: "Table1",
                Schema: "dbo"
            }, to: {
                Name: "Table2",
                Schema: "dbo"
            }
        }
    ]
}

export const ermSlice = createSlice({
    name: 'erm',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addTable: (state, action: PayloadAction<Table>) => {
            state.tables.push(action.payload)
        },
    },
})

export const { addTable } = ermSlice.actions

export default ermSlice.reducer