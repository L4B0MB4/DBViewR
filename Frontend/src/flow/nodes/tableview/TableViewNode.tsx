import { useCallback } from "react";
import { Handle, Node, NodeProps, Position } from "reactflow";
import { Table } from "../../../state/features/erm/erm";
import { useAppSelector } from "../../../state/hooks";

export const TableViewNode = ({ data }: NodeProps<Table>) => {
  const tableDatas = useAppSelector((s) => s.tabledata.tableWithData);
  const tableData = tableDatas.find((x) => x.Schema == data.Schema && x.Name == data.Name);
  return (
    <>
      <Handle type="target" position={Position.Top} id="ab" />
      <div className="relative rounded-xl overflow-auto bg-slate-50 ">
        <div className="shadow-sm overflow-hidden my-8">
          <table className="border-collapse table-auto w-full text-sm">
            <thead className="">
              <tr>
                {tableData?.Columns.map((item) => (
                  <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                    {item.Name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
              {tableData?.Values.map((row) => (
                <tr>
                  {row.map((item) => (
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {item.toString()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
};
