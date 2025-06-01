"use client";

import React, { useEffect, useState } from "react";
import { Card, Table, Input } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";
import { formatDate } from "@/utils/time-functions";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { Button } from "../ui/button1";
import { Trash2 } from "lucide-react";

const TableCard = ({ sensorData, sensors, handleDelete }) => {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("ascending");
  const [data, setData] = useState([]);
  const itemsPerPage = 10;

  const columns = [
    { key: "sensorName", label: "Sensor Name", isRowHeader: true, allowsSorting: true },
    { key: "sensorType", label: "Sensor Type", allowsSorting: true },
    { key: "value", label: "Value" },
    { key: "timestamp", label: "Timestamp", allowsSorting: true },
    { key: "status", label: "Status", allowsSorting: true },
    { key: "actions", label: "Actions" },
  ];

  useEffect(() => {
    const formattedData = sensorData.flat().map((dataPoint) => {
      const sensor = sensors.find((sensor) => sensor.id === dataPoint.sensorId);
      const formattedTimestamp = formatDate(dataPoint.timestamp);
      const isOnline = formattedTimestamp.includes("minute") || formattedTimestamp.includes("Just now");

      return {
        id: dataPoint.id,
        sensorName: sensor ? sensor.name : "Unknown",
        sensorType: sensor ? sensor.type.toLowerCase() : "Unknown",
        value: dataPoint.value,
        timestamp: formattedTimestamp,
        status: isOnline ? "Online" : "Offline",
        sensorId: sensor?.id,
        projectId: sensor?.projectId
      };
    });
    setData(formattedData);
    handleSort("timestamp");
  }, [sensorData, sensors]);

  // Sorting function
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "ascending" ? "descending" : "ascending");
    } else {
      setSortColumn(column);
      setSortDirection("ascending");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    const first = a[sortColumn]?.toString().toLowerCase() || "";
    const second = b[sortColumn]?.toString().toLowerCase() || "";
    const comparison = first.localeCompare(second, undefined, { numeric: true });
    return sortDirection === "ascending" ? comparison : -comparison;
  });

  const filteredData = sortedData.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sensor Data");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "sensor_data.xlsx");
  };

  const ItemDelete = async (item) => {
    handleDelete(item);
  };

  return (
    <div className="w-full overflow-auto lg:px-16 pb-6">
    {sensorData?.length > 0 && sensors?.length > 0 && (
    <Card className="bg-secondary rounded-xl shadow-xl w-full px-4">
        <Card.Header className="flex items-center justify-between -mb-8 md:-mb-5">
            <Card.Title className="text-base sm:text-xl font-bold text-center">
                Sensor Data Table
            </Card.Title>
        </Card.Header>
      <div className="py-4 flex justify-between items-center gap-2 sm:gap-5">
        <Input
          placeholder="Search anything..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border-none bg-slate-200 text-slate-900 rounded-xl pl-5 h-10"
        />
        <Button onClick={handleDownload} className="bg-foreground text-white hover:bg-tertiary hover:text-secondary font-semibold">
          Download as Excel
        </Button>
      </div>
      <Table allowResize aria-label="Live Sensor Data" className="rounded-lg shadow-xl w-full min-w-[600px]">
        <Table.Header className="bg-primary w-full">
          {columns?.map((column) => (
            <Table.Column key={column?.key} isResizable isRowHeader={column?.isRowHeader} className={`text-white ${column?.allowsSorting ? "cursor-pointer" : ""}`}>
              <div
                onClick={() => column?.allowsSorting && handleSort(column?.key)}
                className={`cursor-pointer flex justify-between items-center ${column?.allowsSorting ? "hover:opacity-70" : ""}`}
              >
                {column?.label} 
                {sortColumn === column?.key && (sortDirection === "ascending" ? "▲" : "▼")}
              </div>
            </Table.Column>
          ))}
        </Table.Header>
        <Table.Body items={paginatedData}>
          {(item) => (
            <Table.Row key={item?.id} className="hover:bg-gray-200">
              <Table.Cell>{item?.sensorName}</Table.Cell>
              <Table.Cell>{item?.sensorType}</Table.Cell>
              <Table.Cell>{item?.value}</Table.Cell>
              <Table.Cell>{item?.timestamp}</Table.Cell>
              <Table.Cell>{item?.status}</Table.Cell>
              <Table.Cell>
                <Trash2
                  className="cursor-pointer text-red-500 hover:text-red-700 transition-all"
                  onClick={() => ItemDelete(item)}
                />
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredData.length / itemsPerPage)))}
            disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </Card>
    )}
    </div>
  );
};

export default TableCard;
