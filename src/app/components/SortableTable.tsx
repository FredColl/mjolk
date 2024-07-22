import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { log } from "console";

interface TableData {
  date: string;
  supplement: number;
  pumped: number;
  breastfeeding: number;
}

interface SortableTableProps {
  data: Record<string, TableData>;
}

const SortableTable = ({ data }: SortableTableProps) => {
  const [sortField, setSortField] = useState<keyof TableData>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  console.log(data);
  const sortedData = Object.values(data).sort((a, b) => {
    const order = sortOrder === "asc" ? 1 : -1;
    if (a[sortField] < b[sortField]) return -1 * order;
    if (a[sortField] > b[sortField]) return 1 * order;
    return 0;
  });

  const handleSort = (field: keyof TableData) => {
    const newSortOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  return (
    <Table
      isStriped
      aria-label="Sortable Table"
      style={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <TableHeader>
        <TableColumn key="date" onClick={() => handleSort("date")}>
          Date
        </TableColumn>
        <TableColumn key="supplement" onClick={() => handleSort("supplement")}>
          Supplement (ml)
        </TableColumn>
        <TableColumn key="pumped" onClick={() => handleSort("pumped")}>
          Pumped (ml)
        </TableColumn>
        <TableColumn
          key="breastfeeding"
          onClick={() => handleSort("breastfeeding")}
        >
          Breastfeeding (minutes)
        </TableColumn>
      </TableHeader>
      <TableBody>
        {sortedData.map((item) => (
          <TableRow key={item.date}>
            <TableCell>{item.date}</TableCell>
            <TableCell>{item.supplement}</TableCell>
            <TableCell>{item.pumped}</TableCell>
            <TableCell>{item.breastfeeding}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SortableTable;
